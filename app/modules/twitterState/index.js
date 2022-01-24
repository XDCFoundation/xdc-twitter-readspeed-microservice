const TemplateSchema=require("../../models/tweetDetails")

// const {
//     TwitterStateModel,
//     templateSchema,
//   } = require("../../libraries/model");
  class TwitterStateManger {
    async getTwitterState() {
      return await TwitterStateModel.findOneData({
        key: "TWITTER_API_SEARCH_INDEX",
      });
    }
  
    async updateTwitterState(requestData) {
      return await TwitterStateModel.findOneAndUpdateData(
        { key: "TWITTER_API_SEARCH_INDEX" },
        { lastTweetID: requestData }
      );
    }
    async updateTwitterStatename(requestData) {
      return await TwitterStateModel.findOneAndUpdateData(
        { key: "TWITTER_API_SEARCH_INDEX" },
        { name: requestData }
      );
    }
  
    async pushtweetDetails(tweetDetails) {

        let templateSchema = new TemplateSchema();
        //console.log("///////////////////",tweetDetails)
        
       // templateSchema.query = getQueryString(tweetDetails)
        templateSchema.id = tweetDetails.data.id
        templateSchema.authorId = tweetDetails.data.author_id
        templateSchema.text=tweetDetails.data.text
        templateSchema.createdAt=tweetDetails.data.created_at
        templateSchema.name=tweetDetails.data.name
        templateSchema.addedOn = new Date().getTime();
        templateSchema.modifiedOn = new Date().getTime();
        //console.log("templateSchema====",templateSchema)
        return await templateSchema.saveData(templateSchema);
        //console.log("savedata====",SaveData);
        
        }
    
  }
  
  module.exports = TwitterStateManger;