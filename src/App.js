import React from 'react'
import Die from './Die'

import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  
  const [dice, setDice] = React.useState(allNewDice())
  
  const [game, setGame] = React.useState(false)
  const [practice, setPractice] = React.useState(true)
  const [records, setRecords] = React.useState(false)

  const [timer, setTimer] = React.useState(false)
  
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
  function makeAllwhite() {
    setDice(allNewDice())
  }
  
  function practiceMode() {
      setDice(allNewDice())
      rollDice()
      setPractice(true)
      setGame(false)
      setRecords(false)
  }
  
  function gameMode() {
      setPractice(false)
      setRecords(false)
      setGame(true)
      setDice(allNewDice())
      rollDice()
  }

  function recordsMode() {
    setRecords(true)
    setPractice(false)
    setGame(false)
  }

  function rollDice() {   
    if (!tenzises) {
      if(game) {
        setTimer(true)
      }
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
      {game && !records && <h3>Here timer</h3>}
      {!records &&<div className="container">
       {diceElements}
      </div>}
      {!records && <button onClick={rollDice}>{nameBtn()}</button>}
      
      <div className='Navbar'>
        <ul>
          <li onClick={practiceMode} className={practice? 'active': ''} ><a className='navbar-icon' href='#'>Practice</a></li>
          <li onClick={gameMode} className={game? 'active': ''}><a className='navbar-icon' href='#'>Game</a></li>
          <li onClick={recordsMode} className={records? 'active': ''}><a className='navbar-icon' href='#'>Records</a></li>
        </ul>
      </div>
    
    </main>
  )
}