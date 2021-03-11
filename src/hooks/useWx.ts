// @ts-ignore
import wx from "weixin-js-sdk";
import { Info } from "@/types";
import { getWxShare } from "@/apis";
import { isMobile } from "@/consts";

export default () => {
  const wxShare = async (info: Info, shareUrl = "", shareTitle = "") => {
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
  return {
    wxShare,
  };
};
