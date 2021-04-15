// @ts-ignore
import wx from "weixin-js-sdk";
import { getWxShare } from "@/apis";
import { isMobile } from "@/consts";

export default () => {
  const wxShare = async (info: any, shareUrl = "", shareTitle = "") => {
    document.title = info.title || "";
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
      const wxConfig = await getWxShare();
      wx.config({
        debug: false,
        appId: wxConfig.appid,
        timestamp: wxConfig.timestamp,
        nonceStr: wxConfig.noncestr,
        signature: wxConfig.signature,
        jsApiList: shareInfo.apilist,
      });
      wx.ready(() => {
        const link = shareUrl || shareInfo.url;
        const title = shareTitle || shareInfo.title;
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
        });
        wx.onMenuShareAppMessage({
          title,
          desc: shareInfo.desc,
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
        });
      });
    }
  };
  const appShare = (info: any, shareUrl = "", shareTitle = "") => {
    const shareInfo = info.share_info;
    const { desc, img } = shareInfo;
    const link = shareUrl || shareInfo.url;
    const title = shareTitle || shareInfo.title;
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
  const shareAll = async (info: any, shareUrl = "", shareTitle = "") => {
    await wxShare(info, shareUrl, shareTitle);
    appShare(info, shareUrl, shareTitle);
  };
  return {
    wxShare,
    appShare,
    shareAll,
  };
};
