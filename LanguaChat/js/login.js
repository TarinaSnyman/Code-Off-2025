//hardcoded spies for simulation
[
  { "username": "John123", "password": "password123" },
  { "username": "Mike21", "password": "qwerty456" },
  { "username": "Jane42", "password": "secret789" },
  { "username": "Bob555", "password": "pass321" },
  { "username": "Sam1", "password": "hello987" }
]

document.getElementById("loginForm").addEventListener("submit", e=>{

    e.preventDefault();
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;

    //check login credentials
    const spy=speechSynthesis.find(u=>u.username===username &&u.password===password)

    if (spy){
        localStorage.setItem("loggedInUser",spy.username);
        window.location.href="home.html";
    }
    else{
        alert("Error: Incorrect username or password. Please try again.")
    }
});