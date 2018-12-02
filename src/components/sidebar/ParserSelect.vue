<template>
  <configuration-item title="Parser" :initial-expanded="true">
    <li v-for="parser in parsers" :key="parser">
      <label>
        <input
          type="radio"
          name="parser"
          :value="parser"
          v-model="current"
        />&nbsp;{{ parser }}
      </label>
    </li>
  </configuration-item>
</template>

<script>
import ConfigurationItem from './ConfigurationItem.vue'
import { switchParser } from '../../linter'

export default {
  name: 'ParserSelect',
  components: {
    ConfigurationItem
  },
  data() {
    return {
      current: 'espree',
      parsers: [
        'espree',
        'babel-eslint',
        'typescript-eslint-parser',
        'vue-eslint-parser'
      ]
    }
  },
  watch: {
    current(value) {
      switchParser(value)
    }
  }
}
</script>
