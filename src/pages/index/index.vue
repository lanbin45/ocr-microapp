<template>
  <div class="container">
    <div v-if="!hasUserInfo">
      <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo"> 授权登录 </button>
    </div>
    <div v-if="hasUserInfo">
      <div class="userinfo">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        <div class="userinfo-nickname">
          <card :text="userInfo.nickName"></card>
        </div>
      </div>
      <div class="usermotto">
          <card :text="motto"></card>
          <button type="primary" class="button-default" bindtap="primary" @click="clickHandle('form')"> 表格文字识别 </button>
          <button type="primary" class="button-default" :plain="true" bindtap="primary" @click="clickHandle('card')"> 批量名片识别 </button>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      motto: '欢迎使用Bruce的文字识别小程序',
      userInfo: {},
      hasUserInfo: false
    }
  },

  computed: {
    // ...mapState([
    //   'userInfo'
    // ]),
    // hasUserInfo: function () {
    //   const userInfo = wx.getStorageSync('userInfo')
    //   let userInfoState = false
    //   if (userInfo.nickName) {
    //     userInfoState = true
    //   }
    //   console.log(userInfo)
    //   console.log(userInfoState)
    //   return userInfoState
    // }
  },

  components: {
    card
  },

  methods: {
    ...mapActions([
      'saveUser',
      'saveDeviceInfo'
    ]),
    bindViewTap () {
      const url = '../form/index'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      var $this = this
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              $this.userInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)
              $this.hasUserInfo = true
              // $this.saveUser(res.userInfo)
              wx.getSystemInfo({
                success: function (res) {
                  $this.saveDeviceInfo(res)
                }
              })
            }
          })
        }
      })
    },
    clickHandle (type) {
      let url
      switch (type) {
        case 'form':
          url = '../form/index'
          break
        case 'card':
          url = '../card/index'
          break
        default:
          url = '../form/index'
      }
      wx.navigateTo({ url })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
    this.userInfo = wx.getStorageSync('userInfo')
    if (this.userInfo.nickName) {
      this.hasUserInfo = true
    }
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 50px;
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
