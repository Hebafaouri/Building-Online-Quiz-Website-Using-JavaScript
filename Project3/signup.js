const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
// validation start
var nameError = document.getElementById('name-error');
var emailError = document.getElementById('email-error');
var passwordError = document.getElementById('password-error');
var password2Error = document.getElementById('password2-error');


function validateName(){ 
  var name = document.getElementById('contact-name').value;
  if (name.length==0){
      nameError.innerHTML = 'Name is required'
      return false;
  }
  if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
      nameError.innerHTML = 'Write full name'
      return false;
  }
  nameError.innerHTML = '<i class="fa-solid fa-check"></i>';
  return true;
}
function validateEmail(){
  var email = document.getElementById('contact-email').value;

  if(!email.match (/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
      emailError.innerHTML = 'Emai Invalid'
      return false;
  }
  emailError.innerHTML= '<i class="fa-solid fa-check"></i>';
  return true;  
}
function validatePassword(){
  var password = document.getElementById('contact-password').value;
  if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
      passwordError.innerHTML = 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte'
      return false;
  }
  passwordError.innerHTML= '<i class="fa-solid fa-check"></i>';
  return true; 
}
function validatePassword2 (){
  var password = document.getElementById('contact-password').value;
  var password2 = document.getElementById('contact2-password').value;
  if(password!==password2){
      password2Error.innerHTML= 'Not Match'
      return false;
  }
  password2Error.innerHTML= '<i class="fa-solid fa-check"></i>';
  return true; 
}
//Validation end
//submit function
function validatesub() {
  if (validatePassword2 () & validatePassword() &  validateEmail() & validateName() ){
    saveData()
    document.getElementById("successAlert").classList.remove('alert-failed')
document.getElementById("successAlert").innerHTML = ' Registration successful'
  }
  else {
    document.getElementById("successAlert").classList.add('alert-failed')
    document.getElementById("successAlert").innerHTML = ' Register Account Failed'
  }
}
//save data on local storage
var myObject 
var user = [ ]
var id=Math.floor(Math.random() * 1000)
function saveData() {
    event.preventDefault();
    var name = document.getElementById('contact-name').value;
    var email = document.getElementById('contact-email').value;
    var password = document.getElementById('contact-password').value;
     myObject = {"userData": [id,name,email,password] };
    user.push( myObject.userData);
    localStorage.setItem("userData", JSON.stringify(user));
    console.log(localStorage.getItem('userData'));
}
//Check-login user
function checkUser() {
  event.preventDefault();
  var userinput = document.getElementById("userlogin").value
  var passwordinput = document.getElementById("userpassword").value
  var storedData = localStorage.getItem("userData");

// Check if there is any data stored under "userData"
if (storedData) {
// Parse the JSON string into an array
const data = JSON.parse(storedData);
// Store the retrieved data in a new array
var newArray = data;
// Do something with the new array
console.log(newArray);
} else {
console.log("No data found in local storage.");
}
// Loop through the array and print each element
var errorLogin = document.getElementById('errorLogin')
for (var i = 0; i < newArray.length; i++) {
  for (var j = 0; j < newArray[i].length; j++) {
  }
  if ((newArray[i][1]===userinput && newArray[i][3] ===passwordinput)) {
    errorLogin.classList.remove('alert-failed')
      errorLogin.innerHTML="correct password and email";
      sessionStorage.setItem("userData",newArray[i][1]);
      window.location.href = "home.html";
      break;
    }
    else{
      errorLogin.innerHTML="not correct password and email";
      errorLogin.classList.add('alert-failed')
    }
}
}


