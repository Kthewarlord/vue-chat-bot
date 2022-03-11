<template>
<div class="qkb-msg-bubble-component qkb-msg-bubble-component--button-options" style="height: auto; width: 90%;">
    <div class="qkb-msg-bubble-component__text">
        <div class="qkb-msg-bubble-component__options-wrapper" style="margin: auto;display: block; height: auto; width: 90%;">
            <!--<div class="qkb-msg-bubble-component__text">-->
                <carousel
                    :centerMode="true"
                    :paginationEnabled="false"
                    :perPage="mainData.perpage"
                    :navigationEnabled="true"
                    :loop="true"
                    style="height: auto; width:100%;">
                    <slide v-for="(item, index) in mainData.options" :key="index">
                        <div style="margin: auto; display: block;" v-if="item.clickable==true">
                            <span style="text-align: center; display: block;">
                                {{item.toptext}}
                            </span>
                            <img :src="item.value" alt="Picture" width="220" height="220" style="margin: auto; display: block;">
                            <a target="_blank" :href="item.action">
                                <span style="margin-left: auto; margin-right: auto; display: block;">
                                    {{item.buttontext}}
                                </span>
                            </a>
                        </div>
                        <div style="margin: auto; display: block;" v-else>
                            <span style="margin-left: auto; margin-right: auto; display: block;">
                                {{item.toptext}}
                            </span>
                            <img :src="item.value" alt="Picture" width="220" height="220" style="margin: auto; display: block;">
                        </div>
                    </slide>
                </carousel>
            <!--</div>-->
        </div>
    </div>
</div>
</template>

<script>
import EventBus from '../../helpers/event-bus'
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide
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
