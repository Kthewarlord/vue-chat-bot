<template>
<div class="qkb-msg-bubble-component qkb-msg-bubble-component--button-options">
    <div class="qkb-msg-bubble-component__options-wrapper">
        <div class="qkb-mb-button-options__item">
          <img :src="mainData.imagesource" alt="Imagemap" usemap="#immap" id="imgm">
          <map name="immap">
            <!-- <area v-for="(item, index) in mainData.clickablearea" :key="index" :shape="item.type" :coords="item.coords" :alt="item.areaname" target="_blank" :href="item.value">-->
            <div v-for="(item, index) in mainData.clickablearea" :key="index">
              <div v-if="item.action == 'url'">
                <area :shape="item.type" :coords="item.coords" :alt="item.areaname" target="_blank" :href="item.link">
              </div>
              <div v-else>
                <area :shape="item.type" :coords="item.coords" :alt="item.areaname" @click="selectOption(item)">
              </div>
            </div>
          </map>
        </div>
    </div>
</div>
</template>

<style>
#imgm{
    max-height:220px;
    max-width:220px;
    height:auto;
    width:auto;
}
</style>

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
