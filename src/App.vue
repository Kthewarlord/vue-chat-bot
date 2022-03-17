<template>
  <div id="app">
    <div id="block" style="border: 1px solid black; display: grid;">
      <img alt="Vue Bot UI" src="https://cdn-icons-png.flaticon.com/512/1786/1786548.png"/>
      <a href="https://www.flaticon.com/free-icons/bot" title="bot icons">Bot icons created by Freepik - Flaticon</a>
    </div>
    <VueBotUI
      :options="botOptions"
      :messages="messageData"
      :bot-typing="botTyping"
      :input-disable="inputDisable"
      :is-open="false"
      @init="botStart"
      @msg-send="msgSend">
    </VueBotUI>
  </div>
</template>

<script>
import BotIcon from './assets/icons/bot.png'
import { VueBotUI } from './vue-bot-ui'
import { messageService } from './helpers/message'

export default {
  components: {
    VueBotUI
  },

  data () {
    return {
      messageData: [],
      botTyping: false,
      inputDisable: false,
      botOptions: {
        botTitle: 'บอททดสอบ',
        colorScheme: '#335f6f',
        botAvatarImg: BotIcon,
        boardContentBg: '#f4f4f4',
        msgBubbleBgBot: '#fff',
        inputPlaceholder: 'พิมพ์ที่นี่',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: 'กรุณากดปุ่ม'
      }
    }
  },

  methods: {
    botStart () {
      // Get token if you want to build a private bot
      // Request first message here

      // Fake typing for the first message
      this.botTyping = true
      setTimeout(() => {
        this.botTyping = false
        this.messageData.push({
          agent: 'bot',
          type: 'text',
          text: 'สวัสดี'
        })
      }, 1000)
    },

    msgSend (value) {
      // Push the user's message to board
      this.messageData.push({
        agent: 'user',
        type: 'text',
        text: value.text
      })

      this.getResponse(value.text)
    },

    // Submit the message from user to bot API, then get the response from Bot
    getResponse (inputtext) {
      // Loading
      this.botTyping = true
      switch (inputtext) {
        case 'ชามเขียวคว่ำเช้า':
          const replyMessage = {
            agent: 'bot',
            type: 'text',
            text: 'ชามขาวคว่ำค่ำ',
            disableInput: false
          }
          this.messageData.push(replyMessage)
          // finish
          this.botTyping = false
          break
        case 'ปุ่มกด':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                type: 'button',
                text: 'กดปุ่มต่อไปนี้',
                options: [
                  {
                    text: 'เปิด Google',
                    value: 'https://google.com',
                    action: 'url'
                  },
                  {
                    text: 'ยกเลิก',
                    value: 'กดปุ่มยกเลิก',
                    action: 'postback' // Request to API
                  }
                ],
                disableInput: true
              }
              this.inputDisable = replyMessage.disableInput
              this.messageData.push(replyMessage)

              // finish
              this.botTyping = false
            })
          break
        case 'ยกเลิก':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                type: 'text',
                text: 'ยกเลิกปุ่มกดแล้ว สามารถพิมพ์ต่อได้',
                disableInput: false
              }
              this.messageData.push(replyMessage)
              this.inputDisable = replyMessage.disableInput
              // finish
              this.botTyping = false
            })
          break
        case 'วันนี้วันที่เท่าไหร่':
          var myDate = new Date()
          const td = 'วันนี้คือวันที่: ' + myDate.getDate().toString()

          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                type: 'text',
                text: td,
                disableInput: false
              }
              this.messageData.push(replyMessage)
              this.inputDisable = replyMessage.disableInput
              // finish
              this.botTyping = false
            })
          break
        case 'ขอไลน์หน่อย':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                'type': 'image',
                'text': 'คลิกที่รูปก็ได้นะ',
                'options': [
                  {
                    'value': 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2021/07/2301620.jpg',
                    'clickable': true,
                    'action': 'https://account.line.biz/login?redirectUri=https://page.line.biz/'
                  }
                ],
                'disableInput': false
              }

              this.inputDisable = response.disableInput
              this.messageData.push(replyMessage)

              // finish
              this.botTyping = false
            })
          break
        case 'sticker':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                'type': 'sticker',
                'stickersource': 'https://rumorscity.com/wp-content/uploads/line-sticker/0/0/100/2/main.png',
                'disableInput': false
              }

              this.inputDisable = response.disableInput
              this.messageData.push(replyMessage)

              // finish
              this.botTyping = false
            })
          break
        case 'carousel':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                'type': 'carousel',
                'loop': false,
                'align': 'center',
                'options': [
                  {
                    'toptext': 'ดงพญาเย็น',
                    'value': 'https://paikondieow.com/wp-content/uploads/2022/02/6-14.jpg',
                    'clickable': true,
                    'buttontext': 'รายละเอียด',
                    'action': 'https://paikondieow.com/dong-phayayen/'
                  },
                  {
                    'toptext': 'สวนท่าเนิน',
                    'value': 'https://i0.wp.com/www.chomthai.com/forum/picture/1293262165.jpg',
                    'clickable': false,
                    'action': 'none'
                  },
                  {
                    'toptext': 'สวนท่น',
                    'value': 'https://i0.wp.com/www.chomthai.com/forum/picture/1293262165.jpg',
                    'clickable': false,
                    'action': 'none'
                  },
                  {
                    'toptext': 'ไลน์',
                    'value': 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2021/07/2301620.jpg',
                    'clickable': true,
                    'action': 'https://account.line.biz/login?redirectUri=https://page.line.biz/'
                  }
                ],
                'disableInput': false
              }

              this.inputDisable = response.disableInput
              this.messageData.push(replyMessage)

              // finish
              this.botTyping = false
            })
          break
        case 'lc':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                'type': 'linecarousel',
                'loop': false,
                'align': 'center',
                'options': [
                  {
                    'maintext': 'ดงพญาเย็น',
                    'description': 'ร้อนๆ แบบนี้ แนะนำว่าต้องไปเที่ยว น้ำตก กันเลย และถ้าจะหาที่เที่ยวใกล้กรุงเทพ น้ำตกสวยๆ ก็ต้อง จังหวัดสระบุรี เลยค่ะ ซึ่งเราจะพาไปน้ำตกที่อยู่ใกล้ๆ น้ำตกเจ็ดสาวน้อย นั่นก็คือ น้ำตกดงพญาเย็น อย่ารอช้าดีกว่า ไปรับความสดชื่น เล่นน้ำคลายร้อนกันเลย',
                    'value': 'https://paikondieow.com/wp-content/uploads/2022/02/6-14.jpg',
                    'clickable': true,
                    'buttons': [
                      {
                        text: 'รายละเอียด',
                        value: 'https://paikondieow.com/dong-phayayen/',
                        action: 'url'
                      },
                      {
                        text: 'ยกเลิก',
                        value: 'กดปุ่มยกเลิก',
                        action: 'postback' // Request to API
                      }
                    ]
                  },
                  {
                    'maintext': 'สวนท่าเนิน',
                    'description': 'ท่าเรือน้ำลึกแหลมฉบัง เป็นท่าเรือน้ำลึกหลักในการขนส่งสินค้าระหว่างประเทศ ตั้งอยู่ในเขตเทศบาลนครแหลมฉบัง อำเภอศรีราชา และ อำเภอบางละมุง จังหวัดชลบุรี อยู่ภายใต้การดูแลของการท่าเรือแห่งประเทศไทยในเรื่องการบริหารท่าเรือโดยรวม และมีเอกชนรับผิดชอบในเรื่องปฏิบัติการ',
                    'value': 'https://i0.wp.com/www.chomthai.com/forum/picture/1293262165.jpg',
                    'clickable': false,
                    'buttons': [
                      {
                        text: 'รายละเอียด',
                        value: 'https://paikondieow.com/dong-phayayen/',
                        action: 'url'
                      },
                      {
                        text: 'ยกเลิก',
                        value: 'กดปุ่มยกเลิก',
                        action: 'postback' // Request to API
                      }
                    ]
                  },
                  {
                    'maintext': 'สวนท่น',
                    'value': 'https://i0.wp.com/www.chomthai.com/forum/picture/1293262165.jpg',
                    'clickable': false,
                    'action': 'none'
                  },
                  {
                    'maintext': 'ไลน์',
                    'value': 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2021/07/2301620.jpg',
                    'clickable': true,
                    'action': 'https://account.line.biz/login?redirectUri=https://page.line.biz/'
                  }
                ],
                'disableInput': false
              }

              this.inputDisable = response.disableInput
              this.messageData.push(replyMessage)

              // finish
              this.botTyping = false
            })
          break
        default:
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                ...response
              }

              this.inputDisable = response.disableInput
              this.messageData.push(replyMessage)

              // finish
              this.botTyping = false
            })
      }
      // Post the message from user here
      // Then get the response as below
      // Create new message from fake data
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #5239df;
  margin-top: 60px;
}
#block {
  display: block;
}
</style>
