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
        case 'ปุ่มว่างเว้น':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                type: 'button',
                text: 'ปุ่มว่าง\nเว้นบรรทัด',
                options: [
                ],
                disableInput: false
              }
              this.inputDisable = replyMessage.disableInput
              this.messageData.push(replyMessage)

              // finish
              this.botTyping = false
            })
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
                    value: 'คำที่พิมพ์กลับไปจะดูจากtextไม่ใช่value',
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
        case 'aa':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                'type': 'checkbox',
                'text': 'ท่านมีอาการในข้อใดบ้าง',
                'options': {
                  'ปวดหัว': false,
                  'ปวดตัว': false,
                  'ปวดขา': false
                },
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
        case 'confirm':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                'type': 'confirm',
                'maintext': 'operation confirm?',
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
                ],
                'disableInput': false
              }

              this.inputDisable = response.disableInput
              this.messageData.push(replyMessage)

              // finish
              this.botTyping = false
            })
          break
        case 'ac':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                'type': 'altconfirm',
                'maintext': 'operation?',
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
                ],
                'disableInput': false
              }

              this.inputDisable = response.disableInput
              this.messageData.push(replyMessage)

              // finish
              this.botTyping = false
            })
          break
        case 'im':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                'type': 'imagemap',
                'imagesource': 'https://well-of-souls.com/civ/images/gak_new_york.jpg',
                'clickablearea': [
                  {
                    type: 'circle',
                    coords: '60, 60, 30',
                    value: 'https://paikondieow.com/dong-phayayen/',
                    areaname: 'test',
                    action: 'url'
                  },
                  {
                    type: 'circle',
                    coords: '120, 120, 20',
                    text: 'arai',
                    areaname: 'test2',
                    action: 'postback'
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
                    'banner': false,
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
                    'banner': false,
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
                    'maintext': 'bannertest1',
                    'description': 'bannertest1 for linecarousel hshidujlsfisvklr [bpl,juiyughj',
                    'value': 'https://i0.wp.com/www.chomthai.com/forum/picture/1293262165.jpg',
                    'clickable': true,
                    'banner': true,
                    'bannertext': 'ลดราคา50%',
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
                    'banner': true,
                    'bannertext': 'ลดราคา100000000000%',
                    'action': 'none'
                  },
                  {
                    'maintext': 'ไลน์',
                    'value': 'https://d2ijd3g5wqapxj.cloudfront.net/wp-content/uploads/2021/07/2301620.jpg',
                    'clickable': true,
                    'banner': false,
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
        case 'ic':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                'type': 'imagecarousel',
                'loop': false,
                'align': 'center',
                'options': [
                  {
                    'alttext': 's1',
                    'value': 'https://www.cotrpro.com/wp-content/uploads/2020/05/96109814_1872237702907566_3623413605531123712_o-768x768.png',
                    'clickable': true,
                    'label': 'รายละเอียด',
                    'button': 'https://www.cotrpro.com/2020/05/11/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%82%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B8%84%E0%B8%B8%E0%B9%89%E0%B8%A1-%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%AE%E0%B8%B0%E0%B8%88/',
                    'action': 'url'
                  },
                  {
                    'alttext': 's2',
                    'value': 'http://thaiten.com/wp-content/uploads/2018/02/product6_cut_r6_c4.png',
                    'clickable': false
                  },
                  {
                    'alttext': 's3',
                    'value': 'https://hachiban.co.th/_files/product/full/JXB6CGZH.png',
                    'clickable': false,
                    'action': 'none'
                  },
                  {
                    'alttext': 's4',
                    'value': 'https://hachiban.co.th/_files/product/full/O92RX6WM.png',
                    'clickable': true,
                    'label': 'สั่งซื้อ',
                    'text': 'สั่งซื้อลูกชิ้นเลขแปด',
                    'action': 'postback'
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
        case 'สั่งซื้อลูกชิ้นเลขแปด':
          messageService.createMessage()
            .then((response) => {
              const replyMessage = {
                agent: 'bot',
                'type': 'linebutton',
                'buttonsize': 'small',
                'maintext': 'ลูกชิ้นเลขแปด',
                'description': 'ท่านได้สั่งซื้อลูกชิ้นเลขแปด ราคา 50 บาท',
                'value': 'https://hachiban.co.th/_files/product/full/O92RX6WM.png',
                'options': [
                  {
                    'label': 'ยืนยันสั่งซื้อและชำระเงิน',
                    'text': 'ยืนยันสั่งซื้อลูกชิ้นเลขแปดและชำระเงิน',
                    'action': 'postback'
                  },
                  {
                    'label': 'รายละเอียด',
                    'button': 'https://www.cotrpro.com/2020/05/11/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%82%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B8%84%E0%B8%B8%E0%B9%89%E0%B8%A1-%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%AE%E0%B8%B0%E0%B8%88/',
                    'action': 'url'
                  },
                  {
                    'label': 'ยกเลิก',
                    'text': 'ยกเลิกสั่งซื้อลูกชิ้นเลขแปด',
                    'action': 'postback'
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
