const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            searchPath: '/api/search',
            authPath: '/api/auth',
            usersPath: '/api/users',
            categoriesPath: '/api/categories',
            productsPath: '/api/products',
            uploadsPath: '/api/uploads'
        }

        // Conectar a ddbb
        this.connectDb();
        // middelwares
        this.midedelwares();
        // rutas de la app

        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }

    midedelwares() {
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());
        
        this.app.use( express.static('public'))

        // carga de archivos
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: './tmp/'
        }) );
    }

    routes() {
        this.app.use(this.paths.authPath, require('../routes/auth')); //ruta de autenticacion
        this.app.use(this.paths.usersPath, require('../routes/users')); //ruta de usuarios   
        this.app.use(this.paths.categoriesPath, require('../routes/categories')); //ruta de categorias
        this.app.use(this.paths.productsPath, require('../routes/products')); //ruta de productos
        this.app.use(this.paths.searchPath, require('../routes/search')); //ruta de busqueda
        this.app.use(this.paths.uploadsPath, require('../routes/uploads')); //ruta de subida de archivos

    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

}

module.exports = Server;