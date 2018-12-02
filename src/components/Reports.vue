<template>
  <div class="reports-container">
    <ul>
      <li
        v-for="report in reports"
        :key="report.rule + report.startLine + report.startColumn"
        :style="{ color: report.severity === 2 ? '#e73232' : '#e6ac00' }"
        @click="locate({ line: report.startLine, column: report.startColumn })"
      >
        <span class="tiny-spacing">
          <icon-error v-if="report.severity === 2" />
          <icon-warning v-else />
        </span>
        <span class="tiny-spacing">{{ report.message }}</span>
        <span v-if="report.rule" class="tiny-spacing">
          ({{ report.rule }})
        </span>
        <span>({{ report.startLine }}, {{ report.startColumn }})</span>
      </li>
    </ul>
  </div>
</template>

<script>
import IconError from './icons/Error.vue'
import IconWarning from './icons/Warning.vue'
import * as emitter from '../events'

export default {
  name: 'Reports',
  components: {
    IconError,
    IconWarning
  },
  props: ['reports'],
  methods: {
    locate(position) {
      emitter.emit('editor-locate', position)
    }
  }
}
</script>

<style lang="stylus">
.reports-container
  max-height calc(100vh - 70vh - 34px)

  ul
    margin 0
    padding-left 0
    max-height calc(100vh - 70vh - 34px)
    overflow-x hidden
    overflow-y scroll

    li
      list-style none
      padding 5px 0 5px 10px
      margin 0
      border-bottom 1px solid #ccc

      &:hover
        cursor pointer
        background-image linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.065),
          rgba(0, 0, 0, 0.0325) 67%,
          rgba(0, 0, 0, 0.065)
        )

.tiny-spacing
  padding-right 4px
</style>
