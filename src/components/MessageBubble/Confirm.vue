<template>
<div style="margin-right: 10px; padding: 0px; display: block;" class="qkb-msg-bubble-component__text">
  <h4 style="text-align: left; margin: 5px auto 5px 5px; width: 190px; display: block;">
      {{mainData.maintext}}
  </h4>
  <div style="background-color:white; border-style: solid none none none; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;" v-for="(i, index) in mainData.buttons" :key="index">
      <button v-if="i.action === 'postback'" style="font-size: small; margin-left:auto; margin-right:auto; display:block; border: none; background-color: white;" @click="selectOption(i)">
        <span style="">{{ i.text }}</span>
      </button>
      <a target="_blank" v-else style="font-size: small; margin-left:auto; margin-right:auto; display:block; text-align: center; border: none; color:black; text-decoration: none;" :href="i.value">
        {{ i.text }}
      </a>
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
