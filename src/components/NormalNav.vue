<template>
  <div class="normalNav">
    <van-nav-bar
      :title="title"
      left-text="返回"
      :right-text="rightText"
      @click-left="$router.back()"
      @click-right="finish"
    >
      <template #right>
        <slot></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'normal-nav',
  props: {
    finish: {
      required: true
    },
    title: {
      required: true,
      type: String
    },
    rightText: {
      default: '完成'
    }
  }
}
</script>

<style scoped lang="scss">
.van-nav-bar {
  background-color: #F7F7F7;
}
::v-deep .van-nav-bar__text {
  color: black;
  font-size: 16px;
}
.van-nav-bar__title {
  font-size: 18px;
  font-weight: 550;
}
</style>
