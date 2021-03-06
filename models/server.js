const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth: '/api/auth',
            bus: '/api/bus',
            country: '/api/country',
            departament: '/api/departament',
            municipality: '/api/municipality',
            town: '/api/town',
            route: '/api/route',
            schedule: '/api/schedule',
            user: '/api/usuarios',
            stopBus: '/api/stopBus'
        }
        //Conect to DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }
    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.bus, require('../routes/bus'));
        this.app.use( this.paths.country, require('../routes/country'));
        this.app.use( this.paths.departament, require('../routes/departament'));
        this.app.use( this.paths.municipality, require('../routes/municipality'));
        this.app.use( this.paths.route, require('../routes/routeM'));
        this.app.use( this.paths.town, require('../routes/town'));
        this.app.use( this.paths.schedule, require('../routes/schedule'));
        this.app.use( this.paths.user, require('../routes/usuarios'));
        this.app.use( this.paths.stopBus, require('../routes/stopBus'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
