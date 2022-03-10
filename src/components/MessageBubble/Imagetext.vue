<template>
<div class="qkb-msg-bubble-component qkb-msg-bubble-component--button-options">
    <div class="qkb-msg-bubble-component__text">
        <span>
          {{ mainData.text }}
        </span>
        <div class="qkb-msg-bubble-component__options-wrapper">
            <div class="qkb-mb-button-options__item" v-for="(item, index) in mainData.options" :class="{ active: selectedItem === item.value }" :key="index">
                <div class="qkb-msg-bubble-component__text">
                  <a target="_blank" v-if="item.clickable==true" :href="item.action">
                    <img :src="item.value" alt="Picture" width="220" height="220">
                  </a>
                  <div v-else>
                    <img :src="item.value" alt="Picture" width="220" height="220">
                  </div>
                </div>
            </div>
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
