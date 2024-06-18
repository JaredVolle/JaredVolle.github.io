import React from 'react';
import './App.css'; 

export default function App() {
  const [displayLetters, setDisplayLetters] = React.useState("");
  const [isEasyDifficulty, setIsEasyDifficulty] = React.useState(true);
  const [team1Score, setTeam1Score] = React.useState(0);
  const [team2Score, setTeam2Score] = React.useState(0);
  const [player1Turn, setPlayer1Turn] = React.useState(true);
  const [roundNum, setRoundNum] = React.useState(1);
  const [displayRules, setDisplayRules] = React.useState(false);

  const [playingWithTimer, setPlayingWithTimer] = React.useState(false);
  const [timer, setTimer] = React.useState(10);
  const [isTimerStarted, setIsTimerStarted] = React.useState(false);
  const [timerLength, setTimerLength] = React.useState(10);

  React.useEffect(() => {
    if (isTimerStarted) {
      const intervalId = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 0) {
            clearInterval(intervalId);
            setIsTimerStarted(false);
          }
          return prevTimer > 0 ? prevTimer - 1 : 0;
        });
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isTimerStarted]);

  function handleAddLetter() {
    setTimer(timerLength);
    setIsTimerStarted(true);

    let newDisplayLetters = displayLetters;

    const randomLetterArr = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
      'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'
    ];
    
    const easyLetterArr = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
      'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U'
    ];

    let letterArr = isEasyDifficulty ? easyLetterArr : randomLetterArr;
    let randNum = Math.floor(Math.random() * letterArr.length);
    let newLetter = letterArr[randNum];
    newDisplayLetters = displayLetters + newLetter;
    setDisplayLetters(newDisplayLetters);
  }

  function resetGame() {
    setDisplayLetters("");
    setTeam1Score(0);
    setTeam2Score(0);
    setRoundNum(1);
    setPlayer1Turn(true);
    setTimer(timerLength);
    setIsTimerStarted(false);
  }

  function endTurn() {
    if (displayLetters.length > 1) {
      player1Turn ? setTeam1Score(team1Score + displayLetters.length - 1) : setTeam2Score(team2Score + displayLetters.length - 1);
    }
    setPlayer1Turn(!player1Turn);
    setDisplayLetters("");
    setRoundNum(player1Turn ? roundNum : roundNum + 1);
    setTimer(timerLength);
    setIsTimerStarted(false);
  }

  const containerStyle = {
    textAlign: 'center',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: player1Turn ? '#448da3' : '#e86b6b',
    color: 'white',
    padding: '20px',
    borderRadius: '10px'
  };

  function handleLearnRules() {
    setDisplayRules(!displayRules);
  }

  const rulesMessage = "At the start of the game, you'll have only one letter. Your team must think of a word that has the letter. EX: A --> 'back'. If you can think of a word, click next letter. Now you'll have A + a new letter, such as 'H'. Now you must think of a word that has both A & H in it, such as 'has'. The turn ends when you cannot think of a word that contains all the letters. You'll receive points for each letter you successfully used and it becomes the other team's turn. DIFFICULTY: Easy mode does not have Q, W, X, Y, Z. Learn more at Guys With Games: https://www.youtube.com/watch?v=ikJ_Z1RQe24";

  return (
    <div className="container" style={containerStyle}>
      <h1>Spelling Showdown</h1>
      <h2>Round: {roundNum}</h2>

      <div className="scoreboard">
        <div className="score-item">
          <h2>Blue Team</h2>
        </div>
        <div className="score-item">
          <h2>Red Team</h2>
        </div>
        <div className="score-item">
          <h2>{team1Score}</h2>
        </div>
        <div className="score-item">
          <h2>{team2Score}</h2>
        </div>
      </div>

      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            checked={isEasyDifficulty}
            onChange={() => setIsEasyDifficulty(true)}
          />
          Easy Letters
        </label>
        <label>
          <input
            type="radio"
            checked={!isEasyDifficulty}
            onChange={() => setIsEasyDifficulty(false)}
          />
          Random Letters
        </label>
        <label>
          <input 
            type="checkbox"
            checked={playingWithTimer}
            onChange={() => setPlayingWithTimer(!playingWithTimer)}
            name="playWithTimerBtn"
          />Play With Timer
        </label>
        {playingWithTimer && (
          <select onChange={(e) => setTimerLength(parseInt(e.target.value))} value={timerLength}>
            <option value="10">10 seconds</option>
            <option value="15">15 seconds</option>
            <option value="30">30 seconds</option>
          </select>
        )}
      </div>

      <div className="buttons">
        <button className="add-button" onClick={handleAddLetter}>Next letter</button>
        <button className="end-button" onClick={endTurn}>End Turn</button>
      </div>

      <h1 className="display-letters">{displayLetters}</h1>
      <div className="display-timer">{playingWithTimer && <h2>Time Remaining: {timer}</h2>}</div>
      <button className="reset-button" onClick={resetGame}>Reset game</button>
      <button className="reset-button" onClick={handleLearnRules}>Learn The Rules</button>
      <div className="display-rules">{displayRules && <h2 className="rules-message">{rulesMessage}</h2>}</div>
    </div>
  );
}
