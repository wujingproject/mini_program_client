// app.ts
App<IAppOption>({
  // 全局变量
  globalData: {
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    console.log('日志：', logs);

    // 登录
    wx.login({
      success: res => {
        console.log('微信登录成功：', res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})