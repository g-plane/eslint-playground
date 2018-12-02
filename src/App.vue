<template>
  <div id="app">
    <AppHeader />
    <div class="app-body">
      <Configuration />
      <div class="workspace">
        <Editor />
        <Reports :reports="$store.state.eslint.result" />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import Configuration from './components/sidebar/Configuration.vue'
import Reports from './components/Reports.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    Configuration,
    Editor: () => import('./components/Editor.vue'),
    Reports
  }
}
</script>

<!-- eslint-disable max-len -->
<style lang="stylus">
#app
  font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif
  min-height 100vh

.app-body
  display flex
  flex-grow 1
  min-height 0

.workspace
  display flex
  flex-direction column
  flex-grow 1
</style>
