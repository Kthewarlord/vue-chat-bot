<template>
    <div class="qkb-msg-bubble-component__text" style="margin-left: 10px; width:90%;">
      <Flicking :options="{ circular: mainData.loop, align: mainData.align }">
        <div v-for="(item, index) in mainData.options" :key="index" class="panel">
          <div v-if="item.clickable==true">
            <div style="margin-left: 10px; margin-right: 15px; display: block;">
              <span style="text-align: center; display: block;">
                  {{item.toptext}}
              </span>
              <img :src="item.value" alt="Picture" width="200" height="200" style="margin: auto; display: block;" draggable="false">
              <a target="_blank" :href="item.action">
                  <span style="text-align: center; display: block;">
                      {{item.buttontext}}
                  </span>
              </a>
            </div>
          </div>
          <div v-else>
            <div style="margin-left: 10px; margin-right: 15px; display: block;">
              <span style="text-align: center; display: block;">
                  {{item.toptext}}
              </span>
              <img :src="item.value" alt="Picture" width="200" height="200" style="margin: auto; display: block;" draggable="false">
            </div>
          </div>
        </div>
      </Flicking>
    </div>
</template>

<script>
import EventBus from '../../helpers/event-bus'
import { Flicking } from '@egjs/vue-flicking'

export default {
  components: {
    Flicking
  },
  props: {
    mainData: {
      type: Object
    }
  },

  data () {
    return {
      selectedItem: null,
      slide: 0,
      sliding: null
    }
  },

  methods: {
    selectOption (value) {
      this.selectedItem = value
      EventBus.$emit('select-button-option', value)
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
