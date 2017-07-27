<template>
  <div class="captcha">
    <img :src="imgsrc" @click="reload"></img>
  </div>
</template>

<script>
  import urlJoin from 'url-join'
  import settings from '../../settings'
  export default {
    data () {
      return {
        imgRand: Math.random().toString()
      }
    },
    computed: {
      imgsrc () {
        return urlJoin(settings.apiUrl, 'captcha?', this.imgRand)
      }
    },
    methods: {
      reload () {
        this.imgRand = Math.random().toString()
      }
    }
  }
</script>
