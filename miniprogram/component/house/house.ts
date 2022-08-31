// component/house.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buildData: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        // 第一种方式通过参数传递的方式触发函数的执行
        console.log('newVal', newVal);
        this.logInfo();
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    logInfo() {
      console.log(111111111111111);
    }
  },
  attached() {
    // 第二种方式通过组件的生命周期函数执行代码
    console.log("发起请求获取数据");
  }
})
