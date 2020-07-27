<template>
  <a class="social-icon__item" :href="item.link" target="_blank" :title="item.title">
    <div v-html="item.content" :style="setCssVars" class="social-icon__item-content-wrap"></div>
  </a>
</template>

<script>
export default {
  name: "SocialIconItem",

  props: {
    item: {
      type: Object,
      required: true,
    }
  },

  computed: {
    setCssVars() {
      return {
        '--color': this.item.color || '#fff',
        '--color-hover': this.item.hoverColor || '#0066FF',
      }
    }
  },
}
</script>

<style lang="less">
@import '../../less/variables.less';
.social-icon__item {
    display: flex;
    justify-content: center;
    align-items: center;

    &-content-wrap {
      
    }

    path {
      transition: 0.2s linear fill;
    }

    &:hover,
    &:focus {
      path {
        fill: @active;
      }
    }
} 
</style>