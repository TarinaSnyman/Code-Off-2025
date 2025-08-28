const button = document.getElementById('trickyButton');
const explosion = document.getElementById('explosion');
const body = document.body;
const title = document.getElementById('title');
const message = document.getElementById('message');
const bigMessage = document.getElementById('bigMessage');

let clickCount = 0;

// Show temporary messages
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

const titleRect = title.getBoundingClientRect();
button.style.left = `${window.innerWidth/2 - button.offsetWidth/2}px`;
button.style.top = `${titleRect.bottom + 50}px`;

button.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 1) {
        // First click → angry mode
        showMessage("I told you not to click me!");
        button.classList.add('angry');
        body.classList.add('angry');
        title.textContent = "Oh no! Now the button is angry";
        move(button);
    } else if (clickCount === 2) {
        // Second click → explosion
        explosion.style.display = 'block';
        showMessage("💥Oww! That Hurt💥");
        setTimeout(() => { explosion.style.display = 'none'; }, 1000);
    } else if (clickCount === 3) {
        // Third click → RIP message and button disappears
        button.style.display = 'none';
        bigMessage.style.display = 'block';
        title.textContent = "RIP Button";
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
    }
});
