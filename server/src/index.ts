import 'dotenv/config'
import Server from './server';

const starter = new Server().start(parseInt(process.env.PORT || '4000'))
    .then(port => console.log(`Server running on port ${port}`))
    .catch(error => {
        console.log(error)
    });

export default starter;