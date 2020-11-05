<template>
  <v-app>
    <v-main>
      <Tabs />
    </v-main>
  </v-app>
</template>
<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import 'node_modules/bootstrap-vue/src/index.scss';
</style>
<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Tabs from "./views/Tabs.vue";

export default Vue.extend({
  name: "App",

  components: {
    Tabs,
  },

  data: () => ({
    //
  }),
});
</script>
