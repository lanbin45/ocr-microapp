<template>
  <div>
    <div class="weui-article">
      <div class="weui-article__h1">图片识别成功！！！</div>
      <div class="weui-article__p">
        名片已经成功识别，点击按钮获取识别结果并发送到邮箱
      </div>
    </div>
    <button type="primary" class="button-default" bindtap="primary" :disabled="buttonState" @click="sendEmailClick()"> 发送到邮箱 </button>
    <button type="primary" class="button-default" bindtap="primary" :disabled="buttonState" @click="continueOcr()"> 继续上传图片 </button>
    <div class="modal-mask" @tap="hideModal" catchtouchmove="preventTouchMove" v-if="modelState"></div>
    <div class="modal-dialog" v-if="modelState">
        <div class="modal-title">输入邮箱</div>
        <div class="modal-content">
            <div class="modal-input">
                <div class="modal-input-div">
                    <p class="text">邮箱：</p>
                    <input placeholder-class="input-holder" v-model="email" maxlength="50" class="input" placeholder="请输入邮箱">
                </div>      
            </div>
        </div>
        <div class="modal-footer">
            <div class="btn-cancel" @click="onCancel" data-status="cancel">取消</div>
            <div class="btn-confirm" @click="onConfirm" data-status="confirm">确定</div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      modelState: false
    }
  },
  computed: {
    ...mapState([
      'excelData'
    ]),
    email: {
      get () {
        return this.$store.state.email
      },
      set (value) {
        this.$store.commit('setEmail', value)
      }
    }
  },
  mounted () {
    console.log(this.requestId)
  },
  methods: {
    ...mapActions([
      'saveFormImage',
      'saveRequestId'
    ]),
    sendEmailClick () {
      this.modelState = true
    },
    continueOcr () {
      let formImageFile = {
        tempFilePaths: '',
        tempFiles: {
          path: '',
          size: 0
        },
        width: 0,
        height: 0
      }
      this.saveFormImage(formImageFile)
      this.saveRequestId('')
      const url = '../card/index'
      wx.navigateTo({ url })
    },
    sendEmail (url) {
      var $this = this
      wx.request({
        url: 'https://alphaconsulting.top/microapp/api/downloadcardexcel', // 仅为示例，并非真实的接口地址
        data: {
          excelData: JSON.stringify($this.excelData),
          email: $this.email
        },
        method: 'POST',
        /* header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        }, */
        success: function (response) {
          console.log(response)
          wx.hideLoading()
          $this.modelState = false
          wx.showToast({
            title: `结果发送到${$this.email},请查收！`,
            icon: 'none',
            mask: true
          })
        }
      })
    },
    preventTouchMove () {},
    onCancel () {
      this.modelState = false
    },
    onConfirm () {
      let emailPattern = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      if (!emailPattern.test(this.email)) {
        wx.showToast({
          title: '邮箱格式错误',
          icon: 'cancel',
          mask: true
        })
      } else {
        console.log(this.email)
        wx.showLoading({
          title: '获取中',
          mask: true
        })
        this.sendEmail()
      }
    }
  }
}
</script>

<style scoped>
.show-btn {
  margin-top: 100rpx;
  color: #0094b8;
}

.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}

.modal-dialog {
  /* width: 540rpx; */
  width: 86%;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 9999;
  background: #f9f9f9;
  /* margin: -180rpx 105rpx; */
  margin-left: 7%;
  margin-top: -180px;
  border-radius: 36rpx;
}

.modal-title {
  padding-top: 50rpx;
  font-size: 36rpx;
  color: #030303;
  text-align: center;
}

.modal-content {
  padding: 10rpx 32rpx 30rpx 32rpx;
}

.modal-input {
  display: flex;
  background: #fff;
  /* border: 2rpx solid #ddd; */
  border-radius: 4rpx;
  font-size: 28rpx;
  flex-direction: column;
  background: #f9f9f9;
}

.modal-input-div {
  display: flex;
  /* background: #fff; */
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #f9f9f9;
  margin-top: 20px;
  /* border: 2rpx solid #ddd; */
  /* border-radius: 4rpx; */
  /* font-size: 28rpx; */

  height: 40px;
}
.text {
  flex: 0 0 60px;
  background: #f9f9f9;
  text-align: left;
}
.btn-text {
  background-color: #0094b8;
  width: 60px;
  height: 40px;
  flex: 0 0 100px;
  color: white;
  border-radius: 40px;
  margin-left: 20px;
  line-height: 40px;
}
.input {
  width: 100%;
  height: 82rpx;
  font-size: 28rpx;
  line-height: 28rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  color: #333;
  border: 2rpx solid #ddd;
  background-color: white;
  text-align: left;
}

input-holder {
  color: #666;
  font-size: 28rpx;
  /* background-color: white; */
  /* text-align: left; */
}

.modal-footer {
  display: flex;
  flex-direction: row;
  height: 86rpx;
  border-top: 1px solid #dedede;
  font-size: 34rpx;
  line-height: 86rpx;
  margin-top: 20px;
}

.btn-cancel {
  width: 50%;
  color: #666;
  text-align: center;
  border-right: 1px solid #dedede;
}

.btn-confirm {
  width: 50%;
  color: #0094b8;
  text-align: center;
}

.button-default {
  margin-bottom: 5px;
  background-color: #0094b8;
  border-color: #0094b8 !important;
}
.button-default[plain] {
  color: #0094b8;
}
</style>
