import React, { useEffect, useState } from 'react';



function MainGame(){


  const [tiles, setTiles] = useState([
    {uid: '1', id: '1', text: '🎃', matching: false},
    {uid: '11', id: '1', text: '🎃', matching: false},
    {uid: '2', id: '2', text: '🤖', matching: false},
    {uid: '22', id: '3', text: '👾', matching: false},
    {uid: '3', id: '2', text: '🤖', matching: false},
    {uid: '33', id: '3', text: '👾', matching: false},
    {uid: '4', id: '4', text: '👽', matching: false},
    {uid: '44', id: '5', text: '🤡', matching: false},
    {uid: '5', id: '5', text: '🤡', matching: false},
    {uid: '55', id: '4', text: '👽', matching: false},
    {uid: '6', id: '6', text: '👻', matching: false},
    {uid: '66', id: '6', text: '👻', matching: false},  
  ])

  const [choiceOne, setchoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  let [time , setTime] = useState(0)
  let [score, setScore] = useState(1)




  useEffect(() => {

  if(choiceOne && choiceTwo){
    if((choiceOne.id === choiceTwo.id) && (choiceOne.uid !== choiceTwo.uid)){
          setTiles(prevcard => {
            return prevcard.map(card => {
              if(card.id === choiceOne.id){
                setScore(score + 1)
                console.log(score)
                return {...card, matching: true}
              } else {
                return card
              }
            })
          })
          ResetTurn()
        } else {
          ResetTurn()
        }

      
      
        if(score === 6){
          console.log("win")
         setTimeout(() => {
          window.location.reload()
          setTime(0)
         }, 2000)
        }

        
         
      }


     

    }, [choiceOne, choiceTwo])

  

   
    const StartTime = () => {
      setInterval(() => {
        setTime(time => time + 1)
      }, 1000)

      
    
    }

    const SetGame = () => {

    
     
     setTiles(prevcard => {
      prevcard.sort(() => Math.random() -0.5)
     })
      
      setchoiceOne(null)
      setChoiceTwo(null)


      const RemoveList = tiles.map(card => {
        if(choiceOne === null && choiceTwo === null){
          return {...card, matching: false}
            
          
        }
      })

      
     StartTime()
      
    
      setTiles(RemoveList)

      

    

    }

    const HandleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setchoiceOne(card)

    }


    const ResetTurn = () => {
      setchoiceOne(null)
      setChoiceTwo(null)
     
    
    }

    
    


  

   

    
    const TiliesElement = tiles.map(card => {
      return <TilieComponent flliped={card === choiceOne || card === choiceTwo || card.matching} HandleChoice={HandleChoice} card={card} />
    })

   
    return(
        
      <div className='web-app-grid-container'>
        <header className='header'>
        <h1 className='web-app-title'>Memory Game</h1>
        <p className='time-info'>time:</p>
        <p className='text-time'>{time}</p>
        </header>
       <div className='btn-section'>
       <button onClick={SetGame} className='btn-game'>Start game</button>
       </div>
     
        
        <div className='card-box'>
            {TiliesElement}
        </div>
        <footer className='footer'>
          <p className='footer-text'>Created by: <a href='https://gabrieldev.gabrys564.repl.co/'>GabrielDev.repl.co/</a></p>
        </footer>
      </div>
    )
}


function TilieComponent(props){

  return(
    <div onClick={() => props.HandleChoice(props.card)} className={`none ${props.flliped ? 'active' : ''}`} key={props.card.id}><p>{props.card.text}</p></div>
  )
}






export default MainGame