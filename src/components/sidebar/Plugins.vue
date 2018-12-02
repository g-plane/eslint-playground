<template>
  <ConfigurationItem title="3rd-party Plugins">
    <li v-for="plugin in plugins" :key="plugin" @click="loadPlugin(plugin)">
      Load eslint-plugin-{{ plugin }}
    </li>
  </ConfigurationItem>
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
