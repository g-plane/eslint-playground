<template>
  <ConfigurationItem title="Editor Options">
    <li>
      <div>
        Indent type:
        <select v-model="type">
          <option value="space">Space</option>
          <option value="tab">Tab</option>
        </select>
      </div>
    </li>
    <li>
      <label>Indent size:&nbsp; <input v-model="size" type="number"></label>
    </li>
    <li>
      <div>
        Theme:
        <select v-model="theme">
          <option value="vs">Visual Studio</option>
          <option value="vs-dark">Visual Studion Dark</option>
        </select>
      </div>
    </li>
    <li>
      <div>Font size: <input v-model="fontSize" type="number"></div>
    </li>
    <li>
      <div>Font family: <input v-model="fontFamily"></div>
    </li>
  </ConfigurationItem>
</template>

<script>
import ConfigurationItem from './ConfigurationItem.vue'
import * as emitter from '../../events'

export default {
  name: 'EditorOptions',
  components: {
    ConfigurationItem
  },
  data() {
    return {
      type: 'space',
      size: 2,
      theme: 'vs',
      fontSize: 14,
      fontFamily: 'Monaco, Consolas'
    }
  },
  watch: {
    type() {
      emitter.emit('indent-update', this.$data)
    },
    size() {
      emitter.emit('indent-update', this.$data)
    },
    theme(value) {
      emitter.emit('theme-change', value)
    },
    fontSize(value) {
      emitter.emit('font-size-change', value)
    },
    fontFamily(value) {
      emitter.emit('font-family-change', value)
    }
  }
}
</script>
