import React from 'react'
import Die from './Die'

import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import Confetti from 'react-confetti'

export default function App() {
   const [dice, setDice] = React.useState(allNewDice())
   const [tenzises, setTenzies] = React.useState(false)

   React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('You won')   
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
  
  return (
    <main>
      {tenzises && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instuctions">Roll until all dice are the same. Click each die to freeze it all its current value between rolls</p>
      <div className="container">
       {diceElements}
      </div>
      <button onClick={rollDice}>{tenzises ? "New Game" :'Roll' }</button>
    </main>
  )
}