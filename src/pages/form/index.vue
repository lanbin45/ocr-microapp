<template>
  <div class="page">
    <div class="weui-uploader__bd weui-flex margin-top-30px">
      <div class="weui-flex__item justify align"></div>
      <div class="weui-uploader__input-box weui-flex__item justify align">
        <div class="weui-uploader__input" @click="chooseImage"></div>
      </div>
      <div class="weui-flex__item justify align"></div>
    </div>
    <div class="weui-article">
      <div class="weui-article__h1 blue">列表图片识别：</div>
      <div class="weui-article__section">
        <div class="weui-article__p blue">
          <li>1. 图片大小不超过4M</li>
          <li>2. 最短边边长至少15px,最长边不超过4096px</li>
          <li>3. 支持jpg/png/bmp格式</li>
          <li>4. 不需要识别的信息内容最好不要出现在图中</li>
        </div>
      </div>
    </div>
    <button type="primary" class="button-default" bindtap="primary" :disabled="buttonState" @click="previewImage()"> 预览图片 </button>
    <button type="primary" class="button-default" bindtap="primary" :disabled="buttonState" @click="uploadImage()"> 解析图片 </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      buttonState: true
    }
  },
  computed: {
    ...mapState([
      'count',
      'userInfo',
      'formImageFile'
    ])
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'getCount',
      'saveFormImage',
      'saveRequestId'
    ]),
    async init () {
      console.log(this.userInfo)
    },
    chooseImage (e) {
      var $this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          console.log(res)
          var formImage = {
            tempFilePaths: res.tempFilePaths[0],
            tempFiles: {
              path: res.tempFiles[0].path,
              size: res.tempFiles[0].size
            }
          }
          $this.saveFormImage(formImage)
          $this.buttonState = false
          /* wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: function (info) {
              var formImage = {
                tempFilePaths: res.tempFilePaths[0],
                tempFiles: {
                  path: res.tempFiles[0].path,
                  size: res.tempFiles[0].size
                },
                height: info.height,
                width: info.width
              }
              $this.saveFormImage(formImage)
              $this.buttonState = false
            }
          }) */
        },
        fail: function () {
          console.log('fail')
        },
        complete: function () {
          console.log('commplete')
        }
      })
    },
    previewImage () {
      /* const url = '../form/formpreview'
      wx.navigateTo({ url }) */
      var $this = this
      wx.previewImage({
        urls: [$this.formImageFile.tempFilePaths],
        success: function (response) {
          console.log('preview Image')
        }
      })
    },
    uploadImage () {
      var $this = this
      wx.uploadFile({
        url: 'https://alphaconsulting.top/microapp/api/upload', // 仅为示例，非真实的接口地址
        filePath: $this.formImageFile.tempFilePaths,
        name: 'file',
        success: function (res) {
          console.log(res)
          $this.buttonState = true
          /* const url = '../form/result'
          wx.navigateTo({ url }) */
          wx.request({
            url: 'https://alphaconsulting.top/microapp/api/baidu_ocr_general', // 仅为示例，并非真实的接口地址
            data: {
              imageUrl: JSON.parse(res.data).path,
              picType: 'form_ocr_request'
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (response) {
              console.log(response)
              let data = JSON.parse(response.data)
              if (data.result && data.result.length > 0) {
                $this.saveRequestId(data.result[0].request_id)
                const url = '../form/result'
                wx.navigateTo({ url })
              } else {
                wx.showToast({
                  title: '识别错误',
                  icon: 'cancel',
                  mask: true
                })
              }
            },
            fail: function (err) {
              console.log(err)
            }
          })
        },
        fail: function (err) {
          console.error(err)
          wx.showToast({
            title: '上传文件出错',
            icon: 'cancel',
            mask: true
          })
        }
      })
    }
  }
}
</script>

<style>
.justify {
  justify-content: center;
}
.align {
  align-items: center;
}
.margin-top-30px {
  margin-top: 30px;
}
.blue {
  color: #0094b8;
}
.button-default {
  margin-bottom: 5px;
  background-color: #0094b8 !important;
  border-color: #0094b8 !important;
}
.button-default[plain] {
  color: #0094b8;
}
.button-default[disabled] {
  color: #ffffff !important;
  background-color: #87d9ee !important;
  border-color: #87d9ee !important;
}
</style>
