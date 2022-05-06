<template>
  <div class="message-single-container flex-col">
    <van-row class="message-date-row flex center">
      <div>{{ getFormatDate }}</div>
    </van-row>
    <van-row class="message-body-row" :class="{'flex-right': !isLeft}">
      <van-col span="4" class="col message-avatar-col">
        <van-image
          fit="cover"
          :src="avatar"
          width="50"
          height="50"
        >
        </van-image>
      </van-col>
      <van-col class="col message-col">
        <div class="message-content" :class="[isLeft ? 'left':'right']">{{ message.content }}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { articleDateStyle } from '@u/DateFormatUtil'

export default {
  name: 'message-single',
  computed: {
    getFormatDate () {
      return articleDateStyle(this.message.gmtCreate)
    }
  },
  created () {
  },
  props: {
    message: {
      required: true
    },
    avatar: {
      required: true
    },
    isLeft: {
      default () {
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.message-single-container {
  padding: 15px 0;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  .message-date-row {
    padding: 10px 0;

  }
  .col {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .message-body-row {
    .message-avatar-col {
      padding: 5px;
      ::v-deep .van-image__img{
        border-radius: 50%;
      }
    }
    .message-col {
      max-width: 80%;
      padding-top: 10px;
      .message-content {
        word-break: break-all;
        padding: 8px 12px;
        background-color: white;
        border-radius: 2px 8px 15px 12px;
      }
      .left {
        border-radius: 2px 8px 15px 12px;
      }
      .right {
        border-radius: 8px 2px 15px 12px ;
      }
    }
  }
  .flex-right {
    display: flex;
    flex-direction:row-reverse;
  }
}

</style>
