import Utils from '../../utils'
import Config from '../../../config'
//const maxTps = require('../../models/tpsCountModel')
const Web3 = require('web3')
const BlockchainResponse = require('../../models/blockchainResponse')
const ReadSpeedDataModel = require('../../models/readSpeedDataModel')
const TweetDetails = require('../../models/tweetDetails')
const MyContract = require('./tweetStorage.json')


class BLManager {
    async readTweet() {
        Utils.lhtLog('BLManager:readTweet', 'Returns read tweets', '', '')
        let selectionKey={
            tweets:1
        }
        let response=[]

        let skip = parseInt(0);


        let limit = parseInt(0);


        let result = await TweetDetails.findData({},{},0,10,{addedOn: -1})
        let tweetCount = await TweetDetails.find().count()
        console.log("tweet Counts ------------",tweetCount)
        //   console.log(result)

        // for(let index=result.length-1; index>=0; index--){

        response.push(
            result,
            {tweetsInDb:tweetCount})

        console.log(response)

        // }

        return response
    }

    async getSpeedData() {
        Utils.lhtLog('BLManager:getSpeedData', 'Returns each 30m average writespeed for last 24h ', '', '')
        let tweets = []
        try {
            tweets = await BlockchainResponse.findData({}, {}, 0, Number(Config.NETWORK_REQUEST_SAMPLE_SIZE), {
                _id: -1,
            })
            //console.log(tweets,"tweets====")
        } catch (err) {
            Utils.lhtLog(
                'BLManager:getSpeedData',
                'Error while getting data from xf-blockchain-responses DB',
                err,
                '',
                'ERROR'
            )
        }

        const web3 = new Web3(Config.URL)
        const myContract = new web3.eth.Contract(MyContract.abi, Config.SMART_CONTRACT_ADDRESS)
        const timeStart = new Date().getTime()
        let values = await Promise.all(
            tweets.map(async (tweet) => {
                /*
                TODO: pass tweet.tweetId in getTweetFromTweetId()
                */
                // console.log('tweetId: ', tweet.tweetId)
                return myContract.methods.getTweetByTweetId(String(tweet.tweetId)).call()
            })
        )
        // console.log('values', values)
        // Utils.lhtLog('BLManager:getSpeedData', 'BlockChain response ', values, '', 'INFO')
        const timeEnd = new Date().getTime()

        let readSpeedData = new ReadSpeedDataModel()
        readSpeedData.responseTime = timeEnd - timeStart
        readSpeedData.requestCount = tweets.length
        readSpeedData.startTime = timeStart
        readSpeedData.endTime = timeEnd
        let response

        try {
            response = await readSpeedData.saveData()
          
        } catch (err) {
            Utils.lhtLog('BLManager:getSpeedData', 'Error saving data to xf-read-speeds DB', err, '', 'ERROR')
        }
        let  response1 = await ReadSpeedDataModel.find().limit(10)
        //console.log(response,"response=======")
        return {response1}
    }
}

module.exports = BLManager
