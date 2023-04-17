let singnup = document.getElementById("singnup");
let logout = document.getElementById("logout");
singnup.addEventListener("click",function()
{
  window.location.href="signup.html";
}
)
logout.addEventListener("click",function()
{
  sessionStorage.clear();
  window.location.href="home.html";
}
)
//wekcome user message
var userData = sessionStorage.getItem("userData"); 
if (userData)
{  var userName = sessionStorage.getItem("userData") 
  var userTitle = document.getElementById('wel_mess')  
  userTitle.innerHTML=userName }

  let Quiz1 = document.getElementById("quiz1");
  let Quiz2 = document.getElementById("quiz2");
  let Quiz3 = document.getElementById("quiz3");
 Quiz1.addEventListener("click", function()
 {
  if (sessionStorage.getItem("userData")===null)
    {
       window.location.href="signup.html";
    }
   else
     {
       window.location.href="quiz3.html";
    } 
 }
 )
 Quiz2.addEventListener("click", function()
 {
  if (sessionStorage.getItem("userData")===null)
    {
       window.location.href="signup.html";
    }
   else
     {
       window.location.href="quez1.html";
    } 
 }
 )
 Quiz3.addEventListener("click", function()
 {
  if (sessionStorage.getItem("userData")===null)
    {
       window.location.href="signup.html";
    }
   else
     {
       window.location.href="quiz2.html";
    } 
 }
 )

