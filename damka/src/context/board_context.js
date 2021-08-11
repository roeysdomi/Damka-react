import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client';

const BoardContext = React.createContext()

export const BoardProvider = ({ children }) => {
  let	socket = io.connect("http://localhost:4000/")
  let [sq, setsq] = useState([])
  const [solider, setsolider] = useState([])
  const [move, setmove] = useState('')
  const [player, setplayer] = useState('.')
  const [whiteplayers, setwhiteplayers] = useState(12)
  const [blackplayers, setblackplayers] = useState(12)
  const [text, setText] = useState('')
  const [lastmove, setlastmove] = useState('')
  const [countmove,setcount]=useState('')
  const [keys,setkeys]=useState('')
  return (
    <BoardContext.Provider
      value={{keys,setkeys,countmove, lastmove, setlastmove,socket,sq,setsq ,solider, setsolider,move, setmove,player, setplayer,whiteplayers, setwhiteplayers,blackplayers, setblackplayers,text, setText}}
    >
      {children}
    </BoardContext.Provider>
  )
}
// make sure use
export const useBoardContext = () => {
  return useContext(BoardContext)
}
