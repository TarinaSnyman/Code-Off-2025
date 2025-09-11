//import encryption and decryption
//import { generateKey, encryptMessage, decryptMessage } from "./cryption";

let key;
//generate the key
async function generateKey(){
    key = await crypto.subtle.generateKey(
        { name: "AES-CTR", length: 256 },true,["encrypt", "decrypt"]
    );
    return key;
}

//encryption AES
  async function encryptMessage(message) {
    const counter=crypto.getRandomValues(new Uint8Array(16));
    const encoded =new TextEncoder().encode(message);

    const ciphertext=await crypto.subtle.encrypt(
        {name:"AES-CTR",counter,length:64},key,encoded 
    );

    // convert  to Base64 
    const base64Cipher = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
    const base64Counter = btoa(String.fromCharCode(...counter));

    return { ciphertext: base64Cipher, counter: base64Counter };
}
//decrypts messages AES
async function decryptMessage(base64Cipher, base64Counter){
    // convert Base64 back to Uint8Array
    const ciphertextArr = Uint8Array.from(atob(base64Cipher), c => c.charCodeAt(0));
    const counterArr = Uint8Array.from(atob(base64Counter), c => c.charCodeAt(0));

    const decrypted =await crypto.subtle.decrypt(
        {name:"AES-CTR", counter: counterArr, length:64},key,ciphertextArr
    );
    return new TextDecoder().decode(decrypted);
}


//preset decoys for user typed messages
const decoyPresets = {
    korean: ["안녕하세요", "좋은 아침", "잘 지내?", "감사합니다", "잘 자요"],
    japanese: ["こんにちは", "おはよう", "お元気ですか？", "ありがとう", "おやすみ"],
    italian: ["Ciao", "Buongiorno", "Come stai?", "Grazie", "Buona notte"],
    swedish: ["Hej", "God morgon", "Hur mår du?", "Tack", "God natt"],
    thai: ["สวัสดี", "สวัสดีตอนเช้า", "คุณเป็นอย่างไรบ้าง?", "ขอบคุณ", "ราตรีสวัสดิ์"],
    mongolian: ["Сайн уу", "Өглөөний мэнд", "Танд сайн уу?", "Баярлалаа", "Сайн амраарай"]
};
//preset messages from other spy for simulation
let chatConfig
fetch("../chatSimulation.json")
.then(res=>{
    if(!res.ok) throw new Error("Could not load JSON");
    return res.json();
})
.then(data=>{
    chatConfig=data;
    initChat();
})

function getDecoy(language){
    const decoys=decoyPresets[language];
    return decoys[Math.floor(Math.random()*decoys.length)]; //returns a random decoy of a language
}

//ads the new chat message and handles the display of messages
async function addMessageToChat(decoy,trans,real,sender){
    function resetMessage(){
   //automatically swiths to the decoy after 5 seconds
    setTimeout(()=>{
        msg.textContent=decoy;
    },5000); 
}
    const chatWindow=document.getElementById("chatWindow");
    //create message element
    const msg=document.createElement("div");
    msg.classList.add("message");
    msg.classList.add(sender);
    msg.textContent=decoy;

    const { ciphertext, counter } = await encryptMessage(real);
    msg.dataset.ciphertext = ciphertext;
    msg.dataset.counter = counter; 

    //single click show the actual translation
    msg.addEventListener("click", (e)=>{
        if(e.ctrlKey){//ctrl to show real message
            msg.textContent=msg.dataset.ciphertext;//shows encrypted message
            resetMessage();
        }
        else{
         msg.textContent=trans;
            resetMessage();
        }
    })

    //double click 
    msg.addEventListener("dblclick",async (e)=>{
        if(e.ctrlKey){//ctrl to show real message
            const decrypted = await decryptMessage(msg.dataset.ciphertext, msg.dataset.counter);
            msg.textContent = decrypted;// show decrupted message
            resetMessage();
        }
    })
    chatWindow.appendChild(msg);
    //automatically swiths to the decoy after 5 seconds
    resetMessage();
}

//initialise the cat
async function initChat(){
    await generateKey();

    const urlParams=new URLSearchParams(window.location.search);
    const currentPartner=urlParams.get("chat");
    console.log(currentPartner);
    const partnerConfig=chatConfig[currentPartner];
    const language=partnerConfig.language;

    //send initial message from partner for simulation
    addMessageToChat(partnerConfig.messages[0].decoy,partnerConfig.messages[0].translation, partnerConfig.messages[0].real,"them");

    //user input
    const chatForm = document.getElementById("chatForm");
    const input = document.getElementById("messageInput");

    chatForm.addEventListener("submit",async (e)=>{
        e.preventDefault();
        const userText=input.value.trim();

        const decoy=getDecoy(language)
        const trans= decoy+ " Error in your message. Could not translate"
        const real= userText;

        addMessageToChat(decoy,trans,real,"you");
        input.value="";

        setTimeout(()=>{
            const responses=partnerConfig.messages;
            const response=responses[Math.floor(Math.random()*responses.length)];
            addMessageToChat(response.decoy,response.translation, response.real, "them");
        }, 1500);
    });
}