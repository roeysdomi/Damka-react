import React,{useState,useEffect} from 'react';
import '../css/square.css'
import {useBoardContext} from '../context/board_context'

const Square =(prop)=>
{
  let {solider, setsolider,setsq,sq}=useBoardContext()
  return (
    <div onClick={()=>{setsolider(prop.k)}} className="con-square" id={prop.id} k={prop.k}  glow={prop.glow}>
      <div className="circle"></div>
    </div>
  )

}
export default Square
