import React,{useState,useEffect,useRef} from 'react';
import '../css/main.css'
import Board from '../components/board'
import {useBoardContext} from '../context/board_context'
import io from 'socket.io-client';

const checkwin=(whiteplayers,blackplayers,setText)=>
{
  if(whiteplayers>blackplayers)
   {setText("White player won")}
  else if(whiteplayers<blackplayers)
    {setText("Black player won")}
    else {
        setText('no one won')
    }
}


const Main=()=>
{

  const {whiteplayers, setwhiteplayers,blackplayers, setblackplayers,player,setplayer,text, setText,socket}=useBoardContext()

 useEffect(()=>{



 },[])


  return (

       <div className="main">
         <div className="con-top">
           <div className="top">DAMKA-Adipolo</div>
           <div className="status">Black:{blackplayers} , White:{whiteplayers}</div>
         </div>
         <div className="bottom">

              <Board />

           <div className="right-menu">
              <div className="title">choose player:{player}</div>
             <div className="choose">

               <div onClick={()=>{setplayer("black")}} className="blackp"></div>
               <div onClick={()=>{setplayer("white")}} className="whitep"></div>

             </div>
             {text}
             <div onClick={()=>{checkwin(whiteplayers,blackplayers,setText)}} className="checkwin">Check winner</div>
           </div>
         </div>

       </div>


  )

}
export default Main
