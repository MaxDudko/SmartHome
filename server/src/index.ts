import 'dotenv/config'
import logger from './config/logger.config'
import Server from './server'

const starter = new Server()
  .start(parseInt(process.env.PORT || '4000'))
  .then((port) => logger.info(`Server running on port ${port}`))
  .catch((error) => {
    logger.error(error)
  })

export default starter
