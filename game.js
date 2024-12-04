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
    {
        story: "Trouble Ticket 3: A user is unable to access any internal resources or websites, but they can access external websites. After further investigation, the user is assigned an IP in the 169.254.x.x range. What should you do first?",
        choices: [
            { text: "Check if the DHCP server is operational.", correct: true, feedback: "A 169.254.x.x address is assigned when a device cannot contact the DHCP server." },
            { text: "Check the user's static IP settings.", correct: false, feedback: "The device is receiving an APIPA address, which means it couldn't contact the DHCP server." },
            { text: "Restart the router.", correct: false, feedback: "The router may not be the issue; the problem is with DHCP." }
        ]
    },
    {
        story: "Trouble Ticket 4: A user reports slow internet speeds. After running speed tests, you confirm the speeds are significantly below what the user should be receiving. What would you check next?",
        choices: [
            { text: "Check the device's wireless signal strength and interference.", correct: true, feedback: "Signal strength issues and interference can significantly impact network speeds." },
            { text: "Reset the router.", correct: false, feedback: "Resetting the router may help but is unlikely to address the underlying issue." },
            { text: "Ensure the user is using the correct IP address.", correct: false, feedback: "An incorrect IP address typically wouldn't cause slow speeds in this case." }
        ]
    },
    {
        story: "Trouble Ticket 5: You are given an IP address of 192.168.15.28 and need to determine if it is within the subnet 192.168.15.0/24. What should you do?",
        choices: [
            { text: "Check if the IP address falls between 192.168.15.1 and 192.168.15.254.", correct: true, feedback: "The range for the 192.168.15.0/24 subnet is from 192.168.15.1 to 192.168.15.254." },
            { text: "Check if the IP address falls within the range 192.168.0.1 to 192.168.255.254.", correct: false, feedback: "This is a much broader range that doesn't apply to the 192.168.15.0/24 subnet." },
            { text: "Check if the IP address is in the 192.168.0.0/16 subnet.", correct: false, feedback: "The 192.168.15.0/24 subnet is a smaller range, so 192.168.15.28 does not belong to the 192.168.0.0/16 subnet in this case." }
        ]
    },
    {
        story: "Trouble Ticket 6: A user is having trouble accessing resources within a remote office. You find that their IP address is 10.0.1.50, and the office network uses the 10.0.0.0/24 subnet. What could be the issue?",
        choices: [
            { text: "The user's IP address is outside of the correct subnet range.", correct: true, feedback: "The 10.0.1.50 address does not belong to the 10.0.0.0/24 subnet, which ranges from 10.0.0.1 to 10.0.0.254." },
            { text: "The user's router is misconfigured.", correct: false, feedback: "The issue seems to be with the IP address, not the router configuration." },
            { text: "The user needs to reset their password.", correct: false, feedback: "Password issues wouldn't typically prevent the user from accessing resources on a different subnet." }
        ]
    },
    {
        story: "Trouble Ticket 7: A network administrator asks you to help with subnetting a network for a new department. The department needs 30 hosts per subnet. Which subnet mask would you choose?",
        choices: [
            { text: "255.255.255.224", correct: true, feedback: "A subnet mask of 255.255.255.224 provides 32 IP addresses, with 30 usable host addresses." },
            { text: "255.255.255.252", correct: false, feedback: "This subnet mask would provide only 4 host addresses per subnet, which is insufficient for 30 hosts." },
            { text: "255.255.255.0", correct: false, feedback: "This subnet mask would provide 254 host addresses, which is overkill for the department's needs." }
        ]
    },
    {
        story: "Trouble Ticket 8: A user has a Class B IP address. They need to understand how many valid host addresses are available in the network. The IP address is 172.16.0.0 with a subnet mask of 255.255.0.0. How many host addresses are available?",
        choices: [
            { text: "65534", correct: true, feedback: "A Class B network with a 255.255.0.0 subnet mask provides 65534 usable host addresses." },
            { text: "65536", correct: false, feedback: "This number includes the network and broadcast addresses, which are not usable." },
            { text: "254", correct: false, feedback: "A Class B network has more than 254 usable addresses." }
        ]
    },
    {
        story: "Trouble Ticket 9: A technician needs to convert a CIDR notation of 192.168.1.0/27 into a subnet mask. What is the subnet mask?",
        choices: [
            { text: "255.255.255.224", correct: true, feedback: "CIDR /27 corresponds to the subnet mask 255.255.255.224." },
            { text: "255.255.255.192", correct: false, feedback: "CIDR /26 would correspond to 255.255.255.192, not /27." },
            { text: "255.255.255.0", correct: false, feedback: "CIDR /24 corresponds to 255.255.255.0, not /27." }
        ]
    },
    {
        story: "Trouble Ticket 10: You are given a subnet of 10.0.0.0/8 and need to determine the available host addresses for this network. What is the total number of usable host addresses?",
        choices: [
            { text: "16777214", correct: true, feedback: "A /8 subnet provides a total of 16777214 usable host addresses." },
            { text: "16777216", correct: false, feedback: "This number includes the network and broadcast addresses, which are not usable." },
            { text: "65536", correct: false, feedback: "This number corresponds to a /16 subnet, not /8." }
        ]
    }
];

// Function to start the game
function startGame() {
    // Ensure the progress bar starts at 0% at the beginning of the game
    const progressBar = document.getElementById('progress-bar');
    progressBar.value = 0; // Set progress to 0%

    document.getElementById('story-text').textContent = scenarios[currentScenario].story;
    displayChoices(scenarios[currentScenario].choices);
    updateProgress(); // Update the progress bar as soon as the game starts
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

// Update progress bar
function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    // Calculate progress based on current scenario and total scenarios
    const progress = ((currentScenario) / scenarios.length) * 100;
    progressBar.value = progress;  // Update progress bar after answering each question
}

// Handle player's choice
function makeChoice(choiceIndex, isCorrect, feedback) {
    if (isCorrect) {
        alert(feedback); // Show feedback
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

// Request player's name at the end of the game
function askForName() {
    playerName = prompt("Please enter your full name:");
    alert(`${playerName} has completed this activity.`);
}

// Start the game when the page loads
window.onload = startGame;
