<template>
  <b-card v-bind:title="offer.title">
    <b-card-text>
      <div>
        {{ offer.description.substring(0, 150) }}
        <span v-if="offer.description.length > 150"> ... </span>
      </div>
      <div b-row v-if="offer.price">
        <p>Prix: {{ offer.price }}</p>
      </div>
      <div class="mt-4 mb-4" b-row>
        <p>Platforme: {{ offer.platform.name }}</p>
      </div>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { OfferResource, PlatformResource } from "../models";
import { OfferModel } from "../models/Offer";

@Component
export default class Offers extends Vue {
  name = "offers";

  @Prop() offer!: OfferResource;

  toAssets(plt: PlatformResource) {
    return require(`../assets/platforms/${plt.name.toLowerCase()}.png`);
  }

  mounted() {
    console.log("offers");
  }
}
</script>
