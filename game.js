let playerName = "";
let hitPoints = 5;
let collectedItems = [];
let currentScenario = 0;

// Item List (items player collects after answering correctly)
const items = [
  "Network Cable",
  "Router Config Guide",
  "Switchport Analyzer",
  "Firewall Configuration Document",
  "DNS Troubleshooting Toolkit"
];

// Scenario Questions and Answers
const scenarios = [
  {
    question: "You are working on a customer’s network and they are unable to connect to the internet. You check their IP address and find that it starts with 169.254. What is the most likely cause?",
    choices: [
      "APIPA (Automatic Private IP Addressing)",
      "Incorrect DNS configuration",
      "Subnet mask misconfiguration",
      "Firewall blocking the connection"
    ],
    correctAnswer: "APIPA (Automatic Private IP Addressing)",
    itemToCollect: "Network Cable"
  },
  {
    question: "You need to troubleshoot a device that cannot communicate with other devices on the same network. You suspect a subnet issue. Which of the following addresses is most likely part of a Class C subnet?",
    choices: [
      "192.168.0.1",
      "10.0.0.1",
      "172.16.0.1",
      "224.0.0.1"
    ],
    correctAnswer: "192.168.0.1",
    itemToCollect: "Router Config Guide"
  },
  {
    question: "You are attempting to troubleshoot an IP address issue but the device’s IP is from a private IP range. Which of these is the correct RFC1918 private IP range?",
    choices: [
      "192.168.0.0 - 192.168.255.255",
      "169.254.0.0 - 169.254.255.255",
      "10.0.0.0 - 10.255.255.255",
      "172.16.0.0 - 172.31.255.255"
    ],
    correctAnswer: "192.168.0.0 - 192.168.255.255",
    itemToCollect: "Switchport Analyzer"
  },
  {
    question: "A user is unable to access a website, but other users on the same network can. What is the first troubleshooting step you should take?",
    choices: [
      "Check if the device has an IP address",
      "Reset the router",
      "Clear the browser cache",
      "Change the user’s IP address"
    ],
    correctAnswer: "Check if the device has an IP address",
    itemToCollect: "Firewall Configuration Document"
  },
  {
    question: "A user is unable to reach a certain server despite being on the same network. The issue seems related to DNS. What command would you use to check the DNS resolution?",
    choices: [
      "ping",
      "nslookup",
      "ipconfig",
      "tracert"
    ],
    correctAnswer: "nslookup",
    itemToCollect: "DNS Troubleshooting Toolkit"
  }
];

// Function to start the game after name input
function startGame() {
  playerName = document.getElementById("name-input").value;
  if (playerName !== "") {
    document.getElementById("name-input-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    document.getElementById("end-message").style.display = "none";
    document.getElementById("respawn-btn").style.display = "none";
    
    // Start the first scenario
    showScenario();
  } else {
    alert("Please enter a name to start the game!");
  }
}

// Show scenario based on current step
function showScenario() {
  if (currentScenario < scenarios.length) {
    const scenario = scenarios[currentScenario];
    document.getElementById("story-text").innerHTML = scenario.question;
    document.getElementById("choices-container").innerHTML = "";

    scenario.choices.forEach(choice => {
      const button = document.createElement("button");
      button.innerHTML = choice;
      button.onclick = () => checkAnswer(choice, scenario);
      document.getElementById("choices-container").appendChild(button);
    });
  } else {
    endGame();
  }
}

// Check player's answer and give feedback
function checkAnswer(choice, scenario) {
  if (choice === scenario.correctAnswer) {
    collectedItems.push(scenario.itemToCollect);
    document.getElementById("feedback").innerHTML = `Correct! You collected: ${scenario.itemToCollect}`;
    if (collectedItems.length === scenarios.length) {
      document.getElementById("feedback").innerHTML += "<br>Congratulations! You collected all items!";
    }
  } else {
    hitPoints--;
    document.getElementById("feedback").innerHTML = `Incorrect! You lost 1 hit point. Current HP: ${hitPoints}`;
  }
  currentScenario++;
  updateItems();
  updateHitPoints();

  // If player has no hit points left
  if (hitPoints <= 0) {
    document.getElementById("feedback").innerHTML = "Oh no! You were defeated! Respawn to try again.";
    document.getElementById("respawn-btn").style.display = "inline-block";
    document.getElementById("game-container").style.display = "none";
  } else {
    showScenario();
  }
}

// Show collected items
function updateItems() {
  let itemsList = "<strong>Collected Items:</strong><br>";
  collectedItems.forEach(item => {
    itemsList += `${item}<br>`;
  });
  document.getElementById("items").innerHTML = itemsList;
}

// Update hit points display
function updateHitPoints() {
  document.getElementById("hit-points").innerHTML = `Hit Points: ${hitPoints}`;
}

// End game
function endGame() {
  document.getElementById("story-text").innerHTML = "Congratulations, " + playerName + "! You've completed the adventure!";
  document.getElementById("choices-container").style.display = "none";
  document.getElementById("feedback").style.display = "none";
  document.getElementById("end-message").style.display = "block";
  if (collectedItems.length === scenarios.length) {
    document.getElementById("end-message").innerHTML = `Congratulations, ${playerName}! You have achieved the title of Tier 2 Technician!`;
  } else {
    document.getElementById("end-message").innerHTML += ` Unfortunately, you didn't collect all items. Try again to become a Tier 2 Technician.`;
  }
}

// Respawn button functionality
function respawn() {
  hitPoints = 5;
  collectedItems = [];
  currentScenario = 0;
  document.getElementById("respawn-btn").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("end-message").style.display = "none";
  document.getElementById("feedback").style.display = "block";
  document.getElementById("items").style.display = "block";
  showScenario();
}
