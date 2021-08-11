import React, {useState, useEffect} from 'react';
import '../css/board.css'
import Square from './square'
import {useBoardContext} from '../context/board_context'
import {changelocright,changelocleft,soliderSelected,calcMoveBlack,calcMoveWhite} from '../functions/board_func'
const boardstart=
[
  ["w0","b1","w0","b1","w0","b1","w0","b1"],
  ["b1","w0","b1","w0","b1","w0","b1","w0"],
  ["w0","b1","w0","b1","w0","b1","w0","b1"],
  ["b0","w0","b0","w0","b0","w0","b0","w0"],
  ["w0","b0","w0","b0","w0","b0","w0","b0"],
  ["b2","w0","b2","w0","b2","w0","b2","w0"],
  ["w0","b2","w0","b2","w0","b2","w0","b2"],
  ["b2","w0","b2","w0","b2","w0","b2","w0"]
]
let test=true
let lastdate;
const keys=[]
const sq2 =[]
const changeboard = (setkeys) => {
   if(keys.length==64){return}
  for (let i = 0; i < 8; i++) {
    for (let z = 0; z < 8; z++) {
         let k= i+"+"+z
         keys.push(k)

         sq2[k]=<Square  key={k} k={k} id={boardstart[i][z]} glow="false" />

    }
  }

   return sq2
}
const Board = () => {

let {sq,setsq,solider,setsolider,move, setmove}=useBoardContext()
let {whiteplayers, setwhiteplayers,blackplayers, setblackplayers}=useBoardContext()
let {player, socket}=useBoardContext()
let {lastmove, setlastmove}=useBoardContext()
const [fakeCurrentDate, setFakeCurrentDate] = useState(new Date())

useEffect(() => {
    setTimeout(() => setFakeCurrentDate(new Date()), 500)
}, [fakeCurrentDate])


  useEffect(()=>{
    console.log("first rendring")
      changeboard()
    setsq(sq2)

  },[])

  useEffect(()=>{

console.log(player)
  },[player])
  socket.on('message', (data) => {
     if(player!=='.'&&data.player!==player)
     {
        if(data.date!==lastmove.date&&data.date!==lastdate)
        {
          console.log(JSON.stringify(data))
            setlastmove(data)
            lastdate=data.date
            console.log("changelast mode:"+data.player +"to current player:"+ player)
        }

     }
  })

  useEffect(()=>{
    console.log("this is lastmove:"+JSON.stringify(lastmove))
     if(lastmove.moveleft&&lastmove.moveleft.from)
     {

        let mov2={left:lastmove.moveleft}
        console.log("this is left:"+JSON.stringify(mov2))
       const d=changelocleft(mov2,sq,whiteplayers, setwhiteplayers,blackplayers, setblackplayers)
       setsq(d)

     }
     if(lastmove.moveright&&lastmove.moveright.from)
     {
       let mov2={right:lastmove.moveright}
        console.log("this is right:"+JSON.stringify(mov2))
       const d=changelocright(mov2,sq,whiteplayers, setwhiteplayers,blackplayers, setblackplayers)
       setsq(d)

     }


  },[lastmove])



 useEffect(()=>{
   console.log("players status  black:"+blackplayers+"white:"+whiteplayers)
   if(sq["0+0"]){
    let color=sq[solider].props.id.split('')
     if(color[0]==="w"){return}
     color=color[1]
    let entered=false;

    if(move&&move.right.to){
      if(!move.right.to){}
       console.log("current move :"+move.right.to)
       console.log("current solider :"+solider)
      let mov =move.right.to.split('')
      mov = mov[0]+"+"+mov[1]

      if(mov===solider)
      {
           console.log("changed soldier to right")
         const d=changelocright(move,sq,whiteplayers, setwhiteplayers,blackplayers, setblackplayers)
         setsq(d)
         const w=soliderSelected(solider,d)
        setsq(w)
        let z = new Date();
        z= z.getTime();
        socket.emit("message",{date:z,player:player,moveright:move.right} )
        setmove()

         entered=true
      }
    }
    if(move&&move.left.to&&!entered){
      if(!move.left.to){return}
      console.log("current move :"+move.left.to)
      console.log("current solider :"+solider)
      let mov =move.left.to.split('')
      mov = mov[0]+"+"+mov[1]

      if(mov===solider)
      {
        console.log("changed soldier to left")

           const d=changelocleft(move,sq,whiteplayers, setwhiteplayers,blackplayers, setblackplayers)
           setsq(d)
           const w=soliderSelected(solider,d)
          setsq(w)
          let z = new Date();
          z= z.getTime();
          socket.emit("message",{date:z,player:player,moveleft:move.left} )
           setmove()
           entered =true
      }
    }

   if(!entered){
   if(color==="2"){
     setmove(calcMoveBlack(sq,solider))
   }
   if(color==="1"){
     setmove(calcMoveWhite(sq,solider))
   }
   const d=soliderSelected(solider,sq)
  setsq(d)
   }
}
 },[solider])


  return (<div className="board">
    {
        keys.map(g=>{
           return sq[g]
         })
    }

  </div>)
}


export default Board
