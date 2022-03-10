export const fakeMessages = [
  {
    'type': 'text',
    'text': 'Hello. Have a nice day!',
    'disableInput': false
  },
  {
    'type': 'button',
    'text': 'How can we help you today?',
    'options': [
      {
        'text': 'Search Suport Articles',
        'value': 'search',
        'action': 'postback'
      },
      {
        'text': 'Submit Support Ticket',
        'value': 'submit_ticket',
        'action': 'postback'
      }
    ],
    'disableInput': true
  },
  {
    'type': 'text',
    'text': 'Please type your problem',
    'disableInput': false
  },
  {
    'type': 'button',
    'text': 'Here are the results from our knowledgebase.',
    'options': [
      {
        'text': 'How to create a menu',
        'value': 'https://google.com',
        'action': 'url'
      },
      {
        'text': 'How to add a submenu to a menu',
        'value': 'https://google.com',
        'action': 'url'
      },
      {
        'text': "Not what I'm looking for",
        'value': 'result_not_match',
        'action': 'postback'
      }
    ],
    'disableInput': true
  },
  {
    'type': 'text',
    'text': 'Sorry to hear that. Please type your problem and we will create a ticket for you.',
    'disableInput': false
  },
  {
    'type': 'button',
    'text': 'All done! Your support ticket is created.',
    'options': [
      {
        'text': 'View ticket',
        'value': 'https://google.com',
        'action': 'url'
      }
    ],
    'disableInput': false
  },
  {
    'type': 'image',
    'text': 'Open vk.',
    'options': [
      {
        'value': 'http://www.userlogos.org/files/vk-logo.png',
        'clickable': true,
        'action': 'https://vk.com/?lang=en'
      }
    ],
    'disableInput': false
  },
  {
    'type': 'image',
    'text': 'Clickable Image.',
    'options': [
      {
        'value': 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/social-youtube-icon.png',
        'clickable': true,
        'action': 'https://www.youtube.com/'
      }
    ],
    'disableInput': false
  },
  {
    'type': 'image',
    'text': 'Unclickable Image.',
    'options': [
      {
        'value': 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/social-youtube-icon.png',
        'clickable': false,
        'action': 'https://www.youtube.com/'
      }
    ],
    'disableInput': false
  }
]
