
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImage=[
  {"src":"/img/helmet-1.png",matched:false  },
  {"src":"/img/potion-1.png",matched:false},
  {"src":"/img/ring-1.png",matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png",matched:false},
  {"src":"/img/sword-1.png",matched:false}
]



function App() {

const [cards,setCards]=useState([]);
const [turns,setTurns]=useState(0);
const [choiceOne,setChoiceOne]=useState(null)
const [choiceTwo,setChoiceTwo]=useState(null)
const [disabled,setDisabled]=useState(false)
  // shuffle cards 

const shuffleCards=()=>{
  const shuffledCards=[...cardImage,...cardImage]
  .sort(()=>Math.random()-0.5)
  .map((res)=>({...res,id:Math.random()}))
  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(shuffledCards)
  setTurns(0)
}
//handle a choice
const handleChoice=(card)=>{
  choiceOne ? setChoiceTwo(card):setChoiceOne(card)
}

// compare 2 selected cards

useEffect(()=>{

if(choiceOne&&choiceTwo){
  setDisabled(true)
  if(choiceOne.src===choiceTwo.src){
   setCards(prevCards=>{
     return prevCards.map(res=>{
       if(res.src===choiceOne.src){
         return {...res,matched:true}
       }
       else{
         return res
       }
     })
   })
    resetTurn()
  }
  else {
   
   setTimeout(()=>resetTurn(),750) 
  }
}

},[choiceOne,choiceTwo])
console.log(cards)
//reset choice increase turn

const resetTurn=()=>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns=>prevTurns+1)
  setDisabled(false)
}


useEffect(()=>{
  shuffleCards()
},[])
  return (
    <div className="App">
    <h1>Magic Match</h1>
    <button onClick={shuffleCards}>New Game</button>

    <div className="card-grid">
      {
        cards.map(card=>(
          <SingleCard  
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card===choiceOne||card===choiceTwo||card.matched}
          disabled={disabled}
          />
          
        ))
      }
      </div>
      <h3>Turns:{turns}</h3>
    </div>
  );
}

export default App;
