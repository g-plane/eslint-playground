<template>
  <ConfigurationItem title="Environments">
    <li v-for="env in envs" :key="env">
      <label>
        <input
          type="checkbox"
          :value="env"
          :checked="enabled.includes(env)"
          @change="toggleEnv"
        >{{ env }}
      </label>
    </li>
  </ConfigurationItem>
</template>

<script>
import { mapState } from 'vuex'
import ConfigurationItem from './ConfigurationItem.vue'
import * as emitter from '../../events'

export default {
  name: 'Env',
  components: {
    ConfigurationItem
  },
  data() {
    return {
      envs: [
        'browser',
        'node',
        'commonjs',
        'shared-node-browser',
        'es6',
        'worker',
        'amd',
        'mocha',
        'jasmine',
        'jest',
        'phantomjs',
        'protractor',
        'qunit',
        'jquery',
        'prototypejs',
        'shelljs',
        'meteor',
        'mongo',
        'applescript',
        'nashorn',
        'serviceworker',
        'atomtest',
        'embertest',
        'webextensions',
        'greasemonkey'
      ]
    }
  },
  computed: mapState({
    enabled: state => state.eslint.envs
  }),
  methods: {
    toggleEnv({ target: { value } }) {
      this.$store.commit('toggleEnv', value)
      emitter.emit('lint')
    }
  }
}
</script>
