//Define all varible 
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".quit");
const Exit_quiz = document.querySelector(".Exit_quiz");
const continue_btn = info_box.querySelector(".buttons .Continue_btn");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const showanswer_box = document.querySelector(".showanswer");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
if (sessionStorage.getItem("userData")===null)
{
   window.location.href="signup.html";
}
// showanswer_box.classList.add("activeactiveanswer"); //show answer box
info_box.classList.add("activeInfo"); //show info box
exit_btn.onclick = ()=>{
    window.location.href="home.html"; //back to home page
}
Exit_quiz.onclick = ()=>{
    window.location.href="home.html"; //back to home page
}
// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(60); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
    startTimer(timeValue); //calling startTimer function
    clearInterval(counter); //clear counter
}
let timeValue =  10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
// getting questions and options from array
function showQuetions(index){
    const question_text = document.querySelector(".question_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    question_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    const option = option_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
const showanswer_quiz = result_box.querySelector(".buttons .showersult");
const quit_quiz = result_box.querySelector(".buttons .quit");
// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
sessionStorage.clear();
window.location.href="home.html"; //back to home page
}
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
//Next button function
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
        // sessionStorage.setItem("quizpage",);
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
    if(que_count == questions.length -1)
    {
        next_btn.innerHTML="Finish";
    }
   
}
// creating the new array To save user answers
let answeruser = [] 
//if user clicked on option
function optionSelected(answer){
    answer.style.backgroundColor="#4c96e4";
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    var correcAns = questions[que_count].answer; //getting correct answer from array
const allOptions = option_list.children.length; //getting all option items
// save user's answer & check if it is true or false
if(userAns == correcAns){ 
    userScore += 1;
    let useransc = "<span style= 'color : green' >your answer is Correct </span> ✅"
    answeruser.push(useransc)
}else{
    let useransc = "<span style= 'color : red'>Your answer </span> " + userAns +" <span style='color:red'>is wrong</span> "+ "❌" ;
    answeruser.push(useransc)
}
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}
function showResult(){  
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box

    let scoreText = result_box.querySelector(".score_text");
    let scoreTextt = result_box.querySelector(".score_textt");

    if (userScore >= 3){ // if user scored more than 3

        result_box.style.backgroundColor="green"
        result_box.style.Color="white"
        let scoreTag = '<span>Congrats! 🎉, Your Mark <p>'+ userScore +'</p> / <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
        let scoree = '<span><p>You have '+ userScore +' correct answers</p> </span>';
        scoreTextt.innerHTML = scoree;  
    }
    else if(userScore >=0 && userScore <3){ // if user scored more than 1
        result_box.style.backgroundColor="red"
        result_box.style.Color="white"
        let scoreTag = '<span>unfortunately , Your Mark <p>'+ userScore +'</p>/<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
        let scoree = '<span><p>You have '+(questions.length-userScore) +' wrong answers</p> </span>';
        scoreTextt.innerHTML = scoree; 
    }

}
showanswer_quiz.onclick = ()=>{
    showanser(); //reload the current window
}
function showanser(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.remove("activeResult"); //hide result box
    showanswer_box.classList.add("activeactiveanswer"); //show answer box    
    const answerText = showanswer_box.querySelector(".answer_text");
    const buttonss = showanswer_box.querySelector(".buttonss");
        var r2 =[]
        for (x=0; x<questions.length ; x++)
        {
            var ques=questions[x].numb+ '-' + questions[x].question + "<br>" ;
            var ans= questions[x].answer + "<br>" + "<br>" ;

            var r = [ques,answeruser[x],ans]
            r2.push(r)
        }
        var table = document.createElement("table");
        table.style.border = "1px solid black";
        table.style.width = "95%";
        table.style.margin = "auto"; 
        // create header row with fixed headers
        var headerRow = document.createElement("tr");
        headerRow.style.border = "1px solid black";
        var header1 = document.createElement("th");
        header1.innerHTML = "Question";
        header1.style.fontSize="28px";
        header1.style.border = "1px solid black";
        header1.style.textAlign = "center";
        
        var header2 = document.createElement("th");
        header2.innerHTML = "Answer";
        header2.style.fontSize="28px";
        header2.style.border = "1px solid black";
        header2.style.textAlign = "center";
        
        var header3 = document.createElement("th");
        header3.innerHTML = "Correct Answer";
        header3.style.fontSize="28px";
        header3.style.border = "1px solid black";
        header3.style.textAlign = "center";

        headerRow.appendChild(header1);
        headerRow.appendChild(header2);
        headerRow.appendChild(header3);
        table.appendChild(headerRow);      
   // create a row for each question-answer pair
for (var i = 0; i < r2.length; i++) {
    var row = document.createElement("tr");
    row.style.border = "1px solid black";
    var cell1 = document.createElement("td");
    cell1.innerHTML = r2[i][0]; // question
    cell1.style.border = "1px solid black";
    cell1.style.textAlign = "center"; // set text alignment to center
    cell1.style.padding = "10px"; // add padding
    cell1.style.fontSize = "20px";
  
    var cell2 = document.createElement("td");
    if (r2[i][1]) {
      cell2.innerHTML = r2[i][1]; // user's answer
    } else {
      cell2.innerHTML = "no answer";
    }
    cell2.style.border = "1px solid black";
    cell2.style.textAlign = "center"; // set text alignment to center
    cell2.style.padding = "10px"; // add padding
    cell2.style.fontSize = "20px";
  
    // check if the answer is correct
    if (r2[i][1] && r2[i][1].includes("Your answer is Correct 😎 =")) {
      cell2.style.color = "green"; // set text color to green
    } else {
      cell2.style.color = "red"; // set text color to red
    }
  
    var cell3 = document.createElement("td");
    cell3.innerHTML = r2[i][2]; // correct answer
    cell3.style.border = "1px solid black";
    cell3.style.textAlign = "center"; // set text alignment to center
    cell3.style.padding = "10px"; // add padding
    cell3.style.fontSize = "20px";
  
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    table.appendChild(row);
  }
  

answerText.appendChild(table);

const Exit = document.createElement("button");
Exit.innerHTML = "Exit";
buttonss.appendChild(Exit);
Exit.style.backgroundColor = "white";
Exit.style.color = "black";
Exit.style.fontSize = "25px";
Exit.style.margin = "15px auto";
Exit.style.border = "solid";
Exit.style.cursor = "pointer";
Exit.style.background = "pointer";
// exit from quiz & back to home page 
Exit.onclick = ()=>{
    sessionStorage.clear();
    window.location.href="home.html"; //back to home page
}
}
// Quiz timer
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            showResult();
        }
    }
}
function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}