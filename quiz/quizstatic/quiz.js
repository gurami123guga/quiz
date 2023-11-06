const main_quiz=()=>{
    let url;
	const logo=document.querySelector(".logo");
    const allcategory=document.querySelectorAll(".s1");
	const showcategory=document.querySelector(".category_p");
	const navbar=document.querySelector(".nav-bar");
	const check=document.querySelector(".check");
	const start=document.querySelector(".start");
	const chooser=document.querySelector(".chooser");
	const qqnumber=document.querySelector(".qnumber");
	const body1 = document.querySelector("body");
	const  gohome= document.querySelector(".menue");
	let width=window.outerWidth;
	let coranswers=0;
	let incorrect;
	let testchecked=false;
	let category;
	let qnumber;
	navbar.style.width=width+"px";
logo.addEventListener("click",e=>{
	window.history.go();
})
//...........................choose category.....................................................................
allcategory.forEach(item=>{
		item.addEventListener("click",e=>{
		      category=item.textContent
			  showcategory.textContent=item.textContent;
			  switch(category){
	case "General knowledge":
	category=9;
	break;
	//Books..........
	case "Books":
	category=10;
	break;
	//Films............
	case "Films":
	category=11;
	break;
	//music........
	case "Music":
	category=12;
	break;
	//Video Games.......
	case "Video Games":
	category=15;
	break;
	//Board Games....
	case "Board Games":
	category=16;
	break;
	//Science Nature......
	case "Science Nature":
	category=17;
	break;
	//Science Computers......
	case "Science Computers":
	category=18;
	break;
	//Science Math......
	case "Science Math":
	category=19;
	//Mythology........
	case "Mythology":
	category=20;
	break;
	//Sports..........
	case "Sports":
	category=21;
	break;
	//Geography......
	case "Geography":
	category=22;
	break;
	//History.....
	case "History":
	category=23;
	break;
	//Politics....
	case "Politics":
	category=24;
	break;
	//Art.......
	case "Art":
	category=25;
	break;
	//Vechiles.....
	case "Vechiles":
	category=28;
	break;
	//any category
	case "Any Category":
	category=0;
	default:
	category=0;
	break;
}
		})
	})
//............................................................................................................................
//............................................................................................
//..................get questions from API and display.......................................
function getall(qnumber,qcategory){
	const body = document.createElement("div");
	body1.appendChild(body);
    body.setAttribute("class","body");
	body.style.display="flex";
	qcategory=category
	qcategory!==0?url="https://opentdb.com/api.php?amount="+qnumber+"&category="+qcategory+"&type=multiple":url="https://opentdb.com/api.php?amount="+qnumber;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data && data.results && Array.isArray(data.results)) {
                data.results.forEach(item => {
					let rand=Math.floor(Math.random()*3);
					//console.log(rand);
                    let question = document.createElement("div");
					let answers_list =document.createElement("div");
	                answers_list.setAttribute("class","answers_list");
					question.setAttribute("class","question");
                    question.textContent = item.question;
					
                    body.appendChild(question);
					question.appendChild(answers_list);
					function getevents(e){
                          if(testchecked!=true){
					    answers_list.childNodes.forEach(answers=>{
		                answers.style.backgroundColor="#76de0d";
          		               })
                    e.target.style.backgroundColor = "green";	
						  }						
                       }
					for(var i=0;i<item.incorrect_answers.length;i++){
						if(i===rand){
							let correctanswers=document.createElement("div");
							//let clicked=false;
							correctanswers.setAttribute("class","answers");
							correctanswers.setAttribute("id","correct");
							correctanswers.textContent=item.correct_answer;
							answers_list.appendChild(correctanswers);
							correctanswers.addEventListener("click",getevents);
						}
						let answers=document.createElement("div");
						answers.setAttribute("class","answers");
						answers.textContent=item.incorrect_answers[i];
						answers_list.appendChild(answers);
						answers.addEventListener("click", getevents);

						
					}
					
                });
				
            } else {
                console.error("Invalid data format:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });	
}
//..................................................................
//..................start quiz...........................................
function start_(){
	
start.addEventListener("click",e=>{
	document.querySelector(".totalq").textContent="";
	document.querySelector(".canswers").textContent=""
	document.querySelector(".wronganswers").textContent="";
	testchecked=false;
	document.querySelector(".result").style.display="none";
	qnumber=qqnumber.value
	if(qnumber.length==0){
	
	qqnumber.style.backgroundColor="lightblue";
	qqnumber.setAttribute("placeholder","PLEASE CHOOSE NUMBER");
	qqnumber.focus();
	}
	
	check.style.display="block";
	chooser.style.display="none";
	getall(qnumber);	
		
	})	
	
	
}
//.................................check.........................
function check_(){


check.addEventListener("click", (e) => {
    testchecked = true;

    let answersLists = document.querySelectorAll(".answers_list");
    let totalQuestions = answersLists.length;
    let correctAnswers = 0;

    answersLists.forEach((answersList) => {
        answersList.childNodes.forEach((childNode) => {
            if (childNode.style.backgroundColor === "green") {
                if (childNode.id === "correct") {
                    let correct = document.createElement("p");
                    correct.setAttribute("class", "wrong");
                    correct.textContent = "correct";
                    answersList.appendChild(correct);
                    answersList.style.backgroundColor = "green";
                    correctAnswers++;
                } else {
                    answersList.style.backgroundColor = "red";
                    let wrong = document.createElement("p");
                    wrong.setAttribute("class", "wrong");
                    wrong.textContent = "wrong";
                    answersList.appendChild(wrong);

                    answersList.querySelectorAll("[id='correct']").forEach((correctAnswer) => {
                        correctAnswer.style.backgroundColor = "lightblue";
                    });
                }
            }
        });
    });
    //let body=document.querySelector(".body");
    let totalqElement = document.querySelector(".totalq");
    let canswersElement = document.querySelector(".canswers");
    let wronganswersElement = document.querySelector(".wronganswers");

    totalqElement.textContent = totalQuestions;
    canswersElement.textContent = correctAnswers;
    wronganswersElement.textContent = totalQuestions - correctAnswers;

    gohome.style.display = "block";
    check.style.display = "none";


});
  gohome.addEventListener("click", (e) => {
         body1.removeChild(document.querySelector(".body"));
		document.querySelector(".result").style.display = "flex";
        chooser.style.display = "block";
        gohome.style.display = "none";
        showcategory.textContent = "category";
    });
}

start_();
check_();

}




export default main_quiz;
