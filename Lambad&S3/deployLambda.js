var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var keys = require('./credential-keys.json');
var s3 = new AWS.S3({
        'apiVersion': '2006-03-01',
        'accessKeyId': keys.accessKeyId,
        'secretAccessKey': keys.secretAccessKey
});
var lambda = new AWS.Lambda({
    "apiVersion": '2015-03-31',
});

var params = {
    Code: {
        S3Bucket : 'iot-assignment-2',
        S3Key : 'bmi.zip'
    },
    FunctionName : 'bmi',
    Handler : 'index.handler',
    Role : 'arn:aws:iam::192733733540:role/service-role/test-role-kw7xaze0',
    Runtime : 'nodejs12.x',
    Description : ''
};

lambda.createFunction (params, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
});
