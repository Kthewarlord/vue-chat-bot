<template>
    <div style="margin-left: 10px; width:90%;">
      <div v-if="mainData.buttonsize=='large'">
        <div style="margin-right: 10px; padding: 0px; display: block; width: 320px;" class="qkb-msg-bubble-component__text">
          <img :src="mainData.value" alt="Picture" width="320" height="220" style="border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;" draggable="false">
          <!--<div width="200" height="180" style="background-image: url(); border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;">{{item.maintext}}</div>-->
          <h3 style="text-align: left; margin: 5px auto 5px 5px; width: 310px; display: block;">
              {{mainData.maintext}}
          </h3>
          <h4 style="text-align: left; margin: 5px auto 10px 5px; width: 310px; color:Gray; display: block;">
              {{mainData.description}}
          </h4>
          <div style="width: 310px; margin-top: 5px; padding-top: 5px; padding-bottom: 5px; background-color: white; border-color: GhostWhite; border-style: solid none none none; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;">
            <div v-for="(i, index) in mainData.options" :key="index">
              <a target="_blank" v-if="i.action === 'url'" style="font-size: small; margin-left:auto; margin-right:auto; margin-bottom: 5px; width: 310px; display:block; text-align: center; border: none; color:black; text-decoration: none;" :href="i.button">
                {{ i.label }}
              </a>
              <button v-else style="font-size: small; margin-left:auto; margin-right:auto; margin-bottom: 5px; width: 310px; display:block; border: none; background-color: white;" @click="selectOption(i)">
                <span style="">{{ i.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div style="margin-right: 10px; padding: 0px; display: block; width: 200px;" class="qkb-msg-bubble-component__text">
          <img :src="mainData.value" alt="Picture" width="200" height="180" style="border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;" draggable="false">
          <!--<div width="200" height="180" style="background-image: url(); border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;">{{item.maintext}}</div>-->
          <h3 style="text-align: left; margin: 5px auto 5px 5px; width: 190px; display: block;">
              {{mainData.maintext}}
          </h3>
          <h4 style="text-align: left; margin: 5px auto 10px 5px; width: 190px; color:Gray; display: block;">
              {{mainData.description}}
          </h4>
          <div style="width: 190px; margin-top: 5px; padding-top: 5px; padding-bottom: 5px; background-color: white; border-color: GhostWhite; border-style: solid none none none; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;">
            <div v-for="(i, index) in mainData.options" :key="index">
              <a target="_blank" v-if="i.action === 'url'" style="font-size: small; margin-left:auto; margin-right:auto; margin-bottom: 5px; width: 190px; display:block; text-align: center; border: none; color:black; text-decoration: none;" :href="i.button">
                {{ i.label }}
              </a>
              <button v-else style="font-size: small; margin-left:auto; margin-right:auto; margin-bottom: 5px; width: 190px; display:block; border: none; background-color: white;" @click="selectOption(i)">
                <span style="">{{ i.label }}</span>
              </button>
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
