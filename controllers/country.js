const { response } = require('express');
const { Country } = require('../models')

const getCountries =  async(req, res = response ) => {

    const query = { status: true };

    const [ countries ] = await Promise.all([
        Country.find(query).populate('user', 'name')
    ]);
    
    res.json({
        countries
    })

}

const countryPost = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    const countryBD = await Country.findOne({ name });

    if ( countryBD ) {
        return res.status(400).json({
            msg: `El país  ${ countryBD.name }, ya existe`
        });
    }

    const data = {
        name,
        user: req.user._id
    }

    const country = new Country( data );

    // save DB
    await country.save();

    res.status(201).json(country);
}

module.exports = {
    countryPost, 
    getCountries
}