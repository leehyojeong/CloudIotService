var mqtt = require('mqtt');
var fs = require('fs');
var client = mqtt.connect('mqtt://15.165.69.138');

client.on('connect',()=>{
	client.subscribe('Hyojung',()=>{
		console.log('\"Hyojung\"(을)를 subscribe 합니다.');});
});

client.on('message',(topic, message)=>{
	//console.log(topic, message.toString());
	data_buffer = JSON.parse(message.toString());
	
	console.log('\n수신한 파일 정보:');
	console.log(topic, data_buffer);

	fs.writeFileSync(data_buffer.filename+'.txt',data_buffer.data);
	
	console.log('\n파일 수신  완료\n');
	client.end();
});
