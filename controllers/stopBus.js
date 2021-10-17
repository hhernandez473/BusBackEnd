const { response } = require('express');
const { StopBus } = require('../models');


const getStopBus =  async(req, res = response ) => {

    const query = { status: true };

    const [ stopBus ] = await Promise.all([
        StopBus.find(query).populate('route', 'name').populate('user', 'name')
    ]);
    
    res.json({
        stopBus
    })

}

const stopBusPost = async(req, res = response) => {

    const { status, user,  ...body } = req.body;

    // const stopBD = await StopBus.findOne({ route:  req.route });

    
    // if ( stopBD ) {
    //     return res.status(400).json({
    //         msg: `Ruta  ${ stopBD.name }, ya tiene asignada parada de usuario`
    //     });
    // }

    const data = {
        ...body,
        user: req.user._id
    }

    const stopBus = new StopBus( data );

    // save DB
    await stopBus.save();

    res.status(201).json(stopBus);
}

module.exports = {
    getStopBus, 
    stopBusPost
}