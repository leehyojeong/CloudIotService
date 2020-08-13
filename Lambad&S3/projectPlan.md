## Lambda & S3
### 함수 코드 파일 S3 업로드
- BMI를 계산해주는 간단한 js 코드를 작성하고 이 파일을 S3 버켓에 업로드 한다. 
- 핸들러의 이름과 파일 이름이 동일해야 하므로 만약 코드 파일의 이름이 bmi.js인 경우 핸들러의 이름을 bmi.handler로 변경해야 한다.
- 파일은 js 형태로 올리는 것이 아니라 zip 파일 형태로 S3 버켓에 업로드 한다.
- 예제 파일(bmi.js) : https://github.com/leehyojeong/CloudIotService/blob/master/Lambad%26S3/bmi.js

### 버킷에 객체 생성하기
- 버킷에 객체를 생성하는 함수로 createS3Objects.js를 사용하였다.
- 예제 파일(createS3Objects.js) : https://github.com/leehyojeong/CloudIotService/blob/master/Lambad%26S3/createS3Object.js
- 코드마다 credentials를 입력하는 방법도 있지만, 보안과 편리성을 위해 별도의 credential-keys.json이라는 파일에 accessKeyId와 secretAccessKey를 저장해 놓았다.
- credentials는 authentication과 authorization을 확인하는데 사용되는 중요한 키 값과 같다. 
- createS3Objects.js를 실행하면 위 항목에서 설명한 직접 S3에 코드를 업로드 하는 것과 동일하게 S3 오브젝트가 버킷에 생성된다.

### Lambda 형태의 코드로 변환하기
- 위에서 만들었던 예제 파일 bmi.js를 Lambda 함수로 변환하기 위해 deployLambda.js를 구현했다.
- 예제 파일(deployLambda.js) : https://github.com/leehyojeong/CloudIotService/blob/master/Lambad%26S3/deployLambda.js
- deployLambda.js 코드는 S3에 압축파일(zip) 형태로 올라간 오브젝트를 함수로 만들어주는 역할을 수행한다.
- credentials는 위와 같은 방법으로 json 파일을 이용했다.
- PuTTY에서 deployLambda.js를 실행하면 콘솔에서 zip파일 형태의 함수가 람다 함수로 등록되었다는 결과를 확인할 수 있다.

### Lambda 함수 실행시키기 
- 위에서 Lambda로 변환한 함수를 PuTTY에서 작성한 코드 invokeLambda.js를 사용하여 실행할 수 있다.
- 예제 파일(invokeLambda.js) : https://github.com/leehyojeong/CloudIotService/blob/master/Lambad%26S3/invokeLambda.js
- credentials는 위와 같은 방법으로 json 파일을 이용했다.
- invokeLambda.js를 실행하면 bmi Lambda 함수로 넘겨준 인자에 따른 결과값이 출력된다.
