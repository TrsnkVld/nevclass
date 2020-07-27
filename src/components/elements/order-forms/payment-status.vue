<template>
  <transition name="formWrap__thanks">
    <el-container
      direction="vertical"
      class="formWrap__thanks"
      v-show="show"
      @click.native="resetFields()"
    >
      <h1>{{ status.title }}</h1>
      <h3>{{ status.desc }}</h3>
    </el-container>
  </transition>
</template>
<script>
  export default {
    name: 'paymentStatus',
    props: {
      status: {
        type: Object,
        required: true,
      }
    },

    data: () => ({
      show: false,
    }),

    watch: {
      status: {
        handler(val) {
          this.show = val.showStatus;
        },
        immediate: true,
      },
    }
  };
</script>
