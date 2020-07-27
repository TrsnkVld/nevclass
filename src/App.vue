<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "app",

    data: () => ({}),

    methods: {
      scroll() {
        window.onscroll = () => {
          let fixedBtn = document.getElementsByClassName("fixedBtn")[0];
          let footerHeight = document.getElementsByClassName("footer")[0]
            .offsetHeight;
          let bottom = window.pageYOffset + window.innerHeight;

          if (typeof fixedBtn != "undefined" && fixedBtn != null) {
            if (
              bottom >=
              document.getElementById("app").offsetHeight - footerHeight
            ) {
              fixedBtn.classList.add("hide");
            } else {
              fixedBtn.classList.remove("hide");
            }
          }
        };
      },
    },
    created() {
    },
    mounted() {
      this.scroll();
    },
  };
</script>

<style lang="less">
  @import "less/variables.less";

  #app {
    min-height: 100%;
    display: flex;
    flex-flow: column;

    &::after {
      position: fixed;
      display: block;
      content: "";
      top: 0;
      left: 0;
      width: 110%;
      height: 100%;
      z-index: 3000;
      background: @white;
      transform: translateY(100%);
      transition: transform 0.4s;
    }

    &.in-transition {
      &::after {
        animation: sheet 0.4s ease-out;
        animation-fill-mode: forwards;

        @keyframes sheet {
          from {
            transform: translateY(-100%);
          }

          to {
            transform: translateY(0%);
          }
        }
      }
    }
  }
</style>
