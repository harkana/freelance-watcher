<template>
    <div v-if="platform">
        <b-row>
            <b-col cols="2">
                <b-form-checkbox
                    v-bind:id="checkBoxId(platform.id)"
                    v-model="platform.isSelected"
                    v-bind:name="checkBoxId(platform.id)"
                    >
                </b-form-checkbox>
            </b-col>
            <b-col>
                {{ platform.name }}
            </b-col>
        </b-row>
     </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { PlatformModel } from '../models/Platform'

@Component({
  methods: {
    checkBoxId (id: number) {
      return ('checkbox-' + id)
    }
  },
  watch: {
    platform (plt: PlatformModel) {
      console.log(plt)
    }
  }
})
export default class Platform extends Vue {
  name = 'platform';

  @Prop() platform!: PlatformModel;

  mounted () {
    console.log(this.platform)
  }
}
</script>
