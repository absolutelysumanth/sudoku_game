// Sample puzzles (0s represent empty cells)
const puzzles = [
    [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    [
      [0, 0, 5, 3, 0, 0, 0, 0, 0],
      [8, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 7, 0, 0, 1, 0, 5, 0, 0],
      [4, 0, 0, 0, 0, 5, 3, 0, 0],
      [0, 1, 0, 0, 7, 0, 0, 0, 6],
      [0, 0, 3, 2, 0, 0, 0, 8, 0],
      [0, 6, 0, 5, 0, 0, 0, 0, 9],
      [0, 0, 4, 0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 9, 7, 0, 0]
    ],
    [
      [1, 0, 0, 4, 8, 0, 7, 0, 0],
      [0, 3, 0, 0, 0, 5, 0, 9, 0],
      [0, 0, 0, 0, 0, 7, 2, 8, 0],
      [5, 0, 9, 0, 0, 0, 0, 0, 4],
      [0, 4, 0, 2, 0, 3, 0, 6, 0],
      [3, 0, 0, 0, 0, 0, 5, 0, 8],
      [0, 9, 1, 6, 0, 0, 0, 0, 0],
      [0, 7, 0, 5, 0, 0, 0, 3, 0],
      [0, 0, 5, 0, 1, 9, 0, 0, 7]
    ]
  ];
  
  // Predefined solutions for the puzzles
  const solutions = [
    [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ],
    [
      [1, 4, 5, 3, 2, 7, 6, 9, 8],
      [8, 3, 9, 6, 5, 4, 1, 2, 7],
      [6, 7, 2, 9, 1, 8, 5, 4, 3],
      [4, 9, 6, 1, 8, 5, 3, 7, 2],
      [2, 1, 8, 4, 7, 3, 9, 5, 6],
      [7, 5, 3, 2, 9, 6, 8, 1, 4],
      [3, 6, 7, 5, 4, 2, 8, 1, 9],
      [9, 8, 4, 7, 6, 1, 2, 3, 5],
      [5, 2, 1, 8, 3, 9, 7, 6, 4]
    ],
    [
      [1, 5, 8, 4, 8, 6, 7, 2, 3],
      [6, 3, 7, 2, 9, 5, 1, 9, 8],
      [4, 9, 2, 3, 6, 7, 2, 8, 5],
      [5, 2, 9, 1, 3, 8, 6, 7, 4],
      [7, 4, 6, 2, 5, 3, 9, 6, 1],
      [3, 8, 1, 9, 7, 4, 5, 2, 8],
      [9, 6, 1, 6, 4, 2, 7, 3, 9],
      [2, 7, 5, 5, 1, 9, 4, 3, 6],
      [8, 4, 3, 7, 8, 6, 2, 1, 7]
    ]
  ];
  
  // The current puzzle index
  let currentPuzzleIndex = 0;
  let currentPuzzle = puzzles[currentPuzzleIndex];
  
  // Create the board
  function createBoard() {
    const board = document.getElementById("sudoku-board");
    board.innerHTML = "";  // Clear the previous board
  
    // Loop through the puzzle and create input fields
    for (let i = 0; i < 81; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
  
      const input = document.createElement("input");
      input.type = "number";
      input.max = 9;
      input.min = 1;
      input.id = `cell-${i}`;
  
      // If the cell is part of the puzzle (non-zero value), make it read-only
      if (currentPuzzle[row][col] !== 0) {
        input.value = currentPuzzle[row][col];
        input.classList.add("fixed");
        input.disabled = true;
      }
  
      // Append the input element to the board
      board.appendChild(input);
    }
  }
  
  // Solve the puzzle with animation
  function solveSudoku() {
    const inputs = document.querySelectorAll("#sudoku-board input");
    const solution = solutions[currentPuzzleIndex];
    let count = 0;
  
    // Animate the solution filling
    const interval = setInterval(() => {
      if (count < 81) {
        const input = inputs[count];
        const row = Math.floor(count / 9);
        const col = count % 9;
  
        if (!input.disabled) {
          input.value = solution[row][col];
          input.classList.add("solve-cell");  // Add animation class
        }
  
        count++;
      } else {
        clearInterval(interval);
        alert("Sudoku solved!");
      }
    }, 50); // Adjust speed of animation (every 50ms)
  }
  
  // Load a new random puzzle with animation
  function loadNewPuzzle() {
    const board = document.getElementById("sudoku-board");
    board.style.transform = "scale(0)";  // Shrink the board
  
    setTimeout(() => {
      currentPuzzleIndex = Math.floor(Math.random() * puzzles.length);
      currentPuzzle = puzzles[currentPuzzleIndex];
      createBoard();
  
      board.style.transform = "scale(1)";  // Scale the board back to original size
    }, 500); // Wait for the shrink animation to finish
  }
  
  // Initialize the board on page load
  window.onload = createBoard;
  