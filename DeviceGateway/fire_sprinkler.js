var awsIot = require('aws-iot-device-sdk');

var fireSprinkler = awsIot.device({
  keyPath: "./../credentials/sprinkler/...",
  certPath: "./../credentials/sprinkler/...",
  caPath: "./../credentials/sprinkler/...",
  clientId: "fireSprinkler1",
  host: "..."
});

fireSprinkler.on('connect', function () {
  console.log('Fire Sprinkler가 연결되었습니다.');

  //Fire Management System으로부터 on/off 명령을 받을 토픽 fire/sprinkler를 subscribe
  fireSprinkler.subscribe('fire/sprinkler', function () {
    console.log('fire/sprinkler을 subscribe합니다.');
  });

  //management 시스템에서 화재가 발생하면 fire/alert/* 전체에 메시지를 publish
  //fire_sprinkler.js에서는 fire/alert/의 detector1에 대해서 subscribe
  fireSprinkler.subscribe('fire/alert/detector1',function(){
    console.log('fire/alert/detector1 subscribe합니다.');
  });

  //management 시스템으로부터 sprinkler 작동 명령(command)을 받고 
  //command가 on인 경우에만 sprinkler 작동
  fireSprinkler.on('message', function (topic, message) {
    if (topic == 'fire/sprinkler') {
      var noti = JSON.parse(message.toString());
      if (noti.command == 'on') 
        console.log(noti.fire, ' sprinkler를 작동시키겠습니다.');
      else if (noti.command =='off')
        console.log(noti.fire, ' ');
    }

    //메시지가 전달되면 화재 위치(detector1)와 함께 주의(alert) 메시지를 콘솔에 출력
    if(topic=='fire/alert/detector1'){
      var alert_noti = JSON.parse(message.toString());
      console.log('***'+alert_noti.loc+alert_noti.alert);
    }
  });

});

