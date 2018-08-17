<template>
<view>
  <canvas :style="canvasStyle" canvas-id="myCanvas" @touchend="canvasEnd"></canvas>
  <div class="footer-button-group">
      <button type="primary" class="button-default" size="mini" bindtap="primary" @click="enableCanvas()"> {{canvasLabel}} </button>
      <button type="primary" class="button-default" size="mini" bindtap="primary" @click="verticalClick(false)"> 画横线 </button>
      <button type="primary" class="button-default" size="mini" bindtap="primary" @click="verticalClick(true)"> 画竖线 </button>
      <button type="primary" class="button-default" size="mini" bindtap="primary" @click="resetCanvas()"> 清除 </button>
      <button type="primary" class="button-default" size="mini" bindtap="primary" @click="finishDraw()"> 完成 </button>
  </div>
</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      scrollViewStyle: ``,
      canvasStyle: ``,
      context: null,
      canvasState: false,
      isVertical: false,
      canvasLabel: '开',
      canvasHeight: 0,
      canvasWidth: 0
    }
  },
  computed: {
    ...mapState([
      'formImageFile',
      'deviceInfo'
    ])
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.canvasHeight = (this.deviceInfo.windowHeight - 50) > this.formImageFile.height ? this.formImageFile.height : this.deviceInfo.windowHeight - 50
      this.canvasWidth = this.deviceInfo.windowWidth > this.formImageFile.width ? this.formImageFile.width : this.deviceInfo.windowWidth
      this.canvasStyle = `width: ${this.canvasWidth}px; height: ${this.canvasHeight}px;`
      this.context = wx.createCanvasContext('myCanvas')
      this.resetCanvas()
    },
    resetCanvas () {
      this.context.drawImage(this.formImageFile.tempFilePaths, 0, 0, this.canvasWidth, this.canvasHeight)
      this.context.draw(true)
    },
    canvasEnd (eventHandler) {
      console.log(eventHandler)
      console.log(this.canvasState)
      if (this.canvasState) {
        let clientX = eventHandler.mp.changedTouches[0].x
        let clientY = eventHandler.mp.changedTouches[0].y
        console.log(clientX)
        this.context.setStrokeStyle('black')
        this.context.setLineWidth(2)
        this.context.beginPath()
        this.context.moveTo(clientX, clientY)
        if (this.isVertical) {
          this.context.lineTo(clientX, this.deviceInfo.screenHeight - 50)
        } else {
          this.context.lineTo(this.deviceInfo.screenWidth, clientY)
        }
        this.context.closePath()
        this.context.stroke()
        this.context.draw(true)
      }
    },
    enableCanvas () {
      this.canvasState = !this.canvasState
      this.canvasLabel = this.canvasState ? '关' : '开'
    },
    verticalClick (type) {
      if (type) {
        this.isVertical = true
      } else {
        this.isVertical = false
      }
    },
    finishDraw () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          console.log(res)
          wx.previewImage({
            urls: [res.tempFilePath],
            success: function (response) {
              console.log(response)
              wx.uploadFile({
                url: 'https://alphaconsulting.top/microapp/api/upload', // 仅为示例，非真实的接口地址
                filePath: res.tempFilePath,
                name: 'file',
                success: function (res) {
                  console.log(res)
                },
                fail: function (err) {
                  console.log(err)
                }
              })
            },
            fail: function () {
              console.log('fail')
            }
          })
        }
      })
    }
  }
}
</script>

<style>
.full-width{
  width: 100vw;
}
.footer-button-group{
  vertical-align: middle;
  text-align: center;
}
.footer-button-group button {
  margin: 5px;
}
</style>

