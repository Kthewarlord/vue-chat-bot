<template>
<div class="qkb-msg-bubble-component qkb-msg-bubble-component--button-options">
    <div class="qkb-msg-bubble-component__options-wrapper">
        <div class="qkb-mb-button-options__item">
          <img :src="mainData.stickersource" alt="Picture" width="220" height="220" draggable="false">
        </div>
    </div>
</div>
</template>
<script>
import EventBus from '../../helpers/event-bus'

export default {
  props: {
    mainData: {
      type: Object
    }
  },

  data () {
    return {
      selectedItem: null
    }
  },

  methods: {
    selectOption (value) {
      this.selectedItem = value
      EventBus.$emit('select-button-option', value)
    }
  }
}
</script>
