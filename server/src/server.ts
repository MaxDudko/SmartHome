import express from 'express';
import bodyParser from 'body-parser';
import passport from "passport";
import strategy from "./config/passport";
import router from './router';
import DB from './models';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
        this.passport();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: '1mb' }));
    }

    private dbConnect() {
        DB.sequelize.sync()
            .then(() => {
                console.log('DB: Connection has been established successfully.');
            })
            .catch(err => {
                console.error('DB: Unable to connect to the database:', err);
            });
    }

    private passport() {
        passport.use(strategy);

    }

    private routerConfig() {
        this.app.use(router);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;