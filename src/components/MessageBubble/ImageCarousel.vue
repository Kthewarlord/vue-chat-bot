<template>
      <Flicking :options="{ circular: mainData.loop, align: mainData.align }">
        <div v-for="(item, index) in mainData.options" :key="index" class="panel">
          <div v-if="item.clickable==true">
            <div style="margin-left: 10px; margin-right: 15px; display: block;">
              <div class="container">
                <img :src="item.value" :alt="item.alttext" width="200" height="200" style="margin: auto; display: block;" draggable="false">
                <a class="btn" v-if="item.action=='url'" :href="item.button" target="_blank">{{item.label}}</a>
                <button class="btn" v-else @click="selectOption(item)">{{item.label}}</button>
              </div>
            </div>
          </div>
          <div v-else>
            <div style="margin-left: 10px; margin-right: 15px; display: block;">
              <img :src="item.value" :alt="item.alttext" width="200" height="200" style="margin: auto; display: block;" draggable="false">
            </div>
          </div>
        </div>
      </Flicking>
</template>

<style scoped>
/* Container needed to position the button. Adjust the width as needed */
.container {
  position: relative;
  width: 100%;
}

/* Make the image responsive */
.container img {
  width: 200px;
  height: 200px;
}

/* Style the button and place it in the middle of the container/image */
/* text-decoration: none; is to remove underline from <a> tag */
.container .btn {
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #555;
  color: white;
  font-size: 12px;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  text-decoration: none;
}

.container .btn:hover {
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
