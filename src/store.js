import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    code: 'var a = 0\n',
    eslint: {
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      envs: ['browser'],
      settings: {
        reactPragma: 'React.createElement',
        onlyFilesWithFlowAnnotation: true
      },
      rules: Object.create(null),
      result: []
    }
  },
  getters: {
    getRules(state) {
      return Object.keys(state.eslint.rules)
    }
  },
  mutations: {
    updateCode(state, code) {
      state.code = code
    },
    changeParser(state, parser) {
      state.eslint.parser = parser
    },
    updateParserOptions(state, options) {
      state.eslint.parserOptions = { ...state.eslint.parserOptions, ...options }
    },
    toggleEnv(state, env) {
      const index = state.eslint.envs.indexOf(env)
      if (!~index) {
        state.eslint.envs.push(env)
      } else {
        state.eslint.envs.splice(index, 1)
      }
    },
    changeReactPragma(state, pragma) {
      state.eslint.settings.reactPragma = pragma
    },
    toggleOnlyFilesWithFlowAnnotation(state) {
      state.eslint.settings.onlyFilesWithFlowAnnotation = !state.eslint.settings
        .onlyFilesWithFlowAnnotation
    },
    updateRules(state, rules) {
      for (const rule of rules) {
        state.eslint.rules[rule] = 0
      }
    },
    updateSeverity(state, { rule, severity }) {
      state.eslint.rules[rule] = +severity
    },
    updateLintResult(state, result) {
      state.eslint.result = result
    }
  }
})
