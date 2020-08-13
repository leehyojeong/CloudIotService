exports.handler = async (event) => {
	console.log("*** BMI 계산***");
	const bmi = (event.weight / ((event.height/100)*(event.height/100)));

	if(bmi<=18.5){
		event.result = "BMI는 "+bmi+"로 저체중입니다.";
	}else if(bmi>18.5&&bmi<=23){
		event.result = "BMI는 "+bmi+"로 정상입니다.";
	}else if(bmi>23&&bmi<=25){
		event.result = "BMI는 "+bmi+"로 과체중입니다.";
	}else{
		event.result = "BMI는 "+bmi+"로 비만입니다.";
	}

	const response = {
		statusCode:200,
		body:JSON.stringify(event)
	};
	return response;
};
