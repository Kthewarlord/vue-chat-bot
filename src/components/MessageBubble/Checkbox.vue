<template>
<div class="qkb-msg-bubble-component qkb-msg-bubble-component--button-options">
    <div class="qkb-msg-bubble-component__text">
        <span>
          {{ mainData.text }}
        </span>
        <div class="flex mx-1 mt-1 mb-1">
            <div v-for="(value, key, index) in mainData.options" :key="index" style="display: flex; align-items: center;">
                <input type="checkbox" :id="key" v-model="mainData.options[key]">
                <label :for="key">{{ key }} {{ value }}</label>
            </div>
        </div>
    </div>
    <div class="qkb-msg-bubble-component__options-wrapper">
        <div class="qkb-mb-button-options__item">
            <button class="qkb-mb-button-options__btn" @click="submitt(mainData.options)">
                <span>Submit</span>
            </button>
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
    },
    submitt (submitted) {
      // alert('submitted')
      console.log('Submitted Value: ', submitted)
    }
  }
}
</script>
