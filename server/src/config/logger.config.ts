import { configure, getLogger } from 'log4js'

configure({
  appenders: {
    console: {
      type: 'stdout',
      layout: { type: 'messagePassThrough' },
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'all',
    },
  },
})

const logger = getLogger()

export default logger
