import Square from '../components/square'
import {useBoardContext} from '../context/board_context'



const createkeys=()=>
{
  let keys1=[];
  for (let i = 0; i < 8; i++) {
    for (let z = 0; z < 8; z++) {
         let k= i+"+"+z
         keys1.push(k)



    }
  }
  return keys1
}


const changelocright=(move,currentboard,whiteplayers, setwhiteplayers,blackplayers, setblackplayers)=>
{



  let sq4=currentboard;
  // if(!sq4){console.log("emptyyyyy");return currentboard;}
// if(!currentboard["0+0"]){console.log("currentboard is empty")}

  if(move.right&&move.right.from)
  {
    console.log("entered loc right ")
     const spli=move.right.from.split('')
     const loc=spli[0]+"+"+spli[1]
     const orginalid=sq4[loc].props.id

     const id ="b0"
     sq4[loc]=<Square key={loc} id={id} k={loc} glow="false" />

    const spli2=move.right.to.split('')
    const loc2=spli2[0]+"+"+spli2[1]
    sq4[loc2]=<Square key={loc2} id={orginalid} k={loc2} glow="false" />

    if(move.right&&move.right.eat)
    {
      const t =move.right.eat.split('')
      const v=sq4[t[0]+"+"+t[1]].props.id.split('')[1]
      console.log("this is v" +v)
       if(v==="2")
       {
         setblackplayers(blackplayers-1)
       }
       if(v==="1")
       {
         setwhiteplayers(whiteplayers-1)
       }
      const spli3=move.right.eat.split('')
      const loc3=spli3[0]+"+"+spli3[1]
      sq4[loc3]=<Square key={loc3} id={"b0"} k={loc3} glow="false" />
    }
    return sq4;
  }

}
const changelocleft=(move,currentboard,whiteplayers, setwhiteplayers,blackplayers, setblackplayers)=>
{

  let sq4=currentboard;
if(!sq4["0+0"]){console.log("emptyyyyy")}
if(!currentboard["0+0"]){console.log("currentboard is empty")}

  if(move.left&&move.left.from)
  {
    console.log("entered loc left ")
     const spli=move.left.from.split('')
     const loc=spli[0]+"+"+spli[1]
     const orginalid=sq4[loc].props.id

     const id ="b0"
     sq4[loc]=<Square key={loc} id={id} k={loc} glow="false" />

    const spli2=move.left.to.split('')
    const loc2=spli2[0]+"+"+spli2[1]
    sq4[loc2]=<Square key={loc2} id={orginalid} k={loc2} glow="false" />

    if(move.left&&move.left.eat)
    {
        const t =move.left.eat.split('')
        const v=sq4[t[0]+"+"+t[1]].props.id.split('')[1]
         if(v==="2")
         {
           setblackplayers(blackplayers-1)
         }
         if(v==="1")
         {
           setwhiteplayers(whiteplayers-1)
         }
      const spli3=move.left.eat.split('')
      const loc3=spli3[0]+"+"+spli3[1]
      sq4[loc3]=<Square key={loc3} id={"b0"} k={loc3} glow="false" />
    }
    return sq4;
  }

}

const soliderSelected=(solider,currentboard)=>
{

  let keys=createkeys()

  let sg4=[]
   keys.map(g=>{
           let r=<Square  key={currentboard[g].key} k={currentboard[g].props.k} id={currentboard[g].props.id} glow="true"/>
          if(currentboard[g].props.k!==solider)
            {
              r=<Square  key={currentboard[g].key} k={currentboard[g].props.k} id={currentboard[g].props.id} glow="false"/>

            }
            sg4[g]=r
       })

   return sg4

}

