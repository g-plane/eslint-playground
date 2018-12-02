<template>
  <div class="sidebar">
    <ParserSelect />
    <ParserOptions />
    <EditorOptions />
    <Env />
    <SharedSettings />
    <Plugins />
    <Rules />
    <Versions />
  </div>
</template>

<script>
import ParserSelect from './ParserSelect.vue'
import ParserOptions from './ParserOptions.vue'
import EditorOptions from './EditorOptions.vue'
import Env from './Env.vue'
import SharedSettings from './SharedSettings.vue'
import Plugins from './Plugins.vue'
import Rules from './Rules.vue'
import Versions from './Versions.vue'

export default {
  name: 'Configuration',
  components: {
    ParserSelect,
    ParserOptions,
    EditorOptions,
    Env,
    SharedSettings,
    Plugins,
    Rules,
    Versions
  }
}
</script>

<style lang="stylus">
.sidebar
  width calc(25% - 1px)
  height calc(100vh - 34px)
  border-right 1px solid #CCC
  margin 0
  padding 0
  overflow-x hidden
  overflow-y scroll
  user-select none
</style>
