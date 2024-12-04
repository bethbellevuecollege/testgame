let currentScenario = 0;
let correctAnswers = 0;
let totalScenarios = 7;
let hitPoints = 5;

const scenarios = [
    {
        question: "You are standing in a dark forest. The path ahead is blocked by a large boulder. You need to identify a private IP address to bypass the rock.",
        choices: ["192.168.1.1", "8.8.8.8", "172.16.5.5", "10.0.0.1"],
        correctAnswer: "192.168.1.1",
        feedback: "Correct! The boulder moves away as you identify a private address. You proceed forward.",
        bgImage: "#forest-bg",
        soundCorrect: "correct-answer.mp3",
        soundIncorrect: "wrong-answer.mp3"
    },
    // Additional scenarios here...
];

let backgroundMusic = new Audio('background-music.mp3');
backgroundMusic.loop = true; // Keep playing the music in the background
backgroundMusic.volume = 0.1; // Set background music volume
backgroundMusic.play();

function displayScenario() {
    const scenario = scenarios[currentScenario];
    const storyText = document.getElementById("story-text");
    storyText.innerHTML = `<p>${scenario.question}</p>`;
    document.getElementById("game-container").className = scenario.bgImage; // Set background image

    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = ""; 

    scenario.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = function() {
            checkAnswer(choice, scenario);
        };
        choicesContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, scenario) {
    const storyText = document.getElementById("story-text");
    const feedback = document.getElementById("feedback");

    if (selectedAnswer === scenario.correctAnswer) {
        correctAnswers++;
        feedback.innerHTML = `<p>Correct! ${scenario.feedback}</p>`;
        playSound(scenario.soundCorrect);
    } else {
        hitPoints--; 
        feedback.innerHTML = `<p>Incorrect. You lost 1 hit point. You now have ${hitPoints} hit points left.</p>`;
        playSound(scenario.soundIncorrect);

        if (hitPoints === 0) {
            storyText.innerHTML = "<p>Oh no! You were defeated! Respawn to try again.</p>";
            showRespawnButton();
            return;
        }
        return;
    }

    currentScenario++;
    if (currentScenario < totalScenarios) {
        setTimeout(displayScenario, 1000);
    } else {
        promptForName();
    }
}

function playSound(fileName) {
    const sound = new Audio(fileName);
    sound.play();
}

function showRespawnButton() {
    const choicesContainer = document.getElementById("choices-container");

    const respawnButton = document.createElement("button");
    respawnButton.textContent = "Respawn";
    respawnButton.onclick = function() {
        resetGame();
    };

    choicesContainer.appendChild(respawnButton);
}

function resetGame() {
    hitPoints = 5; 
    currentScenario = 0; 
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = ""; 
    setTimeout(displayScenario, 1000); 
}

function promptForName() {
    const storyText = document.getElementById("story-text");
    storyText.innerHTML = "<p>Congratulations, adventurer! You've completed the journey!</p>";
    
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter your full name...";
    document.getElementById("choices-container").appendChild(nameInput);

    nameInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const playerName = nameInput.value;
            alert(`Congratulations, ${playerName}! You defeated the end boss!`);
        }
    });
}

displayScenario();
