<template>
  <configuration-item title="3rd-party Plugins">
    <li @click="loadPlugin(plugin)" v-for="plugin in plugins" :key="plugin">
      Load eslint-plugin-{{ plugin }}
    </li>
  </configuration-item>
</template>

<script>
import ConfigurationItem from './ConfigurationItem.vue'
import { loadPlugin } from '../../linter'

export default {
  name: 'Plugins',
  components: {
    ConfigurationItem
  },
  data() {
    return {
      plugins: ['vue', 'react', 'flowtype', 'typescript', 'promise', 'unicorn']
    }
  },
  methods: {
    loadPlugin
  }
}
</script>

<style lang="stylus" scoped>
li
  &:hover
    cursor pointer
</style>
