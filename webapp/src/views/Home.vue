<template>
  <div class="home">
    <b-jumbotron
      fluid
      v-bind:header="FREELANCE_TITLE"
      v-bind:lead="FREELANCE_DESCRIPTION"
    >
    </b-jumbotron>
    <b-container class="holder-data">
      <b-row>
        <b-col cols="4">
          <section class="platforms-holder">
            <fieldset>
              <legend>
                <h5>
                  <span>
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-card-checklist"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
                      />
                    </svg>
                  </span>
                  Filtres
                </h5>
              </legend>
              <b-list-group>
                <b-list-group-item v-for="plt in platforms" :key="plt.id">
                  <Platform v-bind:platform="plt" />
                </b-list-group-item>
              </b-list-group>
            </fieldset>
          </section>
        </b-col>
        <b-col cols="8">
          <section class="annonces-holder">
            <fieldset>
              <legend>
                <h5>
                  <span>
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-display"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.75 13.5c.167-.333.25-.833.25-1.5h4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"
                      />
                    </svg>
                  </span>
                  Annonces
                </h5>
              </legend>
              <div>
                <b-form-tags
                  input-id="tags-basic"
                  tag-variant="primary"
                  tag-pills
                  placeholder="Recherche"
                  add-button-text="Ajouter..."
                  v-model="search_keywords"
                ></b-form-tags>
              </div>
              <div
                v-on:click="go(offer.link)"
                v-for="offer in offers"
                :key="offer.id"
              >
                <Offers v-bind:offer="offer" />
              </div>
            </fieldset>
          </section>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
.home {
  height: 100vh;
}

.jumbotron {
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0f2027,
    #203a43,
    #2c5364
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #0f2027,
    #203a43,
    #2c5364
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: white;
}

h5 {
  color: #00bf8f;
}

h5 span {
  padding-right: 10px;
  opacity: 0;
}

section:hover h5 span {
  opacity: 1;
}

.platforms-holder div.list-group {
  margin-top: 25px;
}

.platforms-holder legend h5 {
  margin: 0px !important;
}

.annonces-holder div {
  margin-bottom: 25px;
  margin-top: 17px;
  cursor: pointer;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Platform from "../components/Platform.vue";
import { OfferModel } from "../models/Offer";
import { PlatformModel } from "../models/Platform";
import Offers from "../components/Offers.vue";

@Component({
  components: {
    Platform,
    Offers,
  },
  methods: {
    go(link: string) {
      window.open(link);
    },
  },
})
export default class Home extends Vue {
  name = "Home";
  FREELANCE_TITLE = "Freelance Watcher";
  FREELANCE_DESCRIPTION =
    "La solution dashboard de gestion d'offres de freelance";

  platforms: Array<PlatformModel> = [
    {
      id: 1,
      name: "Fiveer",
      isSelected: true,
    },
    {
      id: 2,
      name: "Freelance-informatique",
      isSelected: true,
    },
  ];

  offers: Array<OfferModel> = [
    {
      id: 1,
      title: "Développeur C#",
      description: "Virement SEPA",
      price: "10€",
      link: "http://www.google.com",
    },
    {
      id: 2,
      title: "Développeur Java",
      description: "Virement SEPA",
      price: "60€",
      link: "http://www.google.com",
    },
    {
      id: 3,
      title: "Développeur C++",
      description: "Virement SEPA",
      price: "70€",
      link: "http://www.google.com",
    },
  ];

  search_keywords = [];

  mounted() {
    console.log(this.platforms);
    console.log(this.offers);
  }
}
</script>
