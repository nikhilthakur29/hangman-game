const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-btn');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['nitin','programming','javascript','hangman']

let selectedWord = words[Math.floor(Math.random()*words.length)];



const correctLetters = [];
const wrongLetters = [];


function showNotification() {
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show');
    },2000)
}
function updateWrongLetterEl() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>wrong</p>': ''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;
    //Display Parts
    figureParts.forEach((part,index)=>{
        const error = wrongLetters.length;
        if(index < error) {
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    });
    //Check If Lost
    if(wrongLetters.length === figureParts.length ) {
        finalMessage.innerText = `Unfortunately You Lost 😑`;
        popup.style.display = 'flex';
    }
}
function showWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter=>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>`)
        .join('')}
        `;

        const innerWord = wordEl.innerText.replace(/\n/g,'');
        
        if(innerWord === selectedWord) {
            finalMessage.innerText = `Congratulaions! You Won 😊`;
            popup.style.display = 'flex';
        }
}
playAgainBtn.addEventListener('click',()=>{
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    showWord();
    updateWrongLetterEl();

    popup.style.display = 'none';

})
window.addEventListener('keydown',e=>{
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = String.fromCharCode(e.keyCode).toLowerCase();
        
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                showWord();
            }else {
                showNotification();
            }
        }else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)

                updateWrongLetterEl();
            }else {
                showNotification();
            }
        }
    }
});

showWord();