let playerName = '';
let hitPoints = 5;
let inventory = [];
let currentScenario = 0;
let correctAnswers = 0;

const scenarios = [
  {
    question: "What is an IPv4 address class for a private network?",
    choices: ["Class A", "Class B", "Class C", "Class D"],
    correctAnswer: "Class B",
    hint: "This class is commonly used for private networks in organizations."
  },
  {
    question: "What is the APIPA address range?",
    choices: ["169.254.0.0 - 169.254.255.255", "192.168.0.0 - 192.168.255.255", "10.0.0.0 - 10.255.255.255", "172.16.0.0 - 172.31.255.255"],
    correctAnswer: "169.254.0.0 - 169.254.255.255",
    hint: "This range is automatically assigned when a device cannot contact a DHCP server."
  },
  {
    question: "What does RFC1918 define?",
    choices: ["Private IP address ranges", "Public IP address ranges", "IP address assignments for ISPs", "None of the above"],
    correctAnswer: "Private IP address ranges",
    hint: "This RFC reserves specific ranges for private use."
  },
  // Add more scenarios as needed
];

function startGame() {
  playerName = document.getElementById('player-name').value;
  if (!playerName) {
    alert("Please enter your name to start!");
    return;
  }
  
  document.getElementById('name-input-container').classList.add('hidden');
  document.getElementById('game-play').classList.remove('hidden');
  document.getElementById('player-name-display').textContent = playerName;

  loadScenario();
}

function loadScenario() {
  const scenario = scenarios[currentScenario];
  document.getElementById('scenario-container').textContent = scenario.question;
  const answerButtons = document.getElementById('answer-buttons');
  answerButtons.innerHTML = '';
  
  scenario.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.onclick = () => checkAnswer(choice);
    answerButtons.appendChild(button);
  });

  document.getElementById('feedback').textContent = '';
}

function checkAnswer(selectedAnswer) {
  const scenario = scenarios[currentScenario];

  if (selectedAnswer === scenario.correctAnswer) {
    correctAnswers++;
    inventory.push(scenario.correctAnswer);
    document.getElementById('inventory').textContent = `Items Collected: ${inventory.join(', ')}`;
    currentScenario++;
    if (currentScenario < scenarios.length) {
      loadScenario();
    } else {
      endGame();
    }
  } else {
    hitPoints--;
    document.getElementById('hit-points').textContent = `Hit Points: ${hitPoints}`;
    document.getElementById('feedback').textContent = `Incorrect! Hint: ${scenario.hint}`;
    
    if (hitPoints === 0) {
      document.getElementById('respawn-container').classList.remove('hidden');
    }
  }
}

function respawnGame() {
  hitPoints = 5;
  currentScenario = 0;
  inventory = [];
  document.getElementById('hit-points').textContent = `Hit Points: ${hitPoints}`;
  document.getElementById('inventory').textContent = `Items Collected: None`;
  document.getElementById('respawn-container').classList.add('hidden');
  loadScenario();
}

function endGame() {
  document.getElementById('end-game-message').classList.remove('hidden');
  document.getElementById('game-play').classList.add('hidden');
}
