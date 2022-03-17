<template>
    <div style="margin-left: 10px; width:90%;">
      <Flicking :options="{ circular: mainData.loop, align: mainData.align }">
        <div v-for="(item, index) in mainData.options" :key="index" class="panel">
          <div v-if="item.clickable==true">
            <div style="margin-right: 10px; padding: 0px; display: block;" class="qkb-msg-bubble-component__text">
              <img :src="item.value" alt="Picture" width="200" height="180" style="border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;" draggable="false">
              <span style="text-align: center; display: block;">
                  {{item.toptext}}
              </span>
              <a target="_blank" :href="item.action">
                  <span style="text-align: center; display: block;">
                      {{item.buttontext}}
                  </span>
              </a>
            </div>
          </div>
          <div v-else>
            <div style="margin-right: 10px; padding: 0px; display: block;" class="qkb-msg-bubble-component__text">
              <img :src="item.value" alt="Picture" width="200" height="180" style="border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;" draggable="false">
              <!--<div width="200" height="180" style="background-image: url(); border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;">{{item.maintext}}</div>-->
              <h3 style="text-align: left; margin: 5px auto 5px 5px; width: 190px; display: block;">
                  {{item.maintext}}
              </h3>
              <h4 style="text-align: left; margin: 5px auto 10px 5px; width: 190px; color:Gray; display: block;">
                  {{item.description}}
              </h4>
              <div style="background-color:white; border-style: solid none none none; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;" v-for="(i, index) in item.buttons" :key="index">
                  <button v-if="i.action === 'postback'" style="font-size: small; margin-left:auto; margin-right:auto; display:block; border: none; background-color: white;" @click="selectOption(i)">
                    <span style="">{{ i.text }}</span>
                  </button>
                  <a target="_blank" v-else style="font-size: small; margin-left:auto; margin-right:auto; display:block; text-align: center; border: none; color:black; text-decoration: none;" :href="i.value">
                    {{ i.text }}
                  </a>
              </div>
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
