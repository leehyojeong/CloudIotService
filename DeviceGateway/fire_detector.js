var awsIot = require('aws-iot-device-sdk');

var fireDetector = awsIot.device({
  keyPath: "./../credentials/detector/...",
  certPath: "./../credentials/detector/...",
  caPath: "./../credentials/detector/...",
  clientId: "fireDetector1",
  host: "..."
});

fireDetector.on('connect', function () {
  console.log('Fire Detector가 연결되었습니다.');

  var fireflag = ['화재가 감지되었습니다.','화재가 감지되지 않습니다.'];

  //3초마다 화재가 감지되었는지를 확인하고 상태를 fire/alarm에 publish
  setInterval(function () {
    var idx = Math.ceil(Math.random()*2)-1;//화재 발생 여부를 임의로 나타낼 index
    var loc = 'detector1'//화재가 발생한 위치(detector 기준)를 나타내는 변수

    var message = { 'notify': 'fire/sprinkler', 'fire': fireflag[idx] ,'loc':loc};
    console.log('fire/alarm에 publish합니다.\n' + JSON.stringify(message));
    fireDetector.publish('fire/alarm', JSON.stringify(message));
  }, 3000);

  //management 시스템에서 화재가 발생하면 fire/alert/* 전체에 메시지를 publish
  //fire_detector.js에서는 fire/alert/의 detector1에 대해서 subscribe
  fireDetector.subscribe('fire/alert/detector1',function(){
    console.log('fire/alert/detector1 subscribe합니다.');
  });

  //메시지가 전달되면 화재 위치(detector1)와 함께 주의(alert) 메시지를 콘솔에 출력
  fireDetector.on('message', function (topic, message) {
    if(topic=='fire/alert/detector1'){
      var alert_noti = JSON.parse(message.toString());
      console.log('***'+alert_noti.loc+alert_noti.alert);
    }
  });
});

