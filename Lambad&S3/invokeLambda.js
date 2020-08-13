var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var keys = require('./credential-keys.json');
var s3 = new AWS.S3({
        'apiVersion': '2006-03-01',
        'accessKeyId': keys.accessKeyId,
        'secretAccessKey': keys.secretAccessKey
});

var lambda = new AWS.Lambda ( { 
    "apiVersion" : '2015-03-31',
} );

const exp = {"height":"180", "weight":"70"};
var params = {
    FunctionName : "bmi",
    InvocationType : "RequestResponse", 
    Payload : JSON.stringify(exp)
};
lambda.invoke(params, function (err, data) {
    if(err) console.log(err);
    else {
		console.log("invoke 완료");
		console.log(JSON.parse(data.Payload));
	}
});

