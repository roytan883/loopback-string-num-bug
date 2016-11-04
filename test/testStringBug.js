/**
 * Created by Roy on 2016/11/4.
 */

var request = require('request')

//like loopback explorer it is:
//curl -X POST --header "Content-Type: application/x-www-form-urlencoded" --header "Accept: application/json" -d "jsonObj=%7B%22string1%22%3A%20%22123%22%2C%22string2%22%3A%20%22s123%22%7D" "http://127.0.0.1:3000/api/Notes/testjson"
testObj = {
  string1: "123",
  string2: "s123"
}
testObjString = JSON.stringify(testObj)
request.post(
  {
    url: 'http://127.0.0.1:3000/api/Notes/testjson',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: "jsonObj=" + encodeURI(testObjString)
  }, function (err, httpResponse, body) {
    console.log("form like loopback explorer, response body = ", body)
    bodyObj = JSON.parse(body)
    console.log("form like loopback explorer, string1 type is: ", typeof bodyObj.jsonObj.string1)
  }
)

testObj2 = {
  jsonObj:{
    string1: "123",
    string2: "s123"
  }
}
testObjString2 = JSON.stringify(testObj2)
request.post(
  {
    url: 'http://127.0.0.1:3000/api/Notes/testjson',
    headers: {
      'Content-Type': 'application/json'
    },
    body:testObjString2
  }, function (err, httpResponse, body) {
    console.log("application/json, response body = ", body)
    bodyObj = JSON.parse(body)
    console.log("application/json, string1 type is: ", typeof bodyObj.jsonObj.string1)
  }
)

//here are some logs:
//application/x-www-form-urlencoded:
/*
 T 2016/11/04 12:36:43.606347 127.0.0.1:56043 -> 127.0.0.1:3000 [AP]
 POST /api/Notes/testjson HTTP/1.1.
 Content-Type: application/x-www-form-urlencoded.
 host: 127.0.0.1:3000.
 content-length: 62.
 Connection: close.
 .
 jsonObj=%7B%22string1%22:%22123%22,%22string2%22:%22s123%22%7D

 T 2016/11/04 12:36:43.607281 127.0.0.1:3000 -> 127.0.0.1:56043 [AP]
 HTTP/1.1 200 OK.
 Vary: Origin, Accept-Encoding.
 Access-Control-Allow-Credentials: true.
 X-XSS-Protection: 1; mode=block.
 X-Frame-Options: DENY.
 X-Download-Options: noopen.
 X-Content-Type-Options: nosniff.
 Content-Type: application/json; charset=utf-8.
 Content-Length: 46.
 ETag: W/"2e-6NyPWvMUH7Is1AyoUFlqVw".
 Date: Fri, 04 Nov 2016 04:36:43 GMT.
 Connection: close.
 .
 {"jsonObj":{"string1":"123","string2":"s123"}}
 */

//application/json:
//at http layer, the input string1 is string type
/*
 T 2016/11/04 12:36:43.606661 127.0.0.1:56044 -> 127.0.0.1:3000 [AP]
 POST /api/Notes/testjson HTTP/1.1.
 Content-Type: application/json.
 host: 127.0.0.1:3000.
 content-length: 46.
 Connection: close.
 .
 {"jsonObj":{"string1":"123","string2":"s123"}}

 T 2016/11/04 12:36:43.609845 127.0.0.1:3000 -> 127.0.0.1:56044 [AP]
 HTTP/1.1 200 OK.
 Vary: Origin, Accept-Encoding.
 Access-Control-Allow-Credentials: true.
 X-XSS-Protection: 1; mode=block.
 X-Frame-Options: DENY.
 X-Download-Options: noopen.
 X-Content-Type-Options: nosniff.
 Content-Type: application/json; charset=utf-8.
 Content-Length: 44.
 ETag: W/"2c-zUy4IgijyG8V7gGPkqkA9w".
 Date: Fri, 04 Nov 2016 04:36:43 GMT.
 Connection: close.
 .
 {"jsonObj":{"string1":123,"string2":"s123"}}

 */
