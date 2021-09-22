const { response } = require('express');
const { Route } = require('../models');


const getRoute =  async(req, res = response ) => {

    const query = { status: true };

    const [ route ] = await Promise.all([
        Route.find(query).populate('town', 'name').populate('user', 'name')
    ]);
    
    res.json({
        route
    })

}

const routePost = async(req, res = response) => {

    const { status, user, ...body } = req.body;

    const routeBD = await Route.findOne({ name: body.name });

    
    if ( routeBD ) {
        return res.status(400).json({
            msg: `La ruta  ${ routeBD.name }, ya existe`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const route = new Route( data );

    // save DB
    await route.save();

    res.status(201).json(route);
}

module.exports = {
    routePost, 
    getRoute
}