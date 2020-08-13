var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var keys = require('./credential-keys.json');
var s3 = new AWS.S3({
	'apiVersion': '2006-03-01',
	'accessKeyId': keys.accessKeyId,
	'secretAccessKey': keys.secretAccessKey
});

function createObject(params) {
	return new Promise(function (resolve, reject) {
		s3.upload(params, function (err, data) {
			if (err) reject(err);
			else resolve(data);
		})
	});
}

async function createDeploymentPackage (params) {
	try { 
		var res = await createObject(params);
		console.log(res);
	} catch (err) { 
		console.log(err); 
	}
}

var lc_params = {
	Bucket : 'iot-assignment-2', 
	Key : 'bmi2.zip',
	Body: fs.createReadStream('bmi.zip')
}

createDeploymentPackage(lc_params);
