## 파일 복사 애플리케이션 구현하기
### 2개의 EC2 인스턴스 생성
- 전송하는 인스턴스 1개와 수신할 인스턴스 1개를 만든다.
- Task1에서 생성했던 인스턴스와 동일한 설정으로 만들었다.
  - 운영체제 : Ubuntu 16.04 LTS
  - 유형 : t2.micro
  - 보안 그룹 공유 : 사용자 지정 TCP, 1883 포트
  - 동일한 ppk 파일 사용
  - 각각 탄력적 IP 할당
  - nodejs, npm, mosquitto 등 설치도 동일하게 진행
- Task1 링크 : <https://github.com/leehyojeong/CloudIotService/blob/master/EC2%26MQ/Task1.md>

### file sender 역할을 할 인스턴스 생성
- 태그로 키는 "File Sender", 값은 "EC2 instance for a file sender"를 추가하였다.
- moquitto-clients 패키지 설치 : 
```
sudo apt install mosquitto-clients
```

### file receiver 역할을 할 인스턴스 생성
- 태그로 키는 "File Receiver", 값은 "EC2 instance for a file receiver"를 추가하였다.
- moquitto-clients 패키지 설치
```
sudo apt install mosquitto-clients
```

### Nodejs 버전 확인
- 코드에는 문제가 없는데 실행 오류가 난다면 아마 Nodejs 버전 문제일 수 있다. 
- 기존에 설치되어 있는 Nodsjs 버전이 4.2.6으로 실행이 되지 않아 nvm 설치 후 12.16.2로 버전 업그레이드를 했더니 제대로 실행되었다.
- 관련 패키지 설치 : ```sudo apt-get install build-essential libssl-dev```
- nvm 설치 : ```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash```
- bashrc 업데이트로 적용 : ```source ~/.bashrc```
- Nodejs v12.16.2 설치 : ```nvm install 12.16.2```
- 버전 확인 : ```node -v```

### 전체 흐름 설명
- File Receiver(receive.js)를 먼저 실행시켜 파일을 받을 준비를 한다. 
- File Sender(send.js)를 실행시켜 파일 이름과 실제 보낼 데이터를 JSON 형태로 만들어 Message Broker에 올린다.
- File Receiver(receive.js)는 Message Broker로부터 JSON 형태의 메시지를 받는다.
- JSON.parse 함수를 사용하여 JSON 형태의 메세지로부터 파일 이름(filename)과 파일 데이터(data)를 가져온다.
- File Receiver에서 데이터(data)를 파일 이름(filename)으로 저장한다.
