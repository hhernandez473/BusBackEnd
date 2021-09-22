const { response } = require('express');
const { Town } = require('../models');


const getTown =  async(req, res = response ) => {

    const query = { status: true };

    const [ town ] = await Promise.all([
        Town.find(query).populate('municipality', 'name').populate('user', 'name')
    ]);
    
    res.json({
        town
    })

}

const townPost = async(req, res = response) => {

    const { status, user, ...body } = req.body;

    const townBD = await Town.findOne({ name: body.name });

    
    if ( townBD ) {
        return res.status(400).json({
            msg: `La aldea o zona  ${ townBD.name }, ya existe`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const town = new Town( data );

    // save DB
    await town.save();

    res.status(201).json(town);
}

module.exports = {
    townPost, 
    getTown
}