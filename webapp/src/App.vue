<template>
  <v-app class="v-tabs-container app-content">
    <v-tabs class="menu" v-model="selected" right>
      <v-tab v-for="item in items" :key="item.id" v-bind:to="item.url"
        >{{ item.name }}
      </v-tab>
    </v-tabs>
    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";

.menu a:hover {
  text-decoration: none !important;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.app-content {
  overflow: auto;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import Tabs from "./views/Tabs.vue";

@Component
export default class App extends Vue {
  name: string = "App";
  items: Array<{ id: number; name: string; url: string }> = [
    {
      id: 1,
      name: "Freelance",
      url: "/",
    },
    {
      id: 2,
      name: "Paramètres",
      url: "/settings",
    },
    {
      id: 3,
      name: "A propos",
      url: "/about",
    },
  ];
  selected: { id: number; name: string; url: string } = this.items[0];
}
</script>
