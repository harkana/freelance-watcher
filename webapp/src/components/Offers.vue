<template>
  <b-card v-bind:title="offer.title">
    <b-card-text>
      <div>
        {{ offer.description.substring(0, 80) }}
        <span v-if="offer.description.length > 80"> ... </span>
      </div>
      <div>
        <p>Prix: {{ offer.price }}</p>
      </div>
    </b-card-text>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { OfferModel } from '../models/Offer'

@Component
export default class Offers extends Vue {
  name = 'offers';

  @Prop() offer!: OfferModel;

  mounted () {
    console.log('offers')
  }
}
</script>
