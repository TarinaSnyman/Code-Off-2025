function logOut(){
    localStorage.removeItem("loggedInUser");
    window.location.href="login.html";
}

//load chat partners from json
fetch("../chatSimulation.json")
    .then(res=>{
        if(!res.ok) throw new Error("Could not load JSON");
        return res.json();
    })
    .then(chatConfig=>{
        const chatlist=document.getElementById("chatList");
        for (const partner in chatConfig){
            const li=document.createElement("li");
            const a=document.createElement("a");

            a.href=`chat.html?chat=${partner}`;
            a.textContent=`Chat with ${partner}`;
            li.appendChild(a);
            chatlist.appendChild(li);
        }
    })
    .catch(err=>console.error(err));
