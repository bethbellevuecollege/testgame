// Variables to track the game state
let playerName = "";
let hitPoints = 5;
let itemsCollected = []; // Array to store the items collected during the game
let currentScenario = 0; // Tracks which scenario the player is on

// Start the game when the player clicks the start button
function startGame() {
  playerName = document.getElementById("player-name").value;
  if (!playerName) {
    alert("Please enter your name to start.");
    return;
  }

  // Update player name on the page
  document.getElementById("player-name-display").innerText = playerName;

  // Hide name input form and show the game content
  document.getElementById("name-input-container").style.display = "none";
  document.getElementById("game-play").style.display = "block";

  loadScenario(); // Load the first scenario
}

// Function to load the current scenario
function loadScenario() {
  // Stop if the player is out of hit points
  if (hitPoints <= 0) {
    return;
  }

  // Get the current scenario from the scenarios array
  const scenario = getScenario(currentScenario);
  
  // Display the question
  document.getElementById("scenario-container").innerHTML = scenario.question;
  
  // Get the answer buttons container and clear it
  const answerButtons = document.getElementById("answer-buttons");
  answerButtons.innerHTML = "";

  // Create buttons for the possible answers
  scenario.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.onclick = () => handleAnswer(answer.isCorrect, scenario, answer.text);
    answerButtons.appendChild(button);
  });
}

// Handle the player's answer
function handleAnswer(isCorrect, scenario, answerText) {
  const feedback = document.getElementById("feedback");
  if (isCorrect) {
    feedback.innerHTML = "Correct! You move forward.";
    itemsCollected.push(scenario.item); // Add item to collected items
    currentScenario++; // Move to the next scenario

    // Check if the game is over
    if (currentScenario < scenarios.length) {
      loadScenario();
    } else {
      endGame();
    }
  } else {
    feedback.innerHTML = `Incorrect. Hint: ${scenario.hint}`;
    hitPoints--; // Decrease hit points on incorrect answer
    document.getElementById("hit-points").innerHTML = "Hit Points: " + hitPoints;

    if (hitPoints <= 0) {
      showRespawnButton(); // Show respawn button if hit points reach 0
    }
  }
}

// Show respawn button when the player is out of hit points
function showRespawnButton() {
  document.getElementById("respawn-container").style.display = "block";
}

// Function to respawn and reset the game
function respawnGame() {
  hitPoints = 5;
  currentScenario = 0;
  itemsCollected = [];
  document.getElementById("hit-points").innerHTML = "Hit Points: " + hitPoints;
  document.getElementById("inventory").innerHTML = "Items Collected: None";
  document.getElementById("respawn-container").style.display = "none";
  loadScenario(); // Reload the first scenario
}

// Function to end the game and show the results
function endGame() {
  document.getElementById("game-play").style.display = "none";
  document.getElementById("end-game-message").style.display = "block";
  
  // Display the items collected and award the title
  document.getElementById("end-game-message").innerHTML = `
    <h2>Congratulations, ${playerName}! You defeated the End Boss!</h2>
    <p>Items Collected:</p>
    <ul>
      ${itemsCollected.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <p>You have earned the title of IT Technician Tier 2!</p>
  `;
}

// List of all scenarios
const scenarios = [
  {
    question: "The villagers in Subnet Forest are unable to communicate over the network. Upon inspection, you find that their subnet mask is incorrectly configured. What should you do first to restore their connection?",
    answers: [
      { text: "Change the subnet mask to 255.255.255.0", isCorrect: true },
      { text: "Reboot the router to refresh its settings", isCorrect: false },
      { text: "Change the IP address of each device to 169.254.x.x", isCorrect: false },
      { text: "Set the gateway IP address to 192.168.1.1", isCorrect: false }
    ],
    item: "Network Configuration Tools",
    hint: "The IP address and subnet mask must work together. Think about a subnet mask that is commonly used for local networks with fewer than 254 devices."
  },
  {
    question: "The devices in Gateway Castle are all using APIPA addresses (169.254.x.x). What should you do first to fix the issue?",
    answers: [
      { text: "Assign each device a static IP address within the same subnet", isCorrect: false },
      { text: "Check if the devices are properly connected to the network via Ethernet", isCorrect: false },
      { text: "Ensure that the DHCP server is running and reachable", isCorrect: true },
      { text: "Disable all devices' network adapters and re-enable them", isCorrect: false }
    ],
    item: "DHCP Wizard's Staff",
    hint: "APIPA is a fallback address assigned when a device can't reach a DHCP server. You must check if the DHCP server is up and running."
  },
  {
    question: "The devices inside NAT Mountain are all using private IPv4 addresses. What is the most likely reason they can't access external websites?",
    answers: [
      { text: "The devices are using addresses from the private range (10.x.x.x, 172.16.x.x, 192.168.x.x), which can't route to the internet without NAT", isCorrect: true },
      { text: "The firewall is blocking all outgoing traffic to external IPs", isCorrect: false },
      { text: "The subnet mask is too restrictive, preventing devices from accessing external sites", isCorrect: false },
      { text: "The devices are using incorrect DNS servers", isCorrect: false }
    ],
    item: "NAT Amplifier",
    hint: "Private addresses are great for internal use but cannot be routed to the internet directly. You need a NAT or router with NAT enabled to translate these addresses."
  }
];

// Fetches a scenario by its index
function getScenario(index) {
  return scenarios[index];
}
