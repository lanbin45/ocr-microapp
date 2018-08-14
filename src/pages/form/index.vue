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
      'saveFormImage'
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
          // $this.files = $this.files.concat(res.tempFilePaths)
          console.log(res)
          wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: function (info) {
              var formImage = {
                tempFilePaths: res.tempFilePaths[0],
                tempFiles: {
                  path: res.tempFiles.path,
                  size: res.tempFiles.size
                },
                height: info.height,
                width: info.width
              }
              $this.saveFormImage(formImage)
              $this.buttonState = false
            }
          })
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
      const url = '../form/formpreview'
      wx.navigateTo({ url })
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
</style>
