<template>
  <div ref="settings" class="settings">
    <b-container>
      <div>
        <h2>Freelance Watcher - Paramètres de contenu</h2>
      </div>
      <article>
        <div>
          <div><h5>Règles de récupération de contenue</h5></div>
          <div v-if="rules.length === 0">Pas de règles définies</div>
          <v-row>
            <v-col cols="9">
              <v-autocomplete
                v-model="platform"
                :items="platforms"
                :disabled="isUpdating"
                item-text="name"
                item-value="id"
                label="Plateforme"
                dense
                filled
                rounded
                solo
              ></v-autocomplete>
            </v-col>
            <v-col cols="3">
              <b-button
                class="new-rule col-12"
                v-on:click="newRule()"
                variant="success"
              >
                <span>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-person-plus"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10zM13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </span>
                Ajouter une règle
              </b-button>
            </v-col>
          </v-row>
          <div>
            <hr />
            <div
              class="rule-holder row"
              v-for="(rule, index) in rules"
              :key="rule.id"
            >
              <span class="col-1" v-on:click="deleteRule(rule)">
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
              <b-card class="col-11" v-bind:title="rule.platform.name">
                <b-card-text>
                  <div>
                    <v-text-field
                      label="Mots-clés"
                      v-on:keyup.enter="onEnter(queries, index)"
                      v-model="queries[index]"
                    ></v-text-field>
                  </div>
                  <div>
                    <b-badge
                      v-for="keyword in rule.keywords"
                      :key="keyword"
                      href="#"
                      variant="primary"
                      >{{ keyword }}</b-badge
                    >
                  </div>
                </b-card-text>
              </b-card>
            </div>
          </div>
        </div>
      </article>
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
.rule-holder {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: space-between;
}

.rule-holder span {
  align-self: center;
  flex-grow: 1;
}

.rule-holder span svg {
  justify-content: center;
}

.new-rule {
  color: white;
}

.badge {
  color: white;
}

.rule-holder .card {
  flex-grow: 10;
}

.badge {
  margin-right: 1px;
  margin-left: 1px;
}

.rule-holder span svg {
  font-size: 4em;
}

.settings {
  height: 100vh;
  background-color: #F6F6F6;
}

.new-rule span svg {
  transform: scale(1.3);
}

.card {
  margin-top: 10px;
  margin-bottom: 10px;
}

.new-rule span {
  padding-right: 8px;
}
</style>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RuleModel } from "../models/Rule";
import { PlatformModel } from "../models/Platform";

@Component
export default class Settings extends Vue {
  name = "Settings";
  rules: Array<RuleModel> = [
    {
      id: 1,
      platform: {
        id: 1,
        name: "Fiveer",
        isSelected: false,
      },
      keywords: ["Développeur"],
    },
  ];

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

  platform: number = this.platforms[1].id;
  isUpdating = false;
  queries: Array<string> = [""];

  @Watch("queries")
  onQueryChange() {
    console.log(this.queries);
  }

  @Watch("platform")
  onPlatformChange() {
    console.log(this.platform);
  }

  onEnter(queries: Array<string>, index: number) {
    const rule: RuleModel = this.rules[index];

    if (!rule) {
      return;
    }
    if (rule.keywords.indexOf(queries[index]) === -1) {
      rule.keywords.push(queries[index].slice());
      queries[index] = "";
    }
  }

  deleteRule(rule: RuleModel) {
    this.rules = this.rules.filter((r) => rule.id !== r.id);
  }

  newRule() {
    let newId = 1;

    if (this.rules.length > 0) {
      const last = this.rules[this.rules.length - 1];

      newId = last.id;
    }
    newId += 1;
    let plt = null;
    for (let plateform of this.platforms) {
      if (plateform.id === this.platform) {
        plt = plateform;
      }
    }
    if (!plt) {
      return;
    }
    this.rules.push({
      id: newId,
      platform: plt,
      keywords: [],
    });
  }

  mounted() {
    console.dir(this.$refs.settings as HTMLElement);
  }
}
</script>
