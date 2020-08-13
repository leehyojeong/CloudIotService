## Device Gateway
### 목표
- 간단한 화재 알람 관리 시스템을 사용하여 Device Gateway 알아보기 

### 프로그램 설명
- 화재 감지기(Fire Detector)와 화재 스프링클러(Fire Sprinkler)라는 가상의 IoT 장치를 구현한다.
- 이 둘을 관리할 EC2 기반의 화재 관리 애플리케이션(Fire Management System)을 구현한다.
- 여기서는 총 3개의 Device Gateway Topics를 사용한다.
  - fire/alarm
    - 매초마다 화재 감지기는 이 토픽에 메세지를 publish한다. 
    - 화재가 발생하지 않은 경우와 발생한 경우에 서로 다른 내용으로 메세지를 작성한다.
    - 화재 관리 시스템은 이 토픽을 subscribe한다.
  - fire/sprinkler
    - 화재 관리 시스템은 만약 화재 알람을 받으면 이 토픽에 스프링클러 활성화 명령을 publish한다.
    - 스프링클러는 이 토픽을 subscribe한다.
  - fire/alert
    - 화재 관리 시스템은 이 토픽에 화재 알람 메세지를 publish한다.
    - 모든 시스템은 이 토픽을 subscribe한다.
