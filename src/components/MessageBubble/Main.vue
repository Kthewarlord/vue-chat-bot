<template lang="pug">
.qkb-msg-bubble(:class="bubbleClass")
  .qkb-msg-avatar(v-if="message.agent === 'bot'")
    .qkb-msg-avatar__img &nbsp;
  component(
    v-if="componentType",
    :is="componentType",
    :main-data="message"
  )
  .qkb-msg-bubble__time(v-if="message.createdAt")
    | {{ message.createdAt }}
</template>
<script>
import SingleText from './SingleText'
import ButtonOptions from './ButtonOptions'
import Imagetext from './Imagetext'
import Carousel from './Carousel'
import LineCarousel from './LineCarousel'
import ImageCarousel from './ImageCarousel'
import Sticker from './Sticker'
import Confirm from './Confirm'
import Imagemap from './Imagemap'
import Checkbox from './Checkbox'
import AltConfirm from './AlternateConfirm'
import LineButton from './LineButton'

export default {
  components: {
    SingleText,
    ButtonOptions,
    Imagetext,
    Carousel,
    Sticker,
    LineCarousel,
    ImageCarousel,
    Confirm,
    AltConfirm,
    Imagemap,
    Checkbox,
    LineButton
  },

  props: {
    message: {
      type: Object
    }
  },

  computed: {
    bubbleClass () {
      return this.message.agent === 'bot'
        ? 'qkb-msg-bubble--bot'
        : 'qkb-msg-bubble--user'
    },

    // Define the message type and return the specific component
    componentType () {
      let type = ''

      switch (this.message.type) {
        case 'button':
          type = 'ButtonOptions'
          break
        case 'image':
          type = 'Imagetext'
          break
        case 'carousel':
          type = 'Carousel'
          break
        case 'linecarousel':
          type = 'LineCarousel'
          break
        case 'imagecarousel':
          type = 'ImageCarousel'
          break
        case 'sticker':
          type = 'Sticker'
          break
        case 'confirm':
          type = 'Confirm'
          break
        case 'altconfirm':
          type = 'AltConfirm'
          break
        case 'imagemap':
          type = 'Imagemap'
          break
        case 'checkbox':
          type = 'Checkbox'
          break
        case 'linebutton':
          type = 'LineButton'
          break
        default:
          type = 'SingleText'
      }

      return type
    }
  }
}
</script>
