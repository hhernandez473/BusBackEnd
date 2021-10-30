const { response } = require('express');
const { Bus } = require('../models');

const getBuses =  async(req, res = response ) => {

    const query = { status: true };

    const [ buses ] = await Promise.all([
        Bus.find(query).populate('driverAssigned', 'name').populate('user', 'name')
    ]);
    
    res.json({
        buses
    })

}

const busPost = async(req, res = response) => {

    const { status, user, ...body } = req.body;
    const data = {
        ...body,
        licensePlates: body.licensePlates.toUpperCase(),
        user: req.user._id
    }

    const bus = new Bus( data );

    // save DB
    await bus.save();

    res.status(201).json(bus);
}

const busPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, ...rest } = req.body;
   
    const bus = await Bus.findByIdAndUpdate( id, rest );

    res.json({
        bus
    });
}

const busDel = async (req, res = response) => {
    const { id } = req.params;
    const bus = await Bus.findByIdAndUpdate(id, { status: false });
    res.json({
        bus
    });    
}


module.exports = {
    busDel,
    busPost,
    busPut,
    getBuses
}