class VPlayer {
  constructor(options) {
    const {
      szId = "player",
      width = 380,
      height = 212,
      iMaxSplit = 4,
      style = {},
      iCurrentSplit = 0,
    } = options;
    this.player = new window.JSPlugin({
      szId,
      iWidth: width,
      iHeight: height,
      iMaxSplit,
      iCurrentSplit,
      oStyle: style,
      szBasePath: "/source",
    });
  }
  // 开启播放
  play(szURL, oParams = {}, iWndNum = 0, startTime, endTime) {
    if (startTime) {
      return this.player.JS_Play(szURL, oParams, iWndNum, startTime, endTime);
    } else {
      return this.player.JS_Play(szURL, oParams, iWndNum);
    }
  }
  // 定位回放
  seek(iWndNum = 0, szStartTime, szStopTime) {
    return this.player.JS_Seek(iWndNum, szStartTime, szStopTime);
  }
  // 暂停播放 [只有开启回放后才可以暂停]
  pause(iWndNum = 0) {
    return this.player.JS_Pause(iWndNum);
  }
  // 恢复播放 [只有暂停或单帧时可恢复播放]
  resume(iWndNum = 0) {
    return this.player.JS_Resume(iWndNum);
  }
  // 回放快放 [只有开启回放后，可快放，每调用一次速度快一倍，最大支持8倍快放]
  fast(iWndNum = 0) {
    return this.player.JS_Fast(iWndNum);
  }
  // 回放慢放 [只有开启回放后，可慢放，每调用一次速度慢一倍，最多支持1/8倍]
  slow(iWndNum = 0) {
    return this.player.JS_Slow(iWndNum);
  }
  // 销毁插件资源
  destroy() {
    return this.player.JS_DestroyWorker();
  }
  // 视频插件全屏
  fullScreen(bFullScreen) {
    return this.player.JS_FullScreenDisplay(bFullScreen);
  }
  // 单个窗口全屏
  fullScreenSingle(iWndNum = 0) {
    return this.player.JS_FullScreenSingle(iWndNum);
  }
  // 视频插件宽高设置
  resize(iWidth, iHeight) {
    return this.player.JS_Resize(iWidth, iHeight);
  }
  // 抓图
  capture(iWndNum = 0, szPictureName = "img", szType = "JPEG") {
    return this.player.JS_CapturePicture(iWndNum, szPictureName, szType);
  }
  /**
   * 插件全局配置函数
   * @param bSupportSound 是否支持音频
   * @param bSupporDoubleClickFull bSupporDoubleClickFull
   * @param bSupportSound 是否支持音频
   * @param bSupportSound 是否支持音频
   * @returns
   */
  globalSetting() {
    return this.player.JS_SetOptions({
      bSupportSound: true,
      bSupporDoubleClickFull: false,
    });
  }
  // 开启3D放大
  enable3DZoom(iWndNum = 0) {
    return this.player.JS_Enable3DZoom(iWndNum);
  }
  // 停止
  disable3DZoom(iWndNum = 0) {
    return this.player.JS_Disable3DZoom(iWndNum);
  }
}

export default VPlayer;
