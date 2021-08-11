import React,{useState,useEffect,useRef} from 'react';
import '../css/main.css'
import Board from '../components/board'
import {useBoardContext} from '../context/board_context'
import io from 'socket.io-client';



const Main=()=>
{
  const {whiteplayers, setwhiteplayers,blackplayers, setblackplayers,player,setplayer,text, setText}=useBoardContext()




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
                <div onClick={()=>{
                  let	sh = io.connect("http://localhost:4000")
                  sh.emit("message", "shittttttttttttttttt")

                }} className="blackp"></div>
               <div onClick={()=>{setplayer("black")}} className="blackp"></div>
               <div onClick={()=>{setplayer("white")}} className="whitep"></div>

             </div>
           </div>
         </div>

       </div>


  )

}
export default Main
