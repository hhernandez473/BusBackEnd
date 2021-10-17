const { Country, Departament, User, Municipality, Town, Schedule, StopBus } = require('../models');
const Role = require('../models/role')

const isValidateRol = async (rol = '') => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`EL rol ${rol} no esta registrado en la BD`)
  }
}

const emailExist = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`El correo ${email} ya esta registrado en la BD`)
  }
}

const userIdExist = async (id) => {
  const userId = await User.findById(id);
  if (!userId) {
    throw new Error(`El id no existe ${id} `)
  }
}

const countryExist = async (id) => {
  const countryId = await Country.findById(id);
  if (!countryId) {
    throw new Error(`El id no existe ${id} `)
  }
}

const departamentExist = async (id) => {
  const departamentId = await Departament.findById(id);
  if (!departamentId) {
    throw new Error(`El id no existe ${id} `)
  }
}

const municipalityExist = async (id) => {
  const municipalityId = await Municipality.findById(id);
  if (!municipalityId) {
    throw new Error(`El id no existe ${id} `)
  }
}

const townExist = async (id) => {
  const townId = await Town.findById(id);
  if (!townId) {
    throw new Error(`El id no existe ${id} `)
  }
}

const scheduleExist = async (eschedule = '') => {
  const scheduleExist = await Schedule.findOne({ eschedule });
  if (scheduleExist) {
    throw new Error(`El horario ${eschedule} ya esta registrado en la BD`)
  }
}

const routeExist = async (id) => {
  const stopBusID = await StopBus.findById({ route: id });
  if (!stopBusID) {
    throw new Error(`El id no existe ${id} `)
  }
}

const routeExistSchedule = async (id) => {
  const routeId = await Schedule.findOne({route: id});
  if(routeId){
    throw new Error(`La ruta ya tiene asignado un horario`)
  }
}

module.exports = {
  countryExist,
  departamentExist,
  emailExist,
  isValidateRol,
  municipalityExist,
  townExist,
  userIdExist,
  scheduleExist,
  routeExist, 
  routeExistSchedule
}