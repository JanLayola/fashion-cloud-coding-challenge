import * as express from 'express';
import * as bodyParser from 'body-parser';

import DBConnector from './db-connector';
import Config from './config';

import productRoutes from "./routes/productRoutes";

const app = express();
const cors = require('cors')

const connectDatabases = async () => {
    await DBConnector.connectMongo(Config.MONGO_URL + Config.FASHION_CLOUD_DB);
};

const addBodyParser = () => {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
};

const addRoutes = () => {
    app.use('/product', productRoutes);
};

const allowCorsRequestForLocalhost = () => {
    app.use(cors({
        origin: 'http://localhost:4200'
    }))
}

const listenPort = (PORT) => {
    app.listen( PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    );
};

async function start() {
    await connectDatabases();
    addBodyParser();
    allowCorsRequestForLocalhost()
    addRoutes();
    listenPort(Config.SERVICE_PORT);
};

export default {
    start
}
