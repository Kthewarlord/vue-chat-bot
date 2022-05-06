<template>
  <div class="qkb-msg-bubble-component qkb-msg-bubble-component--button-options">
    <div class="qkb-msg-bubble-component__text">
      <span v-for="(line, lineindex) of mainData.text.split('\n')" v-bind:key="lineindex" >
        {{ line }}
        <br/>
      </span>
    </div>
    <div class="qkb-msg-bubble-component__options-wrapper">
      <div class="qkb-mb-button-options__item" v-for="(item, index) in mainData.options" :class="{ active: selectedItem === item.value }" :key="index">
        <button class="qkb-mb-button-options__btn" v-if="item.action === 'postback'" @click="selectOption(item)">
          <span>{{ item.displaytext }}</span>
        </button>
        <a class="qkb-mb-button-options__btn qkb-mb-button-options__url" target="_blank" v-else :href="item.value">
          <span>{{ item.displaytext }}</span>
        </a>
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
