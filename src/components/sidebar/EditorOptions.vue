<template>
  <configuration-item title="Editor Options">
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
      <label>Indent size:&nbsp; <input type="number" v-model="size"/></label>
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
      <div>Font size: <input type="number" v-model="fontSize" /></div>
    </li>
    <li>
      <div>Font family: <input v-model="fontFamily" /></div>
    </li>
  </configuration-item>
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
