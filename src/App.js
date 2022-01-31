import React from 'react'
import Die from './Die'
import Navbar from './Navbar'

import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  
  const [dice, setDice] = React.useState(allNewDice())
  
  const [game, setGame] = React.useState(false)
  
  
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
  function gameStarted() {
    game = true
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
      if(tenzises) {
        return 'New Game'
      }else {
        return "Roll"
      }
    }
  
  return (
    <main>
      {tenzises && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instuctions">Roll until all dice are the same. Click each die to freeze it all its current value between rolls</p>
      {<h3>Practice</h3>}
      {/* {gameStarted && <h3>{}</h3>} */}
      <div className="container">
       {diceElements}
      </div>
      <button onClick={rollDice}>{nameBtn()}</button>
      < Navbar/>
    </main>
  )
}