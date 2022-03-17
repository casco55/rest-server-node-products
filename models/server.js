const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        // middelwares
        this.midedelwares();
        // rutas de la app

        this.routes();
    }

    midedelwares() {
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());
        
        this.app.use( express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users')); //ruta de usuarios   
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

}

module.exports = Server;