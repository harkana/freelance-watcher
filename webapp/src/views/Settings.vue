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
                prepend-icon="mdi-city"
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
              :key="index"
            >
              <span class="col-1" v-on:click="deleteRule(rule.id)">
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
                      v-on:keydown.enter="onEnter(queries, index)"
                      v-model="queries[index]"
                    ></v-text-field>
                  </div>
                  <div>
                    <b-badge
                      v-for="keyword in rule.cronTaskKeywords"
                      :key="keyword.id"
                      href="#"
                      variant="primary"
                      >{{ keyword.keyword }}</b-badge
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
  background-color: #f6f6f6;
  overflow: auto;
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
import { PlatformResource } from "../models/index";
import { CronTaskResource, KeywordsResource } from "../models/index";
import { PlatformService } from "../models/services/PlatformService";
import { CronTaskService } from "../models/services/CronTaskService";
import { KeywordService } from "../models/services/KeywordService";

@Component
export default class Settings extends Vue {
  name = "Settings";
  rules: Array<CronTaskResource> = [];

  platforms: Array<PlatformResource> = [];
  platformService: PlatformService;
  cronTaskService: CronTaskService;
  keywordService: KeywordService;
  platform?: number = 0;
  isUpdating = false;
  queries: any = {};

  constructor() {
    super();
    this.platformService = new PlatformService();
    this.cronTaskService = new CronTaskService();
    this.keywordService = new KeywordService();
  }

  @Watch("queries")
  onQueryChange() {
    console.log(this.queries);
  }

  @Watch("platform")
  onPlatformChange() {
    console.log(this.platform);
  }

  async onEnter(queries: any, index: number) {
    const rule: CronTaskResource = this.rules[index];
    console.log(rule);
    if (!rule) {
      return;
    }
    let keywords = rule.cronTaskKeywords;
    if (!keywords){
      keywords = [];
    }
    let flag = false;

    for (let keyword of keywords) {
      if (keyword.keyword === queries[index]) {
        flag = true;
      }
    }
    if (flag) {
      return;
    }
    const keyword = queries[index].toString();
    if (!keyword || !keyword.length){
      return;
    }
    const keywordResource = new KeywordsResource();

    keywordResource.keyword = keyword;
    keywordResource.cronTask = {
      id: rule.id,
      platform: rule.platform,
      user: rule.user
    };
    const saved = await this.keywordService.save(keywordResource);
    console.log(saved);
    if (!rule.cronTaskKeywords){
      rule.cronTaskKeywords = [];
    }
    rule.cronTaskKeywords.push(saved);
    queries[index] = "";
    console.log(this.rules);
  }

  async deleteRule(id: number) {
    const deleted = await this.cronTaskService.delete(id);

    if (deleted) {
      this.rules = this.rules.filter((r) => {
        return r.id !== id;
      });
    }
  }

  async newRule() {
    let plt = null;
    for (let plateform of this.platforms) {
      if (plateform.id === this.platform) {
        plt = plateform;
      }
    }
    if (!plt) {
      return;
    }
    for (let rule of this.rules) {
      if (rule.platform.id === plt.id) {
        return;
      }
    }
    const ct: CronTaskResource = {
      platform: plt,
      user: {
        id: 1,
        pseudo: "test",
        password: "test",
        email: "azerty123"
      }
    };
    this.rules.push(ct);
    const ctE: CronTaskResource = ct;
    const newCt = await this.cronTaskService.save(ct);
    ct.id = newCt.id;
  }

  async mounted() {
    console.dir(this.$refs.settings as HTMLElement);

    this.platforms = await this.platformService.findAll();
    if (this.platforms.length) {
      this.platform = this.platforms[0].id;
    }
    this.rules = await this.cronTaskService.findAll();
    console.log(this.rules);
  }
}
</script>
