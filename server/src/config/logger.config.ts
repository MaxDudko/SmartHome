import { configure, getLogger } from 'log4js'

configure({
  appenders: {
    console: {
      type: 'console',
      layout: { type: 'pattern', pattern: '%[%p: %m%n %]' },
      level: 'all',
    },
    file: {
      type: 'file',
      filename: 'server_logs.log',
      compress: false,
    },
  },
  categories: {
    default: {
      appenders: ['console', 'file'],
      level: 'all',
    },
  },
})

const logger = getLogger()

export default logger
