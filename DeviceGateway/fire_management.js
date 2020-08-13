var awsIot = require('aws-iot-device-sdk');

var fireManagementSys = awsIot.device({
    keyPath: "./../credentials/management/...",
    certPath: "./../credentials/management/...",
    caPath: "./../credentials/management/...",
    clientId: "fireManagementSys",
    host: "..."
});

fireManagementSys.on('connect', function () {
    console.log('Fire Management System이 연결되었습니다.');
    
    //detector에서 화재 발생을 알리는 토픽 fire/alarm을 subscribe
    fireManagementSys.subscribe('fire/alarm', function () {
        console.log('fire/alarm을 subscribe합니다.');
    });

    fireManagementSys.on('message', function (topic, message) {
		console.log('Request:', message.toString());
        if (topic != 'fire/alarm')
            return;
        var req = JSON.parse(message.toString());
        
        //받은 메시지가 화재가 갇지되었다는 내용인 경우,
        if (req.fire == '화재가 감지되었습니다.') {
            //sprinkler를 작동시키기 위해 
            //fire/sprinkler(req.notify)에 publsih
            fireManagementSys.publish(req.notify, 
                JSON.stringify({ 'fire':req.fire, 'command': 'on' }));

            //화재가 발생했다는 사실을 발생 위치와 함께 
            //fire/alert/ 전체에 publish
            fireManagementSys.publish('fire/alert/'+req.loc,
                JSON.stringify({ 
                    'alert':'에서 화재가 발생했습니다.***',
                    'loc':req.loc}));
		} else {
            //화재가 감지되지 않은 경우 off command를 publish
            fireManagementSys.publish(req.notify, 
                JSON.stringify({ 'fire':req.fire, 'command': 'off' }));
        }
    })
});


