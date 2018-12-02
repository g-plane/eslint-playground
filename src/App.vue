<template>
  <div id="app">
    <app-header />
    <div class="app-body">
      <configuration />
      <div class="workspace">
        <editor /> <reports :reports="$store.state.eslint.result" />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import Configuration from './components/sidebar/Configuration.vue'
import Reports from './components/Reports.vue'

export default {
  name: 'app',
  components: {
    AppHeader,
    Configuration,
    Editor: () => import('./components/Editor.vue'),
    Reports
  }
}
</script>

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
