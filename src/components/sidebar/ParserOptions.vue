<template>
  <ConfigurationItem title="Parser Options">
    <li>
      <div>
        Parser:
        <select
          :disabled="$store.state.eslint.parser !== 'vue-eslint-parser'"
          @change="changeParser"
        >
          <option v-for="parser in parsers" :key="parser" :value="parser">
            {{ parser }}
          </option>
        </select>
        <div>(Only available when using "vue-eslint-parser")</div>
      </div>
    </li>
  </ConfigurationItem>
</template>

<script>
import ConfigurationItem from './ConfigurationItem.vue'
import * as emitter from '../../events'

export default {
  name: 'ParserOptions',
  components: {
    ConfigurationItem
  },
  data() {
    return {
      parsers: ['espree', 'babel-eslint', 'typescript-eslint-parser']
    }
  },
  methods: {
    changeParser({ target: { value } }) {
      this.$store.commit('updateParserOptions', { parser: value })
      emitter.emit('lint')
    }
  }
}
</script>

<style lang="stylus" scoped>
select
  margin-left 5px
</style>
