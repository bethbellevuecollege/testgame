let playerName = '';
let hitPoints = 5;
let collectedItems = [];  // To track items collected
let currentScenario = 0;

// Item data for each scenario (e.g., router, cable, etc.)
const itemsForScenarios = [
    "Network Cable",        // Scenario 1 item
    "Router",               // Scenario 2 item
    "Multimeter",           // Scenario 3 item
    "Wi-Fi Analyzer",       // Scenario 4 item
    "Switch",               // Scenario 5 item
    "Firewall",             // Scenario 6 item
    "Access Point",         // Scenario 7 item
    "Ethernet Cable",       // Scenario 8 item
    "Patch Panel",          // Scenario 9 item
    "Tier 2 Technician Title" // End game reward
];

// Function to display collected items
function displayCollectedItems() {
    const itemsDiv = document.getElementById('items');
    itemsDiv.innerHTML = '<h3>Collected Items:</h3><ul>';
    collectedItems.forEach(item => {
        itemsDiv.innerHTML += `<li>${item}</li>`;
    });
    itemsDiv.innerHTML += '</ul>';
}

// Function to handle the end of the game
function endGame() {
    const endMessageDiv = document.getElementById('end-message');
    endMessageDiv.innerHTML = `Congratulations, ${playerName}! You defeated the end boss!`;
    
    // Display collected items and Tier 2 Technician title
    if (collectedItems.length === itemsForScenarios.length) {
        endMessageDiv.innerHTML += "<br><strong>Achievement Unlocked: Tier 2 Technician!</strong>";
    }
    displayCollectedItems();
    const respawnButton = document.createElement('button');
    respawnButton.innerText = "Respawn";
    respawnButton.onclick = respawn;
    document.body.appendChild(respawnButton);
}

// Function to handle player respawn
function respawn() {
    hitPoints = 5;
    collectedItems = [];
    currentScenario = 0;
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('story-text').innerHTML = 'You have respawned. Your adventure begins again!';
    document.getElementById('choices-container').innerHTML = '';
    displayCollectedItems();
    startGame();
}

// Function to start the game
function startGame() {
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('end-message').innerHTML = '';
    playerName = document.getElementById('name-input').value || "Technician";
    document.getElementById('story-text').innerHTML = 'Welcome to your IT Adventure, ' + playerName + '! You have 5 hit points. Good luck!';
    showScenario(currentScenario);
}

// Function to show the current scenario
function showScenario(scenarioNumber) {
    if (hitPoints <= 0) {
        document.getElementById('feedback').innerHTML = 'Oh no! You were defeated! Respawn to try again.';
        return;
    }

    const scenarioText = getScenarioText(scenarioNumber);
    document.getElementById('story-text').innerHTML = scenarioText.text;
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';

    scenarioText.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => processChoice(choice.isCorrect, scenarioNumber);
        choicesContainer.appendChild(button);
    });
}

// Function to get the scenario details based on the scenario number
function getScenarioText(scenarioNumber) {
    const scenarios = [
        {
            text: "You arrive at a desk with a laptop that won't connect to the network. What do you check first?",
            choices: [
                { text: "Check the cable connection", isCorrect: true },
                { text: "Restart the laptop", isCorrect: false },
                { text: "Contact the user", isCorrect: false }
            ]
        },
        {
            text: "The network printer isn't responding. What do you check first?",
            choices: [
                { text: "Check the printer's IP address", isCorrect: true },
                { text: "Check the paper tray", isCorrect: false },
                { text: "Check the power cord", isCorrect: false }
            ]
        },
        {
            text: "A user reports that the Wi-Fi is very slow. What do you check first?",
            choices: [
                { text: "Check for nearby Wi-Fi interference", isCorrect: true },
                { text: "Check the cable connection", isCorrect: false },
                { text: "Check the printer queue", isCorrect: false }
            ]
        },
        {
            text: "The server is down, but you can't find any network issues. What should you check?",
            choices: [
                { text: "Check the server's power supply", isCorrect: true },
                { text: "Check the user's password", isCorrect: false },
                { text: "Check the internet connection", isCorrect: false }
            ]
        },
        {
            text: "A computer won't boot up. What do you check first?",
            choices: [
                { text: "Check the power cable", isCorrect: true },
                { text: "Check the monitor brightness", isCorrect: false },
                { text: "Check the operating system", isCorrect: false }
            ]
        },
        {
            text: "A router is not connecting to the internet. What do you check first?",
            choices: [
                { text: "Check the router's internet connection", isCorrect: true },
                { text: "Check the wireless signal", isCorrect: false },
                { text: "Check the device's power settings", isCorrect: false }
            ]
        },
        {
            text: "A user's computer has a slow connection. What do you check first?",
            choices: [
                { text: "Check the network adapter settings", isCorrect: true },
                { text: "Check the Wi-Fi signal strength", isCorrect: false },
                { text: "Check the power settings", isCorrect: false }
            ]
        },
        {
            text: "A switch isn't routing correctly. What do you check first?",
            choices: [
                { text: "Check the VLAN settings", isCorrect: true },
                { text: "Check the switch's firmware", isCorrect: false },
                { text: "Check the IP settings", isCorrect: false }
            ]
        },
        {
            text: "You are troubleshooting a server that is unreachable. What do you check first?",
            choices: [
                { text: "Check the server's IP address", isCorrect: true },
                { text: "Check the user's credentials", isCorrect: false },
                { text: "Check the file sharing settings", isCorrect: false }
            ]
        },
        {
            text: "You're at the final stage of your journey and need to configure a firewall rule. What do you need?",
            choices: [
                { text: "Firewall configuration tool", isCorrect: true },
                { text: "Switch configuration tool", isCorrect: false },
                { text: "Ethernet cable", isCorrect: false }
            ]
        }
    ];

    return scenarios[scenarioNumber];
}

// Function to process the player's choice
function processChoice(isCorrect, scenarioNumber) {
    if (isCorrect) {
        collectedItems.push(itemsForScenarios[scenarioNumber]);
        document.getElementById('feedback').innerHTML = `Correct! You earned a new item: ${itemsForScenarios[scenarioNumber]}`;
    } else {
        hitPoints--;
        document.getElementById('feedback').innerHTML = `Incorrect! You lost 1 hit point. Remaining hit points: ${hitPoints}`;
    }

    currentScenario++;

    if (currentScenario >= itemsForScenarios.length) {
        endGame();
    } else {
        showScenario(currentScenario);
    }
}

document.getElementById('name-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startGame();
    }
});
