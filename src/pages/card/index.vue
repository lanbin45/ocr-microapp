<template>
  <div>
    <p>Card</p>
    <p>{{userInfo.nickName}}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'count',
      'userInfo'
    ])
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'getCount'
    ]),
    async init () {
      console.log(this.userInfo)
    }
  }
}
</script>
