<template>
  <div class="deletable">
    <b-row v-if="keyword">
      <b-col cols="2"  v-on:click="deleteRule(keyword)">
        <span class="col-12">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-x"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>
      </b-col>
      <b-col cols="10">
        {{ keyword }}
      </b-col>
    </b-row>
  </div>
</template>
<style lang="scss" scoped>
.deletable .row {
  align-items: center;
}

.deletable {
  cursor: pointer;
}
</style>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PlatformModel } from "../models/Platform";

@Component
export default class Deletable extends Vue {
  name = "deletable";

  @Prop() keyword!: string;

  mounted() {
    console.log(this.keyword);
  }

  deleteRule(keyword) {
    console.log("click");
    this.$store.commit("removeKeyword", keyword);
  }
}
</script>
