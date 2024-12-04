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

    // Update the inventory
    document.getElementById("inventory").innerHTML = "Items Collected: " + itemsCollected.join(', ');

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
  document.getElementById("feedback").innerHTML = "You've respawned with full health!";
  loadScenario(); // Reload the first scenario
}

// Function to end the game and show the results
function endGame() {
  document.getElementById("game-play").style.display = "none";
  document.getElementById("end-game-message").style.display = "block";
  
  // Display the items collected
  const itemsList = document.getElementById("items-collected-list");
  itemsList.innerHTML = itemsCollected.map(item => `<li>${item}</li>`).join('');
}

// List of all scenarios
const scenarios = [
  {
    question: "You encounter a networking issue. What is your first step?",
    answers: [
      { text: "Check the cables", isCorrect: true },
      { text: "Check the power supply", isCorrect: false },
      { text: "Reboot the router", isCorrect: false }
    ],
    item: "Basic Troubleshooting Kit",
    hint: "Think about the most common networking issues."
  },
  {
    question: "The IP address of the device isn't valid. What should you do next?",
    answers: [
      { text: "Check the subnet mask", isCorrect: true },
      { text: "Reboot the device", isCorrect: false },
      { text: "Call the user", isCorrect: false }
    ],
    item: "Subnetting Tool",
    hint: "It's important to verify network settings."
  },
  {
    question: "A device can't connect to the internet. What could be the problem?",
    answers: [
      { text: "Check the default gateway", isCorrect: true },
      { text: "Check the printer", isCorrect: false },
      { text: "Check the monitor", isCorrect: false }
    ],
    item: "Network Configuration Guide",
    hint: "Default gateway is critical for internet connectivity."
  },
  {
    question: "A computer can't access certain websites but can access others. What do you do?",
    answers: [
      { text: "Check DNS settings", isCorrect: true },
      { text: "Check the firewall", isCorrect: false },
      { text: "Reboot the router", isCorrect: false }
    ],
    item: "DNS Configuration Manual",
    hint: "DNS settings control website access."
  },
  {
    question: "A user is getting a DHCP error. What is the first thing to check?",
    answers: [
      { text: "Check the DHCP server", isCorrect: true },
      { text: "Check the router", isCorrect: false },
      { text: "Check the DNS server", isCorrect: false }
    ],
    item: "DHCP Troubleshooting Guide",
    hint: "DHCP server assigns IP addresses dynamically."
  }
];

// Fetches a scenario by its index
function getScenario(index) {
  return scenarios[index];
}
