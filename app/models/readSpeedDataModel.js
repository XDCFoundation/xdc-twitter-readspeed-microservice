const mongoose = require('mongoose')

const readSpeedDataModel = new mongoose.Schema({
    responseTime: { type: Number, default: 0 },
    requestCount: { type: Number, default: 0 },
    startTime: { type: Number, default: Date.now() },
    endTime: { type: Number, default: Date.now() },
    addedOn: { type: Number, default: Date.now() },
    modifiedOn: { type: Number, default: Date.now() },
})

readSpeedDataModel.method({
    saveData: async function () {
        return this.save()
    },
})

readSpeedDataModel.static({
    findData: function (findObj, selectionKey = '', skip = 0, limit = 0, sort = 1) {
        return this.find(findObj, selectionKey).skip(skip).limit(limit).sort(sort)
    },
    findOneData: function (findObj) {
        return this.findOne(findObj)
    },
    findOneAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        })
    },
})

module.exports = mongoose.model('xf-read-speed', readSpeedDataModel)
