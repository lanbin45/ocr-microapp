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
      <div class="weui-article__h1 blue">批量名片识别：</div>
      <div class="weui-article__section">
        <div class="weui-article__p blue">
          <li>1. 图片大小不超过4M</li>
          <li>2. 最短边边长至少15px,最长边不超过4096px</li>
          <li>3. 支持jpg/png/bmp格式</li>
          <li>4. 不需要识别的信息内容最好不要出现在图中</li>
          <li>5. 一次上传不超过9张图片</li>
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
      buttonState: true,
      // fileUrls: [],
      failedCount: 0,
      ocrResult: [],
      excelData: []
    }
  },
  computed: {
    ...mapState([
      'cardImageFile'
    ])
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'saveCardImage',
      'saveExcelData'
    ]),
    async init () {
      console.log(this.userInfo)
    },
    chooseImage (e) {
      var $this = this
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          // $this.files = $this.files.concat(res.tempFilePaths)
          $this.buttonState = false
          $this.saveCardImage(res.tempFilePaths)
          console.log(res)
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
        urls: $this.cardImageFile,
        success: function (response) {
          console.log('preview Image')
        }
      })
    },
    uploadSingleImage (filePath) {
      var $this = this
      wx.uploadFile({
        url: 'https://alphaconsulting.top/microapp/api/upload', // 仅为示例，非真实的接口地址
        filePath: filePath,
        name: 'file',
        success: function (res) {
          console.log(res)
          $this.recognizeSingleImage(JSON.parse(res.data).path)
        }
      })
    },
    recognizeSingleImage (path) {
      var $this = this
      wx.request({
        url: 'https://alphaconsulting.top/microapp/api/baidu_ocr_general', // 仅为示例，并非真实的接口地址
        data: {
          imageUrl: path,
          picType: 'business_card'
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (response) {
          console.log(response)
          let result = JSON.parse(response.data)
          if (result.words_result_num === 0 || result.error_code) {
            $this.failedCount += 1
            return
          }
          $this.ocrResult.push(result.words_result)
          if ($this.ocrResult.length === $this.cardImageFile.length - $this.failedCount) {
            $this.excelData = $this.proceedResult()
            console.log($this.excelData)
            $this.saveExcelData($this.excelData)
            $this.buttonState = true
            wx.hideLoading()
            const url = '../card/result'
            wx.navigateTo({ url })
          }
        },
        fail: function (err) {
          console.log(err)
          wx.hideLoading()
        }
      })
    },
    proceedResult () {
      var newResult = []
      this.ocrResult.every((val, index) => {
        var tempObj = {
          'NAME': '',
          'ADDR': '',
          'MOBILE': '',
          'TEL': '',
          'FAX': '',
          'PC': '',
          'URL': ''
        }
        Object.keys(val).every((key, i) => {
          tempObj[key] = val[key].join()
          return true
        })
        newResult.push(tempObj)
        return true
      })
      return newResult
    },
    uploadImage () {
      // var $this = this
      // this.fileUrls = []
      this.ocrResult = []
      wx.showLoading({
        title: '识别中',
        mask: true
      })
      this.cardImageFile.forEach((file, index) => {
        this.uploadSingleImage(file)
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
