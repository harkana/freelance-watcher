<template>
    <div></div>
</template>
<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Home from './Home.vue'
import Settings from './Settings.vue'

@Component({
  components: {
    Home,
    Settings
  }
})
export default class Tabs extends Vue {
  name = 'Tabs';

  mounted () {
    console.log('tabs mounted')
  }
}
</script>
