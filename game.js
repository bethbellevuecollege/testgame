let currentScenario = 0;
let correctAnswers = 0;
let totalScenarios = 10;
let progress = 0;

const scenarios = [
    {
        question: "Which of the following IP address ranges are private (RFC1918)?",
        choices: ["192.168.0.0 - 192.168.255.255", "10.0.0.0 - 10.255.255.255", "172.16.0.0 - 172.31.255.255", "All of the above"],
        correctAnswer: "All of the above",
        feedback: "Correct! The RFC1918 standard defines the private address ranges as 10.0.0.0 - 10.255.255.255, 172.16.0.0 - 172.31.255.255, and 192.168.0.0 - 192.168.255.255."
    },
    {
        question: "What is the default subnet mask for a Class C network?",
        choices: ["255.255.0.0", "255.255.255.0", "255.0.0.0", "255.255.255.255"],
        correctAnswer: "255.255.255.0",
        feedback: "Correct! A Class C network typically uses the subnet mask 255.255.255.0."
    },
    {
        question: "What is the maximum number of hosts in a /24 subnet?",
        choices: ["254", "255", "256", "512"],
        correctAnswer: "254",
        feedback: "Correct! A /24 subnet provides 254 usable host addresses (256 total addresses minus 2 for the network and broadcast addresses)."
    },
    {
        question: "What is VLSM used for?",
        choices: ["To create subnets of unequal sizes", "To assign IP addresses to subnets", "To create a default route", "To assign Class A addresses"],
        correctAnswer: "To create subnets of unequal sizes",
        feedback: "Correct! VLSM (Variable Length Subnet Masking) allows for more efficient use of IP address space by creating subnets of varying sizes."
    },
    {
        question: "You are given the IP address 192.168.1.50/24. Is this address within the range 192.168.1.0 - 192.168.1.255?",
        choices: ["Yes", "No"],
        correctAnswer: "Yes",
        feedback: "Correct! The address 192.168.1.50 falls within the 192.168.1.0/24 network range."
    },
    {
        question: "You are troubleshooting an issue with an IP address on a local machine. It has automatically assigned itself an IP in the range 169.254.x.x. What does this indicate?",
        choices: ["The machine is using APIPA (Automatic Private IP Addressing)", "The machine is assigned a private IP address", "The machine has a static IP address", "The network interface is down"],
        correctAnswer: "The machine is using APIPA (Automatic Private IP Addressing)",
        feedback: "Correct! APIPA assigns IP addresses in the range 169.254.0.0 to 169.254.255.255 when a machine cannot reach a DHCP server."
    },
    {
        question: "Which of the following is a valid Class B IP address?",
        choices: ["128.0.0.0", "192.168.0.0", "10.0.0.0", "172.16.0.0"],
        correctAnswer: "172.16.0.0",
        feedback: "Correct! 172.16.0.0 is part of the Class B address range (128.0.0.0 to 191.255.255.255)."
    },
    {
        question: "What is the purpose of the loopback address (127.0.0.1)?",
        choices: ["To communicate with the router", "To check if the local machine's network stack is functioning", "To connect to the internet", "To communicate with a DNS server"],
        correctAnswer: "To check if the local machine's network stack is functioning",
        feedback: "Correct! The loopback address (127.0.0.1) is used to test the local machine's network stack."
    },
    {
        question: "Which of the following is a valid multicast IP address?",
        choices: ["224.0.0.1", "192.168.1.1", "10.0.0.1", "255.255.255.255"],
        correctAnswer: "224.0.0.1",
        feedback: "Correct! IP addresses in the range 224.0.0.0 to 239.255.255.255 are used for multicast communication."
    },
    {
        question: "Which of the following represents Class A IP addresses?",
        choices: ["10.0.0.0 - 10.255.255.255", "172.16.0.0 - 172.31.255.255", "192.168.0.0 - 192.168.255.255", "224.0.0.0 - 239.255.255.255"],
        correctAnswer: "10.0.0.0 - 10.255.255.255",
        feedback: "Correct! The Class A address range is from 10.0.0.0 to 10.255.255.255."
    }
];

function updateProgress() {
    const progressBar = document.getElementById("progress-bar");
    progress = (correctAnswers / totalScenarios) * 100;
    progressBar.style.width = progress + "%";
}

function displayScenario() {
    const scenario = scenarios[currentScenario];
    const storyText = document.getElementById("story-text");
    storyText.innerHTML = `<p>${scenario.question}</p>`;

    const choicesContainer = document.querySelector(".choices-container");
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

    if (selectedAnswer === scenario.correctAnswer) {
        correctAnswers++;
        storyText.innerHTML += `<p>Correct! ${scenario.feedback}</p>`;
    } else {
        storyText.innerHTML += `<p>Incorrect. Try again!</p>`;
        return;
    }

    currentScenario++;
    updateProgress();

    if (currentScenario < totalScenarios) {
        setTimeout(displayScenario, 1000);
    } else {
        storyText.innerHTML += `<p>Congratulations, you've completed the adventure!</p>`;
    }
}

window.onload = function() {
    displayScenario();
};
