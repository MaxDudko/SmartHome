import * as dotenv from "dotenv";
import Server from './server';

dotenv.config();

const port = parseInt(process.env.PORT || '4000');

const starter = new Server().start(port)
    .then(port => console.log(`Server running on port ${port}`))
    .catch(error => {
        console.log(error)
    });

export default starter;