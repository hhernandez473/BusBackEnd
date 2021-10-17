const { response } = require('express');
const { Schedule } = require('../models');


const getSchedules = async (req, res = response) => {

    const query = { status: true };

    const [schedules] = await Promise.all([
        Schedule.find(query).populate('user', 'name')
    ]);

    res.json({
        schedules
    })

}

const getSchedule = async (req, res = response) => {

    const { id } = req.params;
    const schedule = await Schedule.findById(id)
        .populate('user', 'name')


    res.json(schedule);

}


const schedulePost = async (req, res = response) => {

    const { status, user, ...body } = req.body;

    const scheduleDB = await Schedule.findOne({ name: body.name });


    if (scheduleDB) {
        return res.status(400).json({
            msg: `El horario  ${scheduleDB.name}, ya existe`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const schedule = new Schedule(data);

    // save DB
    await schedule.save();

    res.status(201).json(schedule);
}

module.exports = {
    getSchedules,
    getSchedule,
    schedulePost,
}


