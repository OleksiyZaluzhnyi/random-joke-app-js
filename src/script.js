const url = "https://official-joke-api.appspot.com/random_joke";
let joke_container = document.querySelector(".joke-container");
let joke_btn = document.getElementById("load-joke-btn");
let status_field = document.getElementById("status_text");


async function fetchJoke(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error while processing HTTP request: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return [data.setup, data.punchline];
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

async function appendJoke() {
    status_field.textContent = "Loading...";
    clearJoke();
    let [setup, punchline] = await fetchJoke(url);
    let jokeField = document.createElement("p");
    jokeField.textContent = `${setup}\n${punchline}`;
    joke_container.appendChild(jokeField);
    status_field.textContent = "";
}

function clearJoke() {
    joke_container.innerHTML = "";
}

joke_btn.addEventListener("click", appendJoke);



