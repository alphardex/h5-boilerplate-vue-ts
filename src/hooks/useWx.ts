// @ts-ignore
import wx from "weixin-js-sdk";
import { getWxShare } from "@/apis";
import { isMobile } from "@/consts";
import { useStore } from "vuex";
import { unescapeHTML } from "@/utils/dom";

export default () => {
  const store = useStore();
  const wxShare = async (
    info: any,
    { shareUrl = "", shareTitle = "", shareDesc = "" } = {}
  ) => {
    document.title = unescapeHTML(info.title || "");
    document
      .querySelector("meta[name=description]")!
      .setAttribute("content", info.description || "");
    document
      .querySelector("meta[name=keywords]")!
      .setAttribute("content", info.keywords || "");
    const shareInfo = info.share_info;
    if (isMobile && shareInfo) {
      shareInfo.callback = () => {
        location.reload();
      };
      shareInfo.apilist = [
        "hideMenuItems",
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
      ];
      let config = store.state.wx.config;
      if (!config) {
        const wxConfig = await getWxShare();
        const newConfig = {
          debug: false,
          appId: wxConfig.appid,
          timestamp: wxConfig.timestamp,
          nonceStr: wxConfig.noncestr,
          signature: wxConfig.signature,
          jsApiList: shareInfo.apilist,
        };
        store.commit("setConfig", newConfig);
        config = newConfig;
      }
      wx.config(config);
      wx.ready(() => {
        const link = shareUrl || shareInfo.url;
        const title = unescapeHTML(shareTitle || shareInfo.title);
        const desc = shareDesc || shareInfo.desc;
        wx.onMenuShareTimeline({
          title,
          link,
          imgUrl: shareInfo.img,
          success() {
            shareInfo.callback && shareInfo.callback();
          },
          cancel() {
            shareInfo.callback && shareInfo.callback();
          },
          fail(res: any) {
            console.log(res);
          },
        });
        wx.onMenuShareAppMessage({
          title,
          desc,
          link,
          imgUrl: shareInfo.img,
          type: "",
          dataUrl: "",
          success() {
            shareInfo.callback && shareInfo.callback();
          },
          cancel() {
            shareInfo.callback && shareInfo.callback();
          },
          fail(res: any) {
            console.log(res);
          },
        });
      });
      wx.error((res: any) => {
        console.log(res);
      });
    }
  };
  const appShare = (
    info: any,
    { shareUrl = "", shareTitle = "", shareDesc = "" } = {}
  ) => {
    const shareInfo = info.share_info;
    const { img } = shareInfo;
    const link = shareUrl || shareInfo.url;
    const title = unescapeHTML(shareTitle || shareInfo.title);
    const desc = shareDesc || shareInfo.desc;
    const args = {
      method: "setShareData",
      share_title: title,
      share_description: desc,
      share_img: img,
      share_url: link,
    };
    // @ts-ignore
    window.args = args;
    // @ts-ignore
    const setShareData = () => {
      // @ts-ignore
      window.wapapp.callFunction(JSON.stringify(window.args));
    };
    // @ts-ignore
    window.setShareData = setShareData;
  };
  const shareAll = async (
    info: any,
    { shareUrl = "", shareTitle = "", shareDesc = "" } = {}
  ) => {
    await wxShare(info, { shareUrl, shareTitle, shareDesc });
    appShare(info, { shareUrl, shareTitle, shareDesc });
  };
  return {
    wxShare,
    appShare,
    shareAll,
  };
};
