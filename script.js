"use strict";


let wrapper = document.querySelector('.wrapper');
let typing_text = document.querySelector('.typing-text');

let input_field = document.querySelector('.input-field');
let time = document.querySelector('.timer');

time.innerText = "30";
let isTyping = 0;


let index = 0;
let mistakes = 0;
let timer = 30;
let interval;



// creating every character in to a span 
function load_site() {

    console.log(`we're in`);
    let str = typing_text.innerText;
    // console.log(str);
    typing_text.innerText = "";
    str.split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typing_text.innerHTML += span;
    });

    document.addEventListener("keydown", () => input_field.focus());
    typing_text.addEventListener("click", () => input_field.focus());
    typing_text.querySelectorAll('span')[0].classList.add('active');
}

// function check(ch) {
//     return ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch == ' ' || ch == '.');
// }

function typing() {
    let current_char = typing_text.innerText[index];

    let typed_char = input_field.value.split("")[index];
    // console.log('current : ' + current_char);
    // console.log("typed : " + typed_char);
    console.log('index : ' + index);
    // console.log('typed character : ' + typed_char);
    // console.log(input_field.value);


    if (typed_char != null) {

        if (!isTyping) {
            interval = setInterval(time_set_up, 1000);
            isTyping = true;

        }

        if (typed_char == current_char)
            typing_text.querySelectorAll('span')[index].classList.add('correct');
        else
            typing_text.querySelectorAll('span')[index].classList.add('incorrect');
        typing_text.querySelectorAll('span')[index].classList.remove('active');
        index += 1;

        typing_text.querySelectorAll('span')[index].classList.add('active');
    } else if (typed_char == null) {
        console.log("backspace");
        if (index > 0) {
            typing_text.querySelectorAll('span')[index].classList.remove('active');
            index -= 1;
            typing_text.querySelectorAll('span')[index].classList.add('active');

            if (typing_text.querySelectorAll('span')[index].classList.contains('incorrect'))
                mistakes--;
            typing_text.querySelectorAll('span')[index].classList.remove('incorrect', 'correct');
        }
    }

    // Mi --> 2

}

function time_set_up() {
    if (timer > 0) {
        timer -= 1;
        time.innerText = timer;
    } else {
        clear(interval);
    }

}

load_site();
input_field.addEventListener('input', typing);