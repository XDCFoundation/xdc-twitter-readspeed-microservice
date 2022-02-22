
const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
    
        createdAt: { type: String, default:"" },
        authorId: { type: Number, default: "" },
        id: { type: Number, default: "" },
        text: { type: String, default: "" },
        hashtag: { type: String, default: "" },
        country: { type: String, default: "" },
        username: { type: String, default: ""},
        name: { type:String, default:"" },
        
   
   
    isDeleted: { type: Boolean, default: false },
    addedOn: { type: Number, default: Date.now() },
    modifiedOn: { type: Number, default: Date.now() }
});

templateSchema.method({
    saveData: async function () {
        return this.save();
    },
});
templateSchema.static({
    findData: function (findObj,selectionKey,skip=0,limit=0,sort='1') {
        return this.find(findObj,selectionKey).skip(skip).limit(limit).sort(sort);
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
    findDataWithAggregate: function (findObj) {
        console.log("object in findDataWithAggregate",findObj)
        return this.aggregate(findObj);
    },
    insertManyDocument:function(obj){

        console.log("object in model",obj)
        return this.insertMany(obj)
    }
});

module.exports = mongoose.model("xf-tweets", templateSchema);
