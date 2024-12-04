let currentScenario = 0;
let correctAnswers = 0;
let totalScenarios = 7; // Adjust total scenarios as needed
let hitPoints = 5;

const scenarios = [
    {
        question: "You are standing in a dark forest. The path ahead is blocked by a large boulder. You need to identify a private IP address to bypass the rock.",
        choices: ["192.168.1.1", "8.8.8.8", "172.16.5.5", "10.0.0.1"],
        correctAnswer: "192.168.1.1",
        feedback: "Correct! The boulder moves away as you identify a private address. You proceed forward."
    },
    {
        question: "You reach a river, and a bridge is out. To repair it, you need to identify the correct subnet mask for a Class C network.",
        choices: ["255.255.255.0", "255.255.0.0", "255.255.255.255", "255.255.0.255"],
        correctAnswer: "255.255.255.0",
        feedback: "Correct! You repair the bridge and cross the river safely."
    },
    {
        question: "As you walk down the road, a wild router appears. You must configure a subnet to proceed.",
        choices: ["/24", "/16", "/32", "/64"],
        correctAnswer: "/24",
        feedback: "Correct! The router grants you access to the next area."
    },
    {
        question: "You find yourself in a dark cave. The entrance is guarded by a mysterious creature. You need to use CIDR notation to pass.",
        choices: ["192.168.1.0/24", "192.168.0.0/30", "172.16.0.0/16", "10.0.0.0/8"],
        correctAnswer: "192.168.1.0/24",
        feedback: "Correct! The creature lets you through with the correct CIDR notation."
    },
    {
        question: "You're at a gate leading to the final level of your journey. To unlock it, you need to know the number of usable hosts in a /24 subnet.",
        choices: ["254", "256", "512", "1024"],
        correctAnswer: "254",
        feedback: "Correct! The gate opens, and you are one step closer to your goal."
    },
    {
        question: "As you approach the final boss, you're stopped by an IP address conflict. You need to resolve it by identifying the correct range of private addresses.",
        choices: ["10.0.0.0 - 10.255.255.255", "192.168.0.0 - 192.168.255.255", "172.16.0.0 - 172.31.255.255", "All of the above"],
        correctAnswer: "All of the above",
        feedback: "Correct! The conflict is resolved, and the final boss appears."
    },
    {
        question: "The final boss challenges you with a difficult problem. You must identify the correct loopback address to defeat them.",
        choices: ["127.0.0.1", "169.254.0.1", "192.168.0.1", "10.0.0.1"],
        correctAnswer: "127.0.0.1",
        feedback: "Correct! The boss is defeated and disappears in a puff of smoke."
    }
];

function displayScenario() {
    const scenario = scenarios[currentScenario];
    const storyText = document.getElementById("story-text");
    storyText.innerHTML = `<p>${scenario.question}</p>`;

    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = ""; // Clear previous buttons

    scenario.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = function() {
            checkAnswer(choice);
        };
        choicesContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const scenario = scenarios[currentScenario];
    const storyText = document.getElementById("story-text");
    const feedback = document.getElementById("feedback");

    if (selectedAnswer === scenario.correctAnswer) {
        correctAnswers++;
        feedback.innerHTML = `<p>Correct! ${scenario.feedback}</p>`;
    } else {
        hitPoints--; // Lose 1 hit point
        feedback.innerHTML = `<p>Incorrect. You lost 1 hit point. You now have ${hitPoints} hit points left.</p>`;

        // If hit points reach 0, the player "dies" and has to start over
        if (hitPoints === 0) {
            storyText.innerHTML = "<p>Oh no! You were defeated! Respawn to try again.</p>";
            showRespawnButton(); // Show respawn button when defeated
            return;
        }
        return; // Don't advance to the next question if incorrect
    }

    currentScenario++;
    if (currentScenario < totalScenarios) {
        setTimeout(displayScenario, 1000); // Wait a bit before showing next scenario
    } else {
        promptForName(); // When all scenarios are completed
    }
}

function showRespawnButton() {
    const choicesContainer = document.getElementById("choices-container");

    // Create and show respawn button
    const respawnButton = document.createElement("button");
    respawnButton.textContent = "Respawn";
    respawnButton.onclick = function() {
        resetGame(); // Reset the game when the respawn button is clicked
    };

    choicesContainer.appendChild(respawnButton); // Add the button to the page
}

function resetGame() {
    hitPoints = 5; // Reset hit points
    currentScenario = 0; // Reset game to first scenario
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = ""; // Clear feedback
    setTimeout(displayScenario, 1000); // Restart the game
}

function promptForName() {
    const storyText = document.getElementById("story-text");
    storyText.innerHTML = "<p>Congratulations, adventurer! You've completed the journey!</p>";
    
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter your full name";
    nameInput.id = "player-name";
    
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.onclick = function() {
        const playerName = document.getElementById("player-name").value;
        displayEndMessage(playerName);
    };

    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = "";
    choicesContainer.appendChild(nameInput);
    choicesContainer.appendChild(submitButton);
}

function displayEndMessage(playerName) {
    const storyText = document.getElementById("story-text");
    storyText.innerHTML = `<p>Congratulations, ${playerName}! You defeated the end boss!</p>`;

    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = ""; // Clear choices

    const restartButton = document.createElement("button");
    restartButton.textContent = "Play Again";
    restartButton.onclick = function() {
        location.reload(); // Reload the game to play again
    };
    choicesContainer.appendChild(restartButton);
}

window.onload = function() {
    displayScenario(); // Start the game when the page loads
};
