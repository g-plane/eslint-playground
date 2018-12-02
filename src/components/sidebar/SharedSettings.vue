<template>
  <ConfigurationItem title="Shared Settings">
    <li>
      <label>
        React Pragma:
        <input
          type="text"
          style="margin-left: 5px"
          :value="$store.state.eslint.settings.reactPragma"
          @input="changeReactPragma"
        >
      </label>
    </li>
    <li>
      <label>
        <input
          type="checkbox"
          :checked="$store.state.eslint.settings.onlyFilesWithFlowAnnotation"
          @change="toggleOnlyFilesWithFlowAnnotation"
        >
        Only files with flow annotation
      </label>
    </li>
  </ConfigurationItem>
</template>

<script>
import ConfigurationItem from './ConfigurationItem.vue'
import * as emitter from '../../events'

export default {
  name: 'FormatOptions',
  components: {
    ConfigurationItem
  },
  methods: {
    changeReactPragma({ target: { value } }) {
      this.$store.commit('changeReactPragma', value)
      emitter.emit('lint')
    },
    toggleOnlyFilesWithFlowAnnotation() {
      this.$store.commit('toggleOnlyFilesWithFlowAnnotation')
      emitter.emit('lint')
    }
  }
}
</script>
