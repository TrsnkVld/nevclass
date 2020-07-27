<template>
  <div>
    <header-comp />
    <router-view />
    <app-footer />
    <app-preloader />
  </div>
</template>

<script>
  import headerComp from "./elements/header-comp";
  import appFooter from "./elements/app-footer";
  import appPreloader from "./elements/app-preloader";

  export default {
    name: "MainLayout",
    components: {
      headerComp,
      appFooter,
      appPreloader,
    },
    data: () => ({}),
    computed: {},
    methods: {},
    created() {},
    mounted() {},
  };
</script>

<style lang="less"></style>
