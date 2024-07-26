
import React, {useState, useEffect} from 'react';
import {Board, getBestMove, gameResult} from './TicTacToe.js'
import GameOver from './GameOver.jsx';


function Grid() {
    const [values, setValues] = useState(Array(9).fill(" ")); 
    const [turn, setTurn] = useState("X");

    const changeTurn = () => {
        setTurn(prevTurn => (prevTurn == "X") ? "O" : "X")
    }

    const handleGenerateMove = () => {
       
        if (gameResult(values) == null) {
            const maximizingPlayer = (turn == 'X') ? true : false;
            const bestMove = getBestMove(values, maximizingPlayer) - 1;
            handleClick(bestMove);
        }
    }

    
    const handleClick = (index) => {
        if (values[index] == " " && gameResult(values) == null) {
          
            
            setValues((prev) => {
                const newValues = [...prev];
                newValues[index] = turn;
                return newValues;
            })
            changeTurn();
            
        }
    }

    const handleResetClick = () => {
        setValues(Array(9).fill(" "))
        setTurn(prevTurn => "X");
    }

    function renderTile(index) {
        return <button className="tile"
                       key = {index}
                       onClick={()=>handleClick(index)}>
                        {values[index]}
                       </button>
    }
    
    
    return (
        <>
                    
            <div className="grid">
                <div className="row">
                    {renderTile(0)} 
                    {renderTile(1)} 
                    {renderTile(2)} 
                </div>
                <br></br>  
                <div className="row">
                    {renderTile(3)} 
                    {renderTile(4)} 
                    {renderTile(5)} 
                </div> 
                <br></br> 
                <div className="row">
                    {renderTile(6)} 
                    {renderTile(7)} 
                    {renderTile(8)} 
                </div>  

            </div>
           


            <button className="button"
                    onClick = {handleGenerateMove}>generate move</button>
            <button className="button"
                    onClick={handleResetClick}>reset</button>
            
            <GameOver result={gameResult(values)} winner={"yes"}/>
        </>
            
        
    )
}

export default Grid;