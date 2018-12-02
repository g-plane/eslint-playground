<template>
  <div class="config-item-container">
    <label class="config-item-header" @click="toggleExpanded">
      {{ title }}
    </label>
    <ul v-if="expanded" class="list">
      <slot />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationItem',
  props: {
    title: String,
    initialExpanded: Boolean
  },
  data() {
    return {
      expanded: !!this.initialExpanded
    }
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="stylus">
.config-item-container
  list-style none
  margin 0
  padding 0

.config-item-header
  display block
  position sticky
  top 0
  padding 8px
  color #fff
  background-color #8665e6
  border-bottom 1px solid #633adf
  font-weight bold
  cursor pointer
  box-shadow 0 2px 2px rgba(0,0,0, 0.25)

ul.list
  padding-left 0
  margin 0

  li
    display flex
    align-items center
    padding 5px
    list-style none
    border-bottom 1px solid #E8F5E9

    &:hover
      background-image linear-gradient(
        to bottom,
        rgba(0,0,0,0.065),
        rgba(0,0,0,0.0325) 67%,
        rgba(0,0,0,0.065)
      )
</style>
