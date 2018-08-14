<template>
  <div class="page full-width">
    <image :src="formImageFile.tempFilePaths" mode="aspectFit" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      buttonState: false
    }
  },
  computed: {
    ...mapState([
      'formImageFile'
    ])
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      console.log(this.formImageFile)
    }
  }
}
</script>

<style>
.full-width{
  width: 100vw;
}
</style>

