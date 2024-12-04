// Store game state
let currentScenario = 0;
let playerName = '';

// Define scenarios as an array of objects
const scenarios = [
    {
        story: "Trouble Ticket 1: A user reports that they can't access the company's internal website. They can ping the router but cannot reach any internal servers. What could be the issue?",
        choices: [
            { text: "Check if the DNS settings are correct.", correct: false, feedback: "Incorrect. DNS settings may be a problem, but it's more likely that routing is the issue." },
            { text: "Verify the IP address and subnet mask are correct.", correct: true, feedback: "Correct! Incorrect IP configuration can prevent access to internal servers even if the router is reachable." },
            { text: "Ensure the user has an active VPN connection.", correct: false, feedback: "Incorrect. VPN may not be the cause unless the user was accessing the network remotely." }
        ]
    },
    {
        story: "Trouble Ticket 2: A user reports that their device is connected to the network, but they cannot access the internet. You check and see the device has a 169.254.x.x address. What is most likely the cause?",
        choices: [
            { text: "The device cannot reach the DHCP server.", correct: true, feedback: "Correct! The 169.254.x.x address is an APIPA address, indicating the device failed to obtain an IP from the DHCP server." },
            { text: "The device is configured with a static IP address.", correct: false, feedback: "Incorrect. A static IP wouldn't lead to an APIPA address." },
            { text: "The internet connection is down.", correct: false, feedback: "Incorrect. The problem is likely with DHCP and not the internet connection." }
        ]
    },
    {
        story: "Trouble Ticket 3: You get a call from a colleague who’s trying to reach a remote server. They can’t get a response from the server's IP address. They confirm they can ping other devices on the network. What should you check first?",
        choices: [
            { text: "Check if the server's IP address is correct.", correct: true, feedback: "Correct! Verifying the server’s IP is important because a misconfigured IP could prevent communication." },
            { text: "Check if the router is down.", correct: false, feedback: "Incorrect. Since the colleague can ping other devices on the network, the router is likely functioning." },
            { text: "Ensure the firewall on the server is disabled.", correct: false, feedback: "Incorrect. The firewall might be blocking ICMP packets, but we should check the server’s IP first." }
        ]
    },
    {
        story: "Trouble Ticket 4: You’re working with a colleague who has just configured a new subnet. However, after configuring the network, users can't connect to the internet. The subnet is 192.168.50.0/24. What is the next step?",
        choices: [
            { text: "Ensure the router is configured with a static route for the new subnet.", correct: true, feedback: "Correct! Without a route to the new subnet, devices won’t be able to communicate with the outside world." },
            { text: "Make sure the users' devices have a valid gateway IP address.", correct: false, feedback: "Incorrect. While the gateway is important, the issue is more likely with routing." },
            { text: "Reconfigure the subnet mask to a larger network range.", correct: false, feedback: "Incorrect. The subnet mask is fine; the issue is with routing." }
        ]
    },
    {
        story: "Trouble Ticket 5: A technician is trying to subnet the 192.168.10.0/24 network into 4 subnets. What subnet mask would you recommend?",
        choices: [
            { text: "255.255.255.192", correct: true, feedback: "Correct! A subnet mask of 255.255.255.192 will divide the 192.168.10.0/24 network into 4 subnets." },
            { text: "255.255.255.128", correct: false, feedback: "Incorrect. A subnet mask of 255.255.255.128 would create only two subnets." },
            { text: "255.255.255.0", correct: false, feedback: "Incorrect. This subnet mask doesn’t subnet the network at all, leaving it as one large subnet." }
        ]
    }
];

// Function to start the game
function startGame() {
    document.getElementById('story-text').textContent = scenarios[currentScenario].story;
    displayChoices(scenarios[currentScenario].choices);
    updateProgress();
}

// Function to display choices
function displayChoices(choices) {
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = ''; // Clear previous choices

    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.classList.add('choice');
        button.onclick = () => makeChoice(index, choice.correct, choice.feedback);
        choicesContainer.appendChild(button);
    });
}

// Update progress bar
function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentScenario + 1) / scenarios.length) * 100;
    progressBar.value = progress;
}

// Handle player's choice
function makeChoice(choiceIndex, isCorrect, feedback) {
    if (isCorrect) {
        alert("Correct! " + feedback);
        currentScenario++;  // Move to the next scenario
        if (currentScenario < scenarios.length) {
            startGame();
        } else {
            askForName();
        }
    } else {
        alert("Incorrect. " + feedback + " Try again.");
        // No need to change currentScenario to ensure the same scenario is presented again
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
