module.exports = function(Note) {
  Note.remoteMethod('testjson', {
    description: "testjson",
    accepts: [
      {
        arg: 'jsonObj',
        type: 'Object',
        required: true
      }
    ],
    returns: {
      arg: 'jsonObj',
      type: 'Object'
    }
  });
  Note.testjson = function(jsonObj, cb){
    console.log("testjson jsonObj = ", jsonObj);
    cb(null, jsonObj);
  };
};
