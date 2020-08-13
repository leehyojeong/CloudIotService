var mqtt = require('mqtt');
var fs = require('fs');
var client  = mqtt.connect('mqtt://15.165.69.138');

var data = fs.readFileSync('TestMessage.txt','utf8');
var data_info = {
	"filename":"TestMessage",
	"data":data
}

client.on('connect',()=>{
	//client.publish('Hyojung','Hello, Cloud IoT Service!');
	data_buffer = JSON.stringify(data_info);
	client.publish('Hyojung',data_buffer);
	console.log('\"Hyojung\"에 publish합니다.');

	console.log('\n전송한 파일 정보:');
	console.log(data_buffer);

	console.log('\n파일 전송 완료\n');
	client.end();
});
