/**
 * Created by AyushK on 18/09/20.
 */
 import * as ValidationManger from "../middleware/validation";
 import TestModule from "../app/modules/testModule";
 import {stringConstants} from "../app/common/constants";
 import ReadSpeed from "../app/modules/readSped";
 import TweetArchive from "../app/modules/tweetArchive";
 
 module.exports = (app) => {
     app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));
     app.get("/read-speed", new ReadSpeed().getSpeedData);
     app.post("/tweet-archive", new TweetArchive().tweetFetch);
     app.get("/read-tweet", new ReadSpeed().readTweet);
     /**
      * route definition
      */
     app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
 };
 