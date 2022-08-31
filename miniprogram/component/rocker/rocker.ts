// component/rocker/rocker.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '标题'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 第一个100是组件距离底部100px,第二个100是组件本身的高度，由此计算出组件相对左上角的位置
    unitPos: { x: 50, y: wx.getSystemInfoSync().windowHeight - 100 - 100 },
    rockerSize: { w: 40, h: 40, },
    initRockerPos: { x: 30, y: 30 },
    rockerPos: { x: 30, y: 30 },
    rockerDirection: { sin: 0, cos: 0 },
    heroRun: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    start(e: any) {
      // 点击坐标
      const clickPointX = e.touches[0].pageX - this.data.unitPos.x;
      const clickPointY = e.touches[0].pageY - this.data.unitPos.y;

      // 15是黄圈的半径，因为坐标是从对象的左上角算的，要和圆心对齐，圆心左上偏移15px
      const rockerX = clickPointX - this.data.rockerSize.w / 2;
      const rockerY = clickPointY - this.data.rockerSize.h / 2;
      console.log('移动开始-点击坐标', clickPointX, clickPointY);

      this.setData({
        rockerPos: { x: rockerX, y: rockerY }
      });
    },
    move(e: any) {
      const centrePointX = e.touches[0].pageX - this.data.unitPos.x;
      const centrePointY = e.touches[0].pageY - this.data.unitPos.y;
      let rockerX = centrePointX - this.data.rockerSize.w / 2;
      let rockerY = centrePointY - this.data.rockerSize.h / 2;

      // console.log('圆心点坐标', centrePointX, centrePointY);
      // console.log('黄点实际坐标', rockerX, rockerY);

      // 滑到圆外之后的处理
      const r = 50;
      const gap = Math.sqrt(Math.pow(centrePointX - 50, 2) + Math.pow(centrePointY - 50, 2));
      if (gap >= r) {
        const cos = (centrePointX - 50) / gap; // 左上偏移计算
        const sin = (centrePointY - 50) / gap;
        rockerX = r * cos + 50 - this.data.rockerSize.w / 2; // 右下还原 + 黄圈偏移计算
        rockerY = r * sin + 50 - this.data.rockerSize.h / 2;
        this.data.rockerDirection.cos = cos;
        this.data.rockerDirection.sin = sin;
        if (!this.data.heroRun) {
          this.data.heroRun = true;
          this.communicationToParent();
        }
      } else {
        this.data.heroRun = false;
      }
      this.setData({
        rockerPos: { x: rockerX, y: rockerY }
      });
    },
    end() {
      console.log('移动结束');
      this.data.heroRun = false;
      this.setData({
        rockerPos: { x: this.data.initRockerPos.x, y: this.data.initRockerPos.y }
      });
    },
    communicationToParent() {
      const self = this;
      const data = { cos: self.data.rockerDirection.cos, sin: self.data.rockerDirection.sin };
      const timer1 = setTimeout(() => {
        clearTimeout(timer1);
        if (self.data.heroRun) {
          self.triggerEvent('moveView', data);
        }
        self.communicationToParent();
      }, 0.1);
    },
  }
})
