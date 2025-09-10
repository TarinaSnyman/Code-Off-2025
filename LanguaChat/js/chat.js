//import encryption and decryption
import { generateKey, encryptMessage, decryptMessage } from "./cryption";

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
    const chatWindow=document.getElementById("chatWindow");
    //create message element
    const msg=document.createElement("div");
    msg.classList.add("message");
    msg.classList.add(sender);
    msg.textContent=decoy;

    const { ciphertext, counter } = await encryptMessage(real);
    msg.dataset.ciphertext = Array.from(ciphertext).join(","); // store as string
    msg.dataset.counter = Array.from(counter).join(",");

    //single click show the actual translation
    msg.addEventListener("click", ()=>{
        msg.textContent=trans;
    })

    //double click 
    msg.addEventListener("dblclick",async (e)=>{
        if(e.shiftKey){//shift to show real message
            const ciphertextArr = new Uint8Array(msg.dataset.ciphertext.split(",").map(Number));
            const counterArr = new Uint8Array(msg.dataset.counter.split(",").map(Number));
            const decrypted = await decryptMessage(ciphertextArr, counterArr);
            msg.textContent = decrypted; //show decrypted message
        }
        else{
            msg.textContent=encrypted;//shows encrypted message
        }
    })
    chatWindow.appendChild(msg);

    //automatically swiths to the decoy after 5 seconds
    setTimeout(()=>{
        msg.textContent=decoy;
    },5000);
}

//initialise the cat
async function initChat(){
    await generateKey();

    const urlParams=new URLSearchParams(window.location.search);
    const currentPartner=urlParams.get("chat");
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
        const trans= decoy+ " (translation)"
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