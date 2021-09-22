const { response } = require('express');
const { Departament } = require('../models')

const getDepartaments =  async(req, res = response ) => {

    const query = { status: true };

    const [ departaments ] = await Promise.all([
        Departament.find(query).populate('country', 'name').populate('user', 'name')
    ]);
    
    res.json({
        departaments
    })

}

const departamentPost = async(req, res = response) => {

    const { status, user, ...body } = req.body;

    const departamentBD = await Departament.findOne({ name: body.name });

    
    if ( departamentBD ) {
        return res.status(400).json({
            msg: `El departamento  ${ departamentBD.name }, ya existe`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const departament = new Departament( data );

    // save DB
    await departament.save();

    res.status(201).json(departament);
}

module.exports = {
    departamentPost, 
    getDepartaments
}