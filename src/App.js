
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getImage } from './redux/GameSlice';


function App() {
const dispatch=useDispatch();
const item=useSelector(state=>state.game.newImage)
const [cards,setCards]=useState([]);
const [point,setPoints]=useState(0);
const [choiceOne,setChoiceOne]=useState(null)
const [choiceTwo,setChoiceTwo]=useState(null)
const [disabled,setDisabled]=useState(false)
  // shuffle cards 

const shuffleCards=()=>{
  dispatch(getImage())
  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(item)
  setPoints(0)
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
    setPoints(prevPoints=>prevPoints+50)
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
   setPoints(prevPoints=>prevPoints-20)
  }
}

},[choiceOne,choiceTwo])

//reset choice increase turn

const resetTurn=()=>{
  setChoiceOne(null)
  setChoiceTwo(null)
  
  setDisabled(false)
}


useEffect(()=>{
  shuffleCards()
},[]
)



  return (


    <div className="App">
    <h1>Memory Game</h1>
    <button onClick={shuffleCards}>New Game</button>
    <h3>Point:{point}</h3>
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
    
     
   
    </div>

   
  );
}

export default App;
