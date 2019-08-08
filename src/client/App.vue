<template>
  <div id="app">
    <span class="test">Hello World</span>

    <div>
      <div class="iconfont iconzhixianghuishou" />
      <div class="iconfont iconkehuishou-buliaolei" />
    </div>

    <span :class="$style.appText">Hello app-text</span>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="sass" module>
body {
  .app-text{
    font-size: 20px;
    color: red;
  }
}

</style>
