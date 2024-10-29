# React Tic-Tac-Toe with AI

This project is an implementation of the classic Tic-Tac-Toe game using React.js, featuring an AI opponent using the minimax algorithm.

Click below to play:
https://wongcolin45.github.io/ReactTacToe/ 

## Features

- Interactive Tic-Tac-Toe game board
- Play against an AI opponent
- Ability to generate AI moves
- Game state management (win/lose/draw detection)
- Reset game functionality

## Components

### Grid

The main game component that renders the Tic-Tac-Toe board and handles game logic.

### GameOver

A component to display the game result when the game ends.

### TicTacToe.js

Contains the core game logic, including:
- `Board` class for managing the game state
- `getBestMove` function implementing the minimax algorithm for AI moves
- `gameResult` function to determine the game outcome

## How to Play

1. The game starts with an empty 3x3 grid.
2. You can choose to go first or second:
   - To make your move, simply click on an empty tile on the board.
   - To have the AI make a move, click the "generate move" button.
3. The game is flexible - you can make multiple moves in a row or let the AI make multiple moves by clicking the "generate move" button multiple times.
4. The current player's turn is tracked internally, so the correct symbol (X or O) will be placed regardless of who makes the move.
5. Use the "generate move" button whenever you want the AI to play the best possible move based on the current board state.
6. The game continues until one player wins by getting three in a row (horizontally, vertically, or diagonally) or the board is full, resulting in a draw.
7. Once the game is over, the result will be displayed.
8. Click the "reset" button at any time to start a new game.

This flexible play style allows you to:
- Play against the AI traditionally (alternating turns)
- Set up specific board states and test the AI's response
- Have the AI play against itself by repeatedly clicking "generate move"
- Take back moves by resetting and recreating the desired board state

The AI uses the minimax algorithm to determine the best move, making it a challenging opponent that plays optimally given the current board state.

## Installation

1. Clone this repository
2. Navigate to the project directory
3. Run `npm install` to install dependencies
4. Run `npm start` to start the development server

## Technologies Used

- React.js
- JavaScript (ES6+)

## Future Improvements

- Add difficulty levels for the AI
- Implement a score tracking system
- Add animations for a more engaging user experience

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.

