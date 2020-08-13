## MQTT Message Broker 생성하기
### EC2 인스턴스 생성
- 사용할 운영체제로 Ubuntu Server 16.04 LTS를 선택하고, 유형은 t2.micro로 선택하였다. 
![image](https://user-images.githubusercontent.com/39904216/90111129-25a43d00-dd89-11ea-89df-e18fbc06ebcc.png)

- 태그(키, 값) 추가는 선택적인데 이후 여러 개의 프로젝트를 만들었을 때 쉬운 검색을 하기 위해 작성한다. 
- 이번 프로젝트의 키는 "Message Broker", 값은 "virtual server for Message Broker"로 설정하였다.
![image](https://user-images.githubusercontent.com/39904216/90111149-2d63e180-dd89-11ea-92cf-040703bd3969.png)

- 키 페어는 이전에 사용하던 동일한 ppk 파일을 사용하였다. 
- 인스턴스 생성은 AWS EC2 서비스에서 목록 형태로 확인 가능하다. 
- 인스턴스를 사용할 때는 활성화를 해놓고, 사용하지 않을 때에는 중지해놓는 것이 좋다.
![image](https://user-images.githubusercontent.com/39904216/90111158-32c12c00-dd89-11ea-83cc-c550385cec27.png)

### EC2 인스턴스 탄력적 IP 할당
- 탄력적(Elastic) IP를 할당하지 않으면 인스턴스를 끄고 켤 때마다 IP가 바뀌기 때문에 안정성과 편리함을 위해 할당받도록 한다.
- IP를 할당받은 후에는 PuTTY를 사용하여 EC2를 로컬 컴퓨터처럼 사용할 수 있다. 

### PuTTY 기본 설정
- PuTTY Configuration에서 해당 인스턴스별 환경 설정을 저장해놓을 수도 있다.
- apt 패키지 매니저를 사용하여 업데이트 후 nodejs와 npm 설치를 한다.

```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

### 인스턴스에 MQTT Message Broker 생성
- 인스턴스에 Mosquitto MQTT Broker를 설치한다.
```
sudo apt install mosquitto
```
- 인바운드 규칙 편집으로 EC2 인스턴스의 보안그룹을 재설정한다.
![image](https://user-images.githubusercontent.com/39904216/90111209-3fde1b00-dd89-11ea-965d-dac9f94f9afb.png)
![image](https://user-images.githubusercontent.com/39904216/90111219-479dbf80-dd89-11ea-8dcb-56b1cec11b0a.png)
