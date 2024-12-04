// Store game state
let currentScenario = 0;
let playerName = '';

// Define all 10 scenarios
const scenarios = [
    {
        story: "Trouble Ticket 1: A user reports that they can't access the company's internal website. They can ping the router but cannot reach any internal servers. What could be the issue?",
        choices: [
            { text: "Check if the DNS settings are correct.", correct: false, feedback: "DNS settings may be a problem, but it's more likely that routing is the issue." },
            { text: "Verify the IP address and subnet mask are correct.", correct: true, feedback: "Incorrect IP configuration can prevent access to internal servers even if the router is reachable." },
            { text: "Ensure the user has an active VPN connection.", correct: false, feedback: "VPN may not be the cause unless the user was accessing the network remotely." }
        ]
    },
    {
        story: "Trouble Ticket 2: A user reports that their device is connected to the network, but they cannot access the internet. You check and see the device has a 169.254.x.x address. What is most likely the cause?",
        choices: [
            { text: "The device cannot reach the DHCP server.", correct: true, feedback: "The 169.254.x.x address is an APIPA address, indicating the device failed to obtain an IP from the DHCP server." },
            { text: "The device is configured with a static IP address.", correct: false, feedback: "A static IP wouldn't lead to an APIPA address." },
            { text: "The internet connection is down.", correct: false, feedback: "The problem is likely with DHCP and not the internet connection." }
        ]
    },
    // Additional scenarios can be added here...
];

// Function to start the game
function startGame() {
    // Ensure the path is reset at the beginning of the game
    const pathContainer = document.getElementById('path-container');
    pathContainer.style.width = '100%'; // Start with a full width for path

    // Initialize the character at the start of the path
    const character = document.getElementById('character');
    character.style.left = '0px';

    document.getElementById('story-text').textContent = scenarios[currentScenario].story;
    displayChoices(scenarios[currentScenario].choices);
    spawnCreature(); // Spawn a creature for the current scenario
}

// Function to display choices
function displayChoices(choices) {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';  // Clear previous choices

    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => makeChoice(index, choice.correct, choice.feedback);
        choicesContainer.appendChild(button);
    });
}

// Function to spawn a creature (obstacle)
function spawnCreature() {
    const pathContainer = document.getElementById('path-container');
    const creature = document.createElement('div');
    creature.classList.add('creature');
    creature.style.left = (currentScenario * 100) + 'px'; // Position creature on the path
    pathContainer.appendChild(creature);
}

// Handle player's choice
function makeChoice(choiceIndex, isCorrect, feedback) {
    if (isCorrect) {
        alert(feedback); // Show feedback
        defeatCreature(); // Defeat the creature
        moveCharacter(); // Move the character forward
        currentScenario++;  // Move to the next scenario
        if (currentScenario < scenarios.length) {
            startGame();
        } else {
            askForName();
        }
    } else {
        alert(feedback + " Try again.");
        // Retry the same scenario
        displayChoices(scenarios[currentScenario].choices);
    }
}

// Function to defeat the creature
function defeatCreature() {
    const pathContainer = document.getElementById('path-container');
    const creatures = pathContainer.getElementsByClassName('creature');
    if (creatures.length > 0) {
        creatures[0].style.display = 'none'; // Hide the creature
    }
}

// Function to move the character forward on the path
function moveCharacter() {
    const character = document.getElementById('character');
    const pathContainer = document.getElementById('path-container');
    const pathWidth = pathContainer.offsetWidth;
    const progress = (currentScenario + 1) * (pathWidth / scenarios.length); // Calculate character's position
    character.style.left = progress + 'px'; // Move character to the new position
}

// Request player's name at the end of the game
function askForName() {
    playerName = prompt("Please enter your full name:");
    alert(`${playerName} has completed this activity.`);
}

// Start the game when the page loads
window.onload = startGame;
