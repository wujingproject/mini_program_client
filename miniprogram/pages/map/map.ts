// index.ts
// 获取应用实例
// const app = getApp<IAppOption>();
import { getRandomColor } from '../../utils/util';
import { map1 } from '../../utils/mapCfg';
Page({
  data: {
    viewport: { w: wx.getSystemInfoSync().windowWidth, h: wx.getSystemInfoSync().windowHeight },
    hero: { x: 0, y: 0, w: 25, h: 25 },
    unitBuild: { w: 50, h: 50 },
    mapData: { w: 0, h: 0, line: 21, colum: 15 },
    cameraPos: { x: 0, y: 0 },
    mapBuildData: [{}],
    unitMove: 0.1
  },
  onReady: function () {
  },
  onLoad() {
    this.initData();
  },
  initData() {
    this.data.hero.x = (this.data.viewport.w - this.data.hero.w) / 2;
    this.data.hero.y = (this.data.viewport.h - this.data.hero.h) / 2;
    this.data.mapData.w = this.data.mapData.line * this.data.unitBuild.w;
    this.data.mapData.h = this.data.mapData.colum * this.data.unitBuild.h;
    this.data.cameraPos.x = (this.data.mapData.w - this.data.viewport.w) / 2;
    this.data.cameraPos.y = (this.data.mapData.h - this.data.viewport.h) / 2;
    this.setData({
      hero: this.data.hero,
      mapData: this.data.mapData,
      cameraPos: this.data.cameraPos
    });
    this.drawMap();
    let self = this;
    setTimeout(() => {
      console.log('重新设置位置:', self.data.cameraPos);
      self.setData({
        cameraPos: self.data.cameraPos
      });
    }, 0);
  },
  // 地图绘制
  drawMap() {
    this.data.mapBuildData = [];
    let rectNum = this.data.mapData.line * this.data.mapData.colum;
    for (let i = 0; i < rectNum; i++) {
      const line = Math.floor(i / this.data.mapData.line);
      const column = i % this.data.mapData.line;
      const buildItemData = {
        id: i,
        width: this.data.unitBuild.w,
        height: this.data.unitBuild.h,
        bgColor: getRandomColor() || "#ffffff",
        x: column * this.data.unitBuild.w,
        y: line * this.data.unitBuild.h,
        name: ''
      }
      if (map1[i]) {
        buildItemData.name = map1[i];
      }
      this.data.mapBuildData.push(buildItemData);
    }
    this.setData({
      mapBuildData: this.data.mapBuildData
    });
  },
  // 点击摇杆
  moveView(param: any) {
    this.data.cameraPos.x += this.data.unitMove * param.detail.cos;
    this.data.cameraPos.y += this.data.unitMove * param.detail.sin;
    let gapXRight = this.data.mapData.w - this.data.viewport.w;
    let gapYBottom = this.data.mapData.h - this.data.viewport.h;
    if (this.data.cameraPos.x < 0) {
      this.data.cameraPos.x = 0;
    }
    if (this.data.cameraPos.x > gapXRight) {
      this.data.cameraPos.x = gapXRight;
    }
    if (this.data.cameraPos.y < 0) {
      this.data.cameraPos.y = 0;
    }
    if (this.data.cameraPos.y > gapYBottom) {
      this.data.cameraPos.y = gapYBottom;
    }
    this.setData({
      cameraPos: this.data.cameraPos,
    });
  },
  moveViewResponse(e: any) {
    // console.log('触发滚动回调：', e.detail.scrollLeft);
  },
  // 点击摇杆
  // moveHero(param: any) {
  //   // console.log('param', param.detail.cos, param.detail.sin);
  //   this.data.hero.x += this.data.unitMove * param.detail.cos;
  //   this.data.hero.y += this.data.unitMove * param.detail.sin;
  //   this.setData({
  //     hero: this.data.hero
  //   });
  // }
})