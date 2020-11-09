import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    platforms: {
      selected: null
    },
    keywords: []
  },
  mutations: {
    makeKeywords: (state, keywords) => {
      state.keywords = keywords;
    },
    addKeyword: (state, keyword: string) => {
      (state.keywords as string[]).push(keyword);
    },
    removeKeyword: (state, keyword: string) => {
      const keywords: Array<string> = state.keywords;

      for (let i = 0; i < keywords.length; i++) {
        if (keywords[i] === keyword) {
          keywords.splice(i, 1);
          i--;
        }
      }
      (state.keywords as string[]) = keywords;
    },
    clearKeywords: (state) => {
      state.keywords = [];
    }
  },
  actions: {
  },
  modules: {
  }
})
