import React from 'react'
import Die from './Die'

import { nanoid } from 'nanoid'
import { useStopwatch } from 'react-timer-hook';
import Confetti from 'react-confetti'

function MyStopwatch(props) {
  const {
    seconds,
    minutes,
    start,
    pause
  } = useStopwatch({ autoStart: true });

  function handlingZeroes(a) {
    if(a < 10) {
      return '0' +  a
    }else {
      return a
    }
  }
  
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '5rem'}}>
        <span>{handlingZeroes(minutes)}</span>:<span>{handlingZeroes(seconds)}</span>
      </div>
    </div>
  );
}


export default function App() {
  
  const [dice, setDice] = React.useState(allNewDice())
  
  const [gamePage, setGamePage] = React.useState(false)
  const [gameStarted, setGameStarted] = React.useState(false)
  
  const [practice, setPractice] = React.useState(true)
  const [records, setRecords] = React.useState(false)
  
  const [tenzises, setTenzies] = React.useState(false)


  React.useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)
  if (allHeld && allSameValue) {
        setTenzies(true)
  }
}, [dice])

  function generateNewDice() {
    return (
      {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    )
  }

  function allNewDice () {
    
    const newDice = []
    for (let i =0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice
  }
  
  function practiceMode() {
      setDice(allNewDice())
      forBtnRoll()
      setPractice(true)
      setGamePage(false)
      setRecords(false)
      setGameStarted(false)
    }
    
    function gameMode() {
      setPractice(false)
      setRecords(false)
      setGamePage(true)
      setDice(allNewDice())
      forBtnRoll()
      setTenzies(false)
    }
    
    function recordsMode() {
      setGameStarted(false)
      setRecords(true)
      setPractice(false)
      setGamePage(false)
      setTenzies(false)
    }
    
    function forBtnRoll() {
      if(gamePage) {
        setGameStarted(true)
        if(gameStarted) {
          rollDice()   
        }
    }else {
      rollDice()
    }
  }


  function rollDice() {
      if (!tenzises) {
        setDice(oldDice => oldDice.map(die => {
          return die.isHeld ?
          die:
          generateNewDice() 
        }))
      }else {
        setTenzies(false)
        setDice(allNewDice())
      }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die =>{
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }
  const diceElements = dice.map(die => (
    <Die key={die.id}  value = {die.value} isHeld = {die.isHeld} holdDice={() => holdDice(die.id)}/>
    ))

    function nameBtn() {
      if(gamePage) {
        if(gameStarted) {
          if(tenzises) {
            return 'New Game'
          }else {
            return "Roll"
          }
        }if(!gameStarted) {
          return "Start"
        }
      }
      if(tenzises) {
        return 'New Game'
      }else {
        return "Roll"
      }
    }
  
  return (
    <main>
      {tenzises && <Confetti/>}
      <div className='main-div'>
        {practice && <h1 className="title">Tenzies</h1>}
        {practice && <p className="instuctions">Roll until all dice are the same. Click each die to freeze it all its current value between rolls</p>}
      </div>
      {practice && !records && <h3>Practice</h3>}
      {gamePage && gameStarted && <MyStopwatch/>}

      {gamePage && !gameStarted && 
      <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '5rem'}}>
        <span>00</span>:<span>00</span>
      </div>
    </div> }
      {!records &&<div className="container">
       {diceElements}
      </div>}
      {!records && <button onClick={forBtnRoll} >{nameBtn()}</button>}
      
      <div className='Navbar'>
        <ul>
          <li onClick={practiceMode} className={practice? 'active': ''} ><a className='navbar-icon' href='#'>Practice</a></li>
          <li onClick={gameMode} className={gamePage? 'active': ''}><a className='navbar-icon' href='#'>Game</a></li>
          <li onClick={recordsMode} className={records? 'active': ''}><a className='navbar-icon' href='#'>Records</a></li>
        </ul>
      </div>
    
    </main>
  )
}