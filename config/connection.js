const Config = require("./index");
const {AMQPManager} = require("../libraries/utility");
// const {DBConnectionUtils} = require("lh-utilities");
// const {UtilMethods} = require("lh-utilities");
import Utils from '../app/utils'
module.exports = {
    
    async connectToRabbitMQ() {
        Utils.lhtLog('connectToRabbitMQ', 'trying to connect with MQ', Config.AMQP_HOST_URL, 'SunnyK');
        let [connectionError, response] = await Utils.parseResponse(AMQPManager.connectRabbitMQ(Config.AMQP_HOST_URL));
        if (connectionError) {
            Utils.lhtLog('connectToRabbitMQ', 'unable to connect to MQ', connectionError, 'SunnyK');
            throw connectionError
        }
        amqp_connection =response
        return response
    }
}