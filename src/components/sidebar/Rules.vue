<template>
  <ConfigurationItem title="Rules">
    <li v-for="rule in getRules" :key="rule">
      <div>
        <div class="rule-name">{{ rule }}</div>
        <select @change="updateRuleSeverity(rule, $event)">
          <option :value="0">Disable</option>
          <option :value="1">Warning</option>
          <option :value="2">Error</option>
        </select>
      </div>
    </li>
  </ConfigurationItem>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfigurationItem from './ConfigurationItem.vue'
import * as emitter from '../../events'

export default {
  name: 'Rules',
  components: {
    ConfigurationItem
  },
  computed: mapGetters(['getRules']),
  methods: {
    // prettier-ignore
    updateRuleSeverity(rule, { target: { value } }) {
      this.$store.commit('updateSeverity', { rule, severity: value })
      emitter.emit('lint')
    }
  }
}
</script>

<style lang="stylus">
.rule-name
  font-weight bold
</style>
