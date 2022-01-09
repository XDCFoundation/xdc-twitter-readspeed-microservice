const mongoose = require("mongoose");

const blockchainResponseModel = new mongoose.Schema({
  tweetId: { type: String, default: "" },
  text: { type: String, default: "" },
  authorID: { type: String, default: "" },
  createdAt: { type: String, default: "" },
  txHash: { type: String, default: "" },
  isSuccess:{type:Boolean, default:false},
  
  
  addedOn: { type: Number, default: Date.now() },
  modifiedOn: { type: Number, default: Date.now() },
});

blockchainResponseModel.method({
    saveData: async function () {
        console.log("saving data in DB")
        return this.save();
    },
});

blockchainResponseModel.static({
    findData: function (findObj, selectionKey = "", skip = 0, limit = 0, sort = 1) {
        return this.find(findObj, selectionKey).skip(skip).limit(limit).sort(sort);
    },
    findOneData: function (findObj) {
        return this.findOne(findObj);
    },
    findOneAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });
    },
    insertManyDocument:function(obj){

        console.log("object in model",obj)
        return this.insertMany(obj)
    }
});

module.exports = mongoose.model("xf-blockchain-response", blockchainResponseModel);
