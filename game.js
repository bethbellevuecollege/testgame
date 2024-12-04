// Store game state
let currentScenario = 0;
let playerName = '';

// Define all 10 scenarios as an array of objects
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
    },
    {
        story: "Trouble Ticket 6: A network engineer needs to configure a subnet for a network segment with 300 hosts. What subnet mask should they use?",
        choices: [
            { text: "255.255.255.0", correct: false, feedback: "Incorrect. This subnet mask supports only 254 hosts, which is insufficient." },
            { text: "255.255.254.0", correct: true, feedback: "Correct! A subnet mask of 255.255.254.0 provides 510 usable IP addresses, which is enough for 300 hosts." },
            { text: "255.255.255.128", correct: false, feedback: "Incorrect. This subnet mask supports only 126 hosts, which isn't enough." }
        ]
    },
    {
        story: "Trouble Ticket 7: A user reports that they can't connect to a printer on the network. The printer has the IP address 192.168.2.100, and the user's computer has 192.168.3.50. They are both connected to the same router. What could be the issue?",
        choices: [
            { text: "The subnet mask of the devices is incorrect.", correct: true, feedback: "Correct! The devices are in different subnets, and communication between them will fail without a route or correct subnet mask." },
            { text: "The printer is offline.", correct: false, feedback: "Incorrect. The issue is more likely related to network configuration, not the printer's status." },
            { text: "The router needs to be rebooted.", correct: false, feedback: "Incorrect. The router is likely not the issue; it’s the subnet configuration." }
        ]
    },
    {
        story: "Trouble Ticket 8: A user cannot reach a website, but they can ping other devices on the network. What could be the issue?",
        choices: [
            { text: "The user’s DNS settings may be misconfigured.", correct: true, feedback: "Correct! DNS misconfiguration is a common issue when devices can't resolve domain names but can ping IPs." },
            { text: "The user’s gateway is misconfigured.", correct: false, feedback: "Incorrect. If they can ping other devices on the network, their gateway is likely functioning." },
            { text: "The user’s device is infected with malware.", correct: false, feedback: "Incorrect. Malware could cause issues, but this scenario points to DNS misconfiguration." }
        ]
    },
    {
        story: "Trouble Ticket 9: A user can connect to the internet, but certain sites are not accessible. What is the likely cause?",
        choices: [
            { text: "The user's IP address is being blocked by a firewall.", correct: false, feedback: "Incorrect. A firewall typically blocks traffic, but this issue seems more isolated to specific websites." },
            { text: "The user's DNS cache is corrupted.", correct: true, feedback: "Correct! A corrupted DNS cache could cause issues when accessing specific websites while others are fine." },
            { text: "The user's NIC driver is outdated.", correct: false, feedback: "Incorrect. While drivers can cause issues, this scenario points to a DNS cache problem." }
        ]
    },
    {
        story: "Trouble Ticket 10: You are configuring a Class B network with the subnet 172.16.0.0/16. You need to create 500 subnets. What subnet mask should you use?",
        choices: [
            { text: "255.255.255.0", correct: false, feedback: "Incorrect. This would give you only 256 subnets, which isn't enough." },
            { text: "255.255.254.0", correct: true, feedback: "Correct! A subnet mask of 255.255.254.0 gives you 512 subnets, enough for your needs." },
            { text: "255.255.255.240", correct: false, feedback: "Incorrect. This subnet mask would create too many subnets and too few hosts per subnet." }
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
