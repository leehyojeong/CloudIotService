## Permission Policies
- 각 사물들을 작동시키기 위해서 policy를 사용하여 권한 부여를 한다. 

  - policy4detector1
    - iot:Connect로 클라이언트 ID fireDetector가 AWS IoT Core에 연결할 수 있는 권한을 부여한다.
    - iot:Publish로 fire/alarm 토픽에 publish한다.
    - iot:Subscribe로 fire/alert/detector1 토픽을 subscribe한다.
    - iot:Receive로 AWS IoT Core로부터 fire/alert/detector1 토픽을 수신할 수 있는 권한을 부여한다.
  - policy4sprinkler1
    - iot:Connect로 클라이언트 ID fireSprinkler1가 AWS IoT Core에 연결할 수 있는 권한을 부여한다.
    - iot:Subscribe로 fire/sprinkler 토픽을 subscribe한다.
    - iot:Receive로 AWS IoT Core로부터 fire/sprinkler 토픽을 수신할 수 있는 권한을 부여한다.
    - iot:Subscribe로 fire/alert/detector1 토픽을 subscribe한다.
    - iot:Receive로 AWS IoT Core로부터 fire/alert/detector1 토픽을 수신할 수 있는 권한을 부여한다.
  - policy4fireManage
    - iot:Connect로 클라이언트 ID fireManagementSys가 AWS IoT Core에 연결할 수 있는 권한을 부여한다.
    - iot:Subscribe로 fire/alarm 토픽을 subscribe한다.
    - iot:Receive로 AWS IoT Core로부터 fire/alarm 토픽을 수신할 수 있는 권한을 부여한다.
    - iot:Publish로 fire/sprinkler 토픽에 publish한다.
    - iot:Publish로 fire/alert/* (fire/alert/detector1, fire/alert/detector2 등)에 해당하는 토픽에 publish한다.
