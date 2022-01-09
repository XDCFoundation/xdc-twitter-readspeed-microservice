import Utils from '../../utils'
import Config from '../../../config'
//const maxTps = require('../../models/tpsCountModel')
const Web3 = require('web3')
const BlockchainResponse = require('../../models/blockchainResponse')
const ReadSpeedDataModel = require('../../models/readSpeedDataModel')
const MyContract = require('./TweetStorage.json')


class BLManager {
    async getSpeedData() {
        Utils.lhtLog('BLManager:getSpeedData', 'Returns each 30m average writespeed for last 24h ', '', '')
        let tweets = []
        try {
            tweets = await BlockchainResponse.findData({}, {}, 0, Number(Config.NETWORK_REQUEST_SAMPLE_SIZE), {
                addedOn: -1,
            })
            console.log(tweets,"tweets====")
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
                return myContract.methods.getTweetFromTweetId(String(tweet.tweetId)).call()
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
        console.log(response,"response=======")
        return response
    }
}

module.exports = BLManager