const calcMoveBlack=(currentboard,solider)=>
{
    let mov =solider.split('')
    let row=mov[0]

    let col=mov[2]
    let toleft;
    let toright;
    let eatright;
    let eatleft;
    if(row==="0"){

      return {right:{from :row+col,to:toright,eat:eatright},left:{from :row+col,to:toleft,eat:eatleft}}
    }

  if(col==="0")
  {
     let checkcol=parseInt(col)
     let checkrow=parseInt(row)
     let rightnext=currentboard[(checkrow-1)+"+"+(checkcol+1)].props.id
     let rightnextnext=currentboard[(checkrow-2)+"+"+(checkcol+2)].props.id

     if(rightnext==="b0")
     {

        toright=(checkrow-1).toString()+(checkcol+1).toString()
     }
     if(rightnext==="b1")
     {
       if(rightnextnext==="b0")
        {
          eatright=(checkrow-1).toString()+(checkcol+1).toString()
          toright=(checkrow-2).toString()+(checkcol+2).toString()
        }
     }
  }
  if(col==="7")
  {
    let checkcol=parseInt(col)
    let checkrow=parseInt(row)
    let leftnext=currentboard[(checkrow-1)+"+"+(checkcol-1)].props.id
    let leftnextnext=currentboard[(checkrow-2)+"+"+(checkcol-2)].props.id

    if(leftnext==="b0")
    {

       toleft=(checkrow-1).toString()+(checkcol-1).toString()
    }
    if(leftnext==="b1")
    {
      if(leftnextnext==="b0")
       {
         eatleft=(checkrow-1).toString()+(checkcol-1).toString()
         toleft=(checkrow-2).toString()+(checkcol-2).toString()
       }
    }
  }
  if(col!=="0"&&col!=="7")
  {
    let checkcol=parseInt(col)
    let checkrow=parseInt(row)
    let rightnext=currentboard[(checkrow-1)+"+"+(checkcol+1)].props.id
    let leftnext=currentboard[(checkrow-1)+"+"+(checkcol-1)].props.id
    let rightnextnext;
    let leftnextnext
     if(currentboard[(checkrow-2)+"+"+(checkcol+2)]){
       rightnextnext=currentboard[(checkrow-2)+"+"+(checkcol+2)].props.id
    }
    if(currentboard[(checkrow-2)+"+"+(checkcol-2)]){
      leftnextnext=currentboard[(checkrow-2)+"+"+(checkcol-2)].props.id
    }
    if(rightnext==="b0")
    {

       toright=(checkrow-1).toString()+(checkcol+1).toString()
    }
    if(rightnext==="b1"&&rightnextnext)
    {
      if(rightnextnext==="b0")
       {
         eatright=(checkrow-1).toString()+(checkcol+1).toString()
         toright=(checkrow-2).toString()+(checkcol+2).toString()
       }
    }
    if(leftnext==="b0")
    {

       toleft=(checkrow-1).toString()+(checkcol-1).toString()
    }
    if(leftnext==="b1"&&leftnextnext)
    {
      if(leftnextnext==="b0")
       {
         eatleft=(checkrow-1).toString()+(checkcol-1).toString()
         toleft=(checkrow-2).toString()+(checkcol-2).toString()
       }
    }
  }
  ////-------------------------------
   const z={right:{from :row+col,to:toright,eat:eatright},left:{from :row+col,to:toleft,eat:eatleft}}
  console.log(z)
   return z


}
const calcMoveWhite=(currentboard,solider)=>
{
    let mov =solider.split('')
    let row=mov[0]

    let col=mov[2]
    let toleft;
    let toright;
    let eatright;
    let eatleft;
    if(row==="7"){

      return {right:{from :row+col,to:toright,eat:eatright},left:{from :row+col,to:toleft,eat:eatleft}}
    }

  if(col==="0")
  {
     let checkcol=parseInt(col)
     let checkrow=parseInt(row)
     let rightnext=currentboard[(checkrow+1)+"+"+(checkcol+1)].props.id
     let rightnextnext=currentboard[(checkrow+2)+"+"+(checkcol+2)].props.id

     if(rightnext==="b0")
     {

        toright=(checkrow+1).toString()+(checkcol+1).toString()
     }
     if(rightnext==="b2")
     {
       if(rightnextnext==="b0")
        {
          eatright=(checkrow+1).toString()+(checkcol+1).toString()
          toright=(checkrow+2).toString()+(checkcol+2).toString()
        }
     }
  }
  if(col==="7")
  {
    let checkcol=parseInt(col)
    let checkrow=parseInt(row)
    let leftnext=currentboard[(checkrow+1)+"+"+(checkcol-1)].props.id
    let leftnextnext=currentboard[(checkrow+2)+"+"+(checkcol-2)].props.id

    if(leftnext==="b0")
    {

       toleft=(checkrow-1).toString()+(checkcol-1).toString()
    }
    if(leftnext==="b2")
    {
      if(leftnextnext==="b0")
       {
         eatleft=(checkrow+1).toString()+(checkcol-1).toString()
         toleft=(checkrow+2).toString()+(checkcol-2).toString()
       }
    }
  }
  if(col!=="0"&&col!=="7")
  {
    let checkcol=parseInt(col)
    let checkrow=parseInt(row)
    let rightnext=currentboard[(checkrow+1)+"+"+(checkcol+1)].props.id
    let leftnext=currentboard[(checkrow+1)+"+"+(checkcol-1)].props.id
    let rightnextnext;
    let leftnextnext
     if(currentboard[(checkrow+2)+"+"+(checkcol+2)]){
       rightnextnext=currentboard[(checkrow+2)+"+"+(checkcol+2)].props.id
    }
    if(currentboard[(checkrow+2)+"+"+(checkcol-2)]){
      leftnextnext=currentboard[(checkrow+2)+"+"+(checkcol-2)].props.id
    }
    if(rightnext==="b0")
    {

       toright=(checkrow+1).toString()+(checkcol+1).toString()
    }
    if(rightnext==="b2"&&rightnextnext)
    {
      if(rightnextnext==="b0")
       {
         eatright=(checkrow+1).toString()+(checkcol+1).toString()
         toright=(checkrow+2).toString()+(checkcol+2).toString()
       }
    }
    if(leftnext==="b0")
    {

       toleft=(checkrow+1).toString()+(checkcol-1).toString()
    }
    if(leftnext==="b2"&&leftnextnext)
    {
      if(leftnextnext==="b0")
       {
         eatleft=(checkrow+1).toString()+(checkcol-1).toString()
         toleft=(checkrow+2).toString()+(checkcol-2).toString()
       }
    }
  }
  ////-------------------------------
   const z={right:{from :row+col,to:toright,eat:eatright},left:{from :row+col,to:toleft,eat:eatleft}}
  console.log(z)
   return z


}
export {changelocright,changelocleft,soliderSelected,calcMoveBlack,calcMoveWhite};
