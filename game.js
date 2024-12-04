let currentScenario = 0;
let correctAnswers = 0;
let totalScenarios = 5;
let hitPoints = 5;

// Start background music when the game loads
const backgroundMusic = document.getElementById("background-music");
backgroundMusic.play(); // Start music immediately when the page loads

const scenarios = [
    {
        question: "You are standing in a dark forest. The path ahead is blocked by a large boulder. You need to identify a private IP address to bypass the rock.",
        choices: ["192.168.1.1", "8.8.8.8", "172.16.5.5", "10.0.0.1"],
        correctAnswer: "192.168.1.1",
        feedback: "Correct! The boulder moves away as you identify a private address. You proceed forward."
    },
    {
        question: "You come across a raging river. To cross, you need to identify the appropriate subnet mask for a network. What is the subnet mask for a network with 256 hosts?",
        choices: ["255.255.255.0", "255.255.254.0", "255.255.252.0", "255.255.255.255"],
        correctAnswer: "255.255.255.0",
        feedback: "Correct! You cross the river safely with the right subnet mask."
    },
    {
        question: "You find yourself at a fork in the road, where you must identify a Class B address to continue. Choose the correct address.",
        choices: ["172.16.5.5", "192.168.0.1", "10.0.1.1", "8.8.8.8"],
        correctAnswer: "172.16.5.5",
        feedback: "Correct! The path opens before you as you recognize a Class B address."
    },
    {
        question: "You arrive at a mysterious door. To open it, you need to identify the network address from the IP address and subnet mask. What is the network address for the IP 192.168.10.45/255.255.255.0?",
        choices: ["192.168.10.0", "192.168.10.1", "192.168.11.0", "192.168.10.255"],
        correctAnswer: "192.168.10.0",
        feedback: "Correct! The door opens, and you may continue on your journey."
    },
    {
        question: "You have reached the end of the path. To defeat the final boss, you need to choose the correct IPv6 address format.",
        choices: ["2001:0db8:85a3:0000:0000:8a2e:0370:7334", "2001:db8:85a3:0:0:8a2e:370:7334", "192.168.1.1", "255.255.255.0"],
        correctAnswer: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        feedback: "Correct! The final boss is defeated and you emerge victorious!"
    }
];

function displayScenario() {
    const scenario = scenarios[currentScenario];
    const storyText = document.getElementById("story-text");
    storyText.innerHTML = `<p>${scenario.question}</p>`;

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
    } else {
        hitPoints--; 
        feedback.innerHTML = `<p>Incorrect. You lost 1 hit point. You now have ${hitPoints} hit points left.</p>`;

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
    nameInput.id = "name-input"; // Added to style the name input field later
    document.getElementById("choices-container").appendChild(nameInput);

    const nameMessage = document.createElement("p");
    nameMessage.id = "end-message"; // Added for the end game message
    nameMessage.textContent = "Please enter your name to receive your final congratulations.";
    document.getElementById("choices-container").appendChild(nameMessage);

    nameInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const playerName = nameInput.value;
            const endMessage = document.getElementById("end-message");
            endMessage.textContent = `Congratulations, ${playerName}! You defeated the end boss!`;
            nameInput.disabled = true; // Disable input after the name is entered
        }
    });
}

displayScenario();
