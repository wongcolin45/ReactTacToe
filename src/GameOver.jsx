
function GameOver(props) {
    console.log("Game over is "+props.result);
    if (props.result== null) {
        return <></>
    }
    if (props.result == "X") {
        return <h2>X is the winner!</h2>
    }else if (props.result == "O") {
        return <h2>O is the winner!</h2>
    }else {
        return <h2>Its a tie..</h2>
    }
   
}

export default GameOver;