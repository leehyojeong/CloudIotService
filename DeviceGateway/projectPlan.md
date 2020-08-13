## Device Gateway
### 목표
- 간단한 화재 알람 관리 시스템을 사용하여 Device Gateway 알아보기 

### 프로그램 설명
- 화재 감지기(Fire Detector)와 화재 스프링클러(Fire Sprinkler)라는 가상의 IoT 장치를 구현한다.

![image](https://user-images.githubusercontent.com/39904216/90129224-38c40680-dda3-11ea-9c5b-f156d2a1ba01.png)

- 이 둘을 관리할 EC2 기반의 화재 관리 애플리케이션(Fire Management System)을 구현한다.

![image](https://user-images.githubusercontent.com/39904216/90129669-06ff6f80-dda4-11ea-9278-52dc61dd00cc.png)

- 여기서는 총 3개의 Device Gateway Topics를 사용한다.
  - fire/alarm
    - 특정 시간마다 화재 감지기는 이 토픽에 메세지를 publish한다. 
    - 화재가 발생하지 않은 경우와 발생한 경우에 서로 다른 내용으로 메세지를 작성한다.
    - 화재 관리 시스템은 이 토픽을 subscribe한다.
  - fire/sprinkler
    - 화재 관리 시스템은 만약 화재 알람을 받으면 이 토픽에 스프링클러 활성화 명령을 publish한다.
    - 스프링클러는 이 토픽을 subscribe한다.
  - fire/alert
    - 화재 관리 시스템은 이 토픽에 화재 알람 메세지를 publish한다.
    - 모든 시스템은 이 토픽을 subscribe한다.

### 프로그램 세부 설명
- 화재 감지기(Fire Detector)
  - AWS IoT Core에서 FireDetector라는 이름의 단일 사물을 생성한다. 
  - 사물 1개를 생성하면 public key, private key, 인증서 총 3개가 생성된다.
  - 생성된 인증서를 다운로드 받은 후 활성화한다.
- 화재 스프링클러(Fire Sprinkler)
  - AWS IoT Core에서 FireSprinkler라는 이름의 단일 사물을 생성한다. 
  - 사물 1개를 생성하면 public key, private key, 인증서 총 3개가 생성된다.
  - 생성된 인증서를 다운로드 받은 후 활성화한다.
- 화재 감지기와 화재 스프링클러 사물(코드)은 로컬 컴퓨터에서 실행시키고, 화재 관리 시스템은 EC2 인스턴스에서 실행한다.
- 위에서 생성했던 인증서들은 credentials라는 동일한 파일안에 넣어 관리했다. 
- 각 인증서들의 위치는 코드 상에서 경로만 정확히 써주면 된다.
- 단, 화재 관리 시스템은 EC2에서 실행되기 때문에 인증서 또한 같은 EC2 인스턴스에 존재해야 한다.

### 토픽 설명
- fire/alarm
  - 3초(3000ms)마다 fire_detector.js에서 fire/alarm 토픽에 화재 발생 여부를 publish한다.
  - fire_detector.js에서 임의로 0(화재가 일어나지 않음), 1(화재 발생)로 화재 발생 여부를 넣은 배열에 접근하여 메세지를 생성한다.
  
  ![image](https://user-images.githubusercontent.com/39904216/90129908-783f2280-dda4-11ea-915b-22509f1c519f.png)
  - fire_management_system은 fire/alarm 토픽을 subscribe한다.
  
  ![image](https://user-images.githubusercontent.com/39904216/90129963-91e06a00-dda4-11ea-9d3b-6a63dc0a9346.png)
- fire/sprinkler
  - fire/alarm에서 확인한 메세지의 "fire" 값이 "화재가 감지되었습니다."인 경우 fire_management_system은 fire/sprinkler 토픽에 현재 화재 감지 여부와 command 값을 on으로 보낸다.
  - "화재가 감지되지 않았습니다."인 경우, 화재 감지 여부와 함께 command 값을 off로 보낸다.
  
  ![image](https://user-images.githubusercontent.com/39904216/90130318-3bbff680-dda5-11ea-883a-dc473ce9fa6a.png)
  - fire_sprinkler에서는 fire/sprinkler 토픽을 subscribe한다.
  
  ![image](https://user-images.githubusercontent.com/39904216/90130411-63af5a00-dda5-11ea-966d-5590b625e8dc.png)
  - 토픽에서 화재가 감지되었다는 내용이 있으면 "srinkler를 작동시키겠습니다."라는 문구를 출력한다. 
  - 화재가 감지되지 않으면 공백을 출력한다.
  
  ![image](https://user-images.githubusercontent.com/39904216/90130476-804b9200-dda5-11ea-875f-e9fa8b7fe163.png)
- fire/alert
  - fire_management_system은 fire/alert 토픽에 fire alert message를 publish한다.
  - 정책에서 fire/alert/* 를 사용하여 fire/alert/detector1, fire/alert/detector2 ... 와 같이 여러 개의 사물로 publish할 수 있다.
  
  ![image](https://user-images.githubusercontent.com/39904216/90130588-aec96d00-dda5-11ea-950e-5e9bcb5c1ec7.png)
