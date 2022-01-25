import Utils from "../../utils";
import BLManager from "./tweetArchive"
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
global.amqp_connection = undefined
 global.db_connection = undefined
export default class TweetArchive {
  
  async tweetFetch(request, response) {
    const [error, getRes] = await Utils.parseResponse(
      new BLManager().tweetArchive(request.body)
    );
    if (!getRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getRes,
      apiSuccessMessage.FETCH_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }


  
  
}
