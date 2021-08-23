const Role  = require('../models/role')
const User = require('../models/user')

const isValidateRol = async (rol = '') => {
    const existRol = await Role.findOne({ rol });
    if ( !existRol ){
        throw new Error(`EL rol ${ rol } no esta registrado en la BD`)
    }
}

const emailExist = async ( email = '' ) => {
    const existEmail = await User.findOne({ email });
    if(existEmail){
      throw new Error(`El correo ${ email } ya esta registrado en la BD`)
    }
}

const userIdExist = async ( id ) => {
    const userId = await User.findById(id);
    if(!userId){
      throw new Error(`El id no existe ${ id } `)
    }
}

module.exports = {
    isValidateRol,
    emailExist,
    userIdExist
}