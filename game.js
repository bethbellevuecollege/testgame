// Store game state
let currentScenario = 0;
let playerName = '';

// Define scenarios as an array of objects
const scenarios = [
    {
        story: "Trouble Ticket 1: A user reports that they can't access the company's internal website. They can ping the router but cannot reach any internal servers. What could be the issue?",
        choices: [
            { text: "Check if the DNS settings are correct.", correct: false },
            { text: "Verify the IP address and subnet mask are correct.", correct: true },
            { text: "Ensure the user has an active VPN connection.", correct: false }
        ]
    },
    {
        story: "Trouble Ticket 2: A user reports that their device is connected to the network, but they cannot access the internet. You check and see the device has a 169.254.x.x address. What is most likely the cause?",
        choices: [
            { text: "The device cannot reach the DHCP server.", correct: true },
            { text: "The device is configured with a static IP address.", correct: false },
            { text: "The internet connection is down.", correct: false }
        ]
    },
    // More scenarios can be added here
];

// Function to start the game
function startGame() {
    document.getElementById('story-text').textContent = scenarios[currentScenario].story;
    displayChoices(scenarios[currentScenario].choices);
}

// Function to display choices
function displayChoices(choices) {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = ''; // Clear previous choices

    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.classList.add('choice');
        button.onclick = () => makeChoice(index, choice.correct);
        choicesContainer.appendChild(button);
    });
}

// Handle player's choice
function makeChoice(choiceIndex, isCorrect) {
    if (isCorrect) {
        alert("Correct! You solved the issue.");
        currentScenario++;  // Move to the next scenario
        if (currentScenario < scenarios.length) {
            startGame();
        } else {
            askForName();
        }
    } else {
        alert("Incorrect. Here's a hint: Please review the scenario details again.");
        startGame(); // Retry the same scenario
    }
}

// Request player's name at the end of the game
function askForName() {
    playerName = prompt("Please enter your full name:");
    alert(`${playerName} has completed this activity.`);
}

// Start the game when the page loads
window.onload = startGame;
