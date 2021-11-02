const { response } = require('express');
const { Schedule } = require('../models');


const getSchedules = async (req, res = response) => {

    const query = { status: true };

    const [schedules] = await Promise.all([
        Schedule.find(query).populate('user', 'name').populate('route', 'name').populate('detail.driverAssigned', 'name')
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

const getScheduleXRoute = async (req, res= response) => {
    const { id } = req.params;
    const query = { route: id };
    const [schedules] = await Schedule.find(query);
    res.json(schedules);
}

const getScheduleXDriver = async (req, res= response) => {
    const { id } = req.params;
    const query = { user: id };
    const [schedules] = await Schedule.find(query);
    res.json(schedules);
}


const schedulePost = async (req, res = response) => {

    const { status, user, ...body } = req.body;

    const data = {
        ...body,
        user: req.user._id
    }

    const schedule = new Schedule(data);

    // save DB
    await schedule.save();

    res.status(201).json(schedule);
}

const schedulePut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, ...rest } = req.body;
    

    const scheduleRes = await Schedule.updateMany( {_id: id}, {$set: rest} );

    res.json({
        scheduleRes
    });
}

const scheduleDel = async (req, res = response) => {
    const { id } = req.params;
    const schedule = await Schedule.findByIdAndUpdate(id, { status: false });
    res.json({
        schedule
    });    
}

module.exports = {
    getSchedule,
    getSchedules,
    getScheduleXDriver,
    getScheduleXRoute,
    scheduleDel,
    schedulePost,
    schedulePut
}


