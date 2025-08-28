const button = document.getElementById('trickyButton');
const explosion = document.getElementById('explosion');
const body = document.body;
const title = document.getElementById('title');
const message = document.getElementById('message');
const bigMessage = document.getElementById('bigMessage');

let clickCount = 0;

// show temporary messages
function showMessage(text) {
    message.textContent = text;
    message.style.display = 'block';
    setTimeout(() => { message.style.display = 'none'; }, 1500);
}

function move(button){
    const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        button.style.left = randomX + "px";
        button.style.top = randomY + "px";
}
//spawn fake buttons
const buttonContainer = document.getElementById("button-container");
function spawnFakeButton(count){
    for (let i=0;i<count;i++){
        const fakeBtn=document.createElement("button");
        fakeBtn.innerText= "Button";
        fakeBtn.classList.add("fake-button");

        //random pos
        fakeBtn.style.position="absolute";
        fakeBtn.style.top = Math.random() * 100 + "%";
        fakeBtn.style.left = Math.random() * 100 + "%";

        fakeBtn.style.pointerEvents = "none";
        buttonContainer.appendChild(fakeBtn);

        setInterval(() => {
        move(fakeBtn);
    }, 800);
    }
}

function rageQuit(){
    document.body.innerHTML=
    `<div style="background:white; color:black; font-family:Arial, sans-serif; padding:40px; text-align:left;">
                <h1>404 Button Not Found</h1>
                <p>How could you! You killed an innocent button</p>
                
            </div>`;
}

const titleRect = title.getBoundingClientRect();
button.style.left = `${window.innerWidth/2 - button.offsetWidth/2}px`;
button.style.top = `${titleRect.bottom + 50}px`;

button.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 1) {
        showMessage("Ouch!");
        button.classList.add('angry');
        body.classList.add('angry');
        title.textContent = "Oh no! Now the button is angry";
        move(button);
        move(fakeBtn)
    } else if (clickCount === 2) {
        explosion.style.display = 'block';
        showMessage("💥Oww! That Hurt💥");
        setTimeout(() => { explosion.style.display = 'none'; }, 1000);
    } else if (clickCount === 3) {
        rageQuit();
    }
});

// Button dodge on hover if angry and not dead
button.addEventListener('mouseover', () => {
    if (clickCount >= 1 && clickCount < 3) {
        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        button.style.left = randomX + "px";
        button.style.top = randomY + "px";
        spawnFakeButton(2);
    }
});
