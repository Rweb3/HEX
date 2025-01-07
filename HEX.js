// JavaScript code for Hexagon Puzzle game
const gridSize = 5; // Size of the grid
const hexGrid = document.getElementById('hexGrid');
const targetPatternDisplay = document.getElementById('targetPattern');

// Generate a random pattern for the hexagons
const generatePattern = () => {
    const pattern = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        pattern.push(Math.random() > 0.5 ? 1 : 0);
    }
    return pattern;
};

// Current and target patterns
let currentPattern = Array(gridSize * gridSize).fill(0);
let targetPattern = generatePattern();

// Update the target pattern display
const updateTargetDisplay = () => {
    targetPatternDisplay.textContent = `Target Pattern: ${targetPattern.join('')}`;
};

updateTargetDisplay();

// Create the hexagonal grid
for (let i = 0; i < gridSize * gridSize; i++) {
    const hex = document.createElement('div');
    hex.classList.add('hex');
    hex.dataset.index = i;
    hex.textContent = currentPattern[i];
    hex.addEventListener('click', () => toggleHex(hex));
    hexGrid.appendChild(hex);
}

// Toggle a hexagon and its neighbors
const toggleHex = (hex) => {
    const index = parseInt(hex.dataset.index);
    const neighbors = [
        index - gridSize,       // Top
        index + gridSize,       // Bottom
        index - 1,              // Left
        index + 1,              // Right
        index - gridSize - 1,   // Top-left
        index + gridSize + 1    // Bottom-right
    ];

    // Toggle the clicked hex
    currentPattern[index] = currentPattern[index] === 1 ? 0 : 1;
    hex.textContent = currentPattern[index];
    hex.classList.toggle('active');

    // Toggle neighbors if they exist
    neighbors.forEach((n) => {
        const neighborHex = document.querySelector(`.hex[data-index='${n}']`);
        if (neighborHex) {
            currentPattern[n] = currentPattern[n] === 1 ? 0 : 1;
            neighborHex.textContent = currentPattern[n];
            neighborHex.classList.toggle('active');
        }
    });

    checkWinCondition();
};

// Check if the current pattern matches the target pattern
const checkWinCondition = () => {
    if (currentPattern.join('') === targetPattern.join('')) {
        alert('Congratulations! You solved the puzzle!');
        // Redirect to the YouTube video page
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
};


// Shuffle the hexagons to start the puzzle
const shuffleHexagons = () => {
    targetPattern = generatePattern();
    updateTargetDisplay();
    currentPattern = Array(gridSize * gridSize).fill(0);
    document.querySelectorAll('.hex').forEach((hex, i) => {
        hex.textContent = currentPattern[i];
        hex.classList.remove('active');
    });
};
