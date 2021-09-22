const { response } = require('express');
const { Municipality } = require('../models');


const getMunicipality =  async(req, res = response ) => {

    const query = { status: true };

    const [ municipality ] = await Promise.all([
        Municipality.find(query).populate('departament', 'name').populate('user', 'name')
    ]);
    
    res.json({
        municipality
    })

}

const municipalityPost = async(req, res = response) => {

    const { status, user, ...body } = req.body;

    const municipalityBD = await Municipality.findOne({ name: body.name });

    
    if ( municipalityBD ) {
        return res.status(400).json({
            msg: `El municipio  ${ municipalityBD.name }, ya existe`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const municipality = new Municipality( data );

    // save DB
    await municipality.save();

    res.status(201).json(municipality);
}

module.exports = {
    municipalityPost, 
    getMunicipality
}