<template>
    <div style="margin-left: 10px; width:90%;">
      <Flicking :options="{ circular: mainData.loop, align: mainData.align }">
        <div v-for="(item, index) in mainData.options" :key="index" class="panel">
          <div v-if="item.clickable==true">
            <div style="margin-right: 10px; padding: 0px; display: block;" class="qkb-msg-bubble-component__text">
              <div v-if="item.banner==true" class="container">
                <img class="cimg" :src="item.value" alt="Picture" width="200" height="180" style="border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;" draggable="false">
                <div class="banner">Test</div>
              </div>
              <div v-else>
                <img :src="item.value" alt="Picture" width="200" height="180" style="border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;" draggable="false">
              </div>
              <span style="text-align: center; display: block;">
                  {{item.maintext}}
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
              <div v-if="item.banner==true" class="container">
                <img class="cimg" :src="item.value" alt="Picture" width="200" height="180" style="border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;" draggable="false">
                <div class="banner">{{item.bannertext}}</div>
              </div>
              <div v-else>
                <img :src="item.value" alt="Picture" width="200" height="180" style="border-top-style: hidden; border-top-right-radius: 10px; border-top-left-radius: 10px; display: block;" draggable="false">
              </div>
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

<style scoped>
/* Container needed to position the button. Adjust the width as needed */
.container {
  position: relative;
  width: 100%;
}

/* Make the image responsive */
.container .cimg {
  width: 200px;
  height: 180px;
}

/* Style the button and place it in the middle of the container/image */
/* text-decoration: none; is to remove underline from <a> tag */
/*
  These two properties will make the element absolute position starts from the center of the element instead of the left of the element
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
*/
.container .banner {
  position: absolute;
  top: 5%;
  left: 5%;
  background-color: #555;
  color: white;
  font-size: 10px;
  padding: 4px 8px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
}

.container .banner:hover {
  background-color: black;
  opacity: 0.5;
}
</style>

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
