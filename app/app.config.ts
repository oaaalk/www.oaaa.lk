export default defineAppConfig({
  global: {
    picture: {
      dark: 'oaaa.jpg',
      light: 'oaaa.jpg',
      alt: 'OAAA Logo'
    },
    meetingLink: 'https://cal.com/',
    email: 'astroananda@gmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'neutral',
      neutral: 'neutral'
    }
  },
  uiPro: {
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-facebook',
      'to': 'https://www.facebook.com/profile.php?id=61574129990479',
      'target': '_blank',
      'aria-label': 'OAAA Facebook'
    }, {
      'icon': 'i-simple-icons-instagram',
      'to': ' https://www.instagram.com/astro_ananda/',
      'target': '_blank',
      'aria-label': 'OAAA instagram'
    },
    {
      'icon': 'i-simple-icons-youtube',
      'to': 'https://www.youtube.com/user/astroananda',
      'target': '_blank',
      'aria-label': 'OAAA Youtube'
    }
    ]
  }
})
