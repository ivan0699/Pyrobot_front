export async function getSimulation(roundsNumber, robots){

  const settings = {
      method: 'POST',
      headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("UserT")}`,
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
        rounds: roundsNumber,
        robots_names: robots
      })
  };

  try {
      const fetchResponse = await fetch('http://127.0.0.1:8000/simulation/create', settings); //fetch with settings
      const data = await fetchResponse.json();
      const status = await fetchResponse.status;
      console.log(status);
      console.log(data);
      return data;
  } catch (e) {
      return e;
  }    
}
export function positionPair (cantRobots, rounds, infoRounds){
    const path = new Array()
    for(let i = 0 ; i < cantRobots; i++){
      var coord = new Array()
      for(let j = 0 ; j < rounds ; j++){
          let pair = infoRounds[j][i].position // get round_j robot_i pair cords
          coord.push(pair);
      }
      path.push(coord); //push coordinate player0,...,n
    }
    return path;

}
export function roundDamage (cantRobots, rounds, infoRounds){
    const damage = new Array();
    for(let i = 0 ; i < cantRobots; i++){
            var damageRound = new Array()
            for(let j = 0 ; j < rounds ; j++){
                let pair = infoRounds[j][i].damage // get round_j robot_i pair cords
                damageRound.push(pair);
            }
            damage.push(damageRound); //push coordinate player0,...,n
        }
    return damage;
}
export function missilesPosition (cantRobots, rounds, infoRounds){
  const missiles = new Array();


 
      
      for(let i = 0 ; i < rounds ; i++){ // rounds 
          var missileRound = new Array()
          let pairMissile;


          if(infoRounds[i].length !=0){ // if missile found in round i
            let cantMissiles = infoRounds[i].length
            for(let j=0; j<cantMissiles ; j++){ // from 0...j to cant missiles in that round
              pairMissile ={
                pair:infoRounds[i][j].position,
                active:infoRounds[i][j].is_active
              }
              missileRound.push(pairMissile); // push pair
            }
          }
          else{
              pairMissile ={
                pair:'',
                active:''
              }
          }

        missiles.push(missileRound); //push the whole qty of pairs
          
      }

      
      console.log("estos fueron los misiles por robot   ",missiles);
  return missiles;
}

function draw(terrainContext,x,y,img,width,height){
  
  terrainContext.drawImage(img, x, y, width, height);
  
  // terrainContext.font = "40pt Calibri";
  // terrainContext.fillText("My TEXT!", 20, 20);
}

let animate;

export const pause = () => {
  clearInterval(animate)
}

export const resume = (robotPath, initPos, damageR, terrainContext, rounds, cantRobots, updateBar, winner) => {
  InitSimulation(robotPath, initPos, damageR, terrainContext, rounds, cantRobots, updateBar, winner)
}
export function InitSimulation(robotPath, initPos, damageR, terrainContext, rounds, cantRobots, updateBar, winner, missiles){
   // invert y axis

  console.log("lo setee una vez")
  var currentRound=JSON.parse(localStorage.getItem("simRound")); //round setter
  currentRound = currentRound - 1;
  // var cords = new Array();
  // for(let i=0; i<cantRobots; i++){
  //   cords.push(robotPath[i][currentRound])
  // }

  
  const img = new Image()
  img.src = require('./exro.png')

  const imgCannon = new Image()
  imgCannon.src=require('./cannon.png')

  const imgExplosion = new Image()
  imgExplosion.src = require('./explosion.png')

  const imageGround = new Image();
  imageGround.src = require("../services/battle.png")
  var patternGround = terrainContext.createPattern(imageGround,'repeat');

  const triangleRobot0 = new Image()
  triangleRobot0.src= require('../style/red.png')

  const triangleRobot1 = new Image()
  triangleRobot1.src= require('../style/green.png')

  const triangleRobot2 = new Image()
  triangleRobot2.src= require('../style/yellow.png')

  const triangleRobot3 = new Image()
  triangleRobot3.src= require('../style/blue.png')
  const robotTriangles = [triangleRobot0,triangleRobot1,triangleRobot2,triangleRobot3]  
  animate = setInterval(function(){ 

      terrainContext.fillStyle=patternGround;
      terrainContext.fillRect(0,0,1000,1000); // clean and redraw
      updateBar(damageR,cantRobots,winner,rounds);
      //draw
      for (let i = 0; i<cantRobots; i++){
        

        let x = initPos[i][0]
        let y = initPos[i][1]
        terrainContext.beginPath();

        img.onload = draw(terrainContext, x, y,img,40,40)
        img.onload = draw(terrainContext, x+8, y+40,robotTriangles[i],24,24);

        let cantMissiles = missiles[currentRound].length
        for(let j=0; j<cantMissiles;j++){
  
          let xCannon = missiles[currentRound][j].pair[0]
          let yCannon = missiles[currentRound][j].pair[1]
     
          if(missiles[currentRound][j].active){

            imgCannon.onload = draw(terrainContext, xCannon, yCannon,imgCannon,30,30)
          }
          else{
            imgExplosion.onload = draw(terrainContext, xCannon, yCannon,imgExplosion,50,50)
          }


        }
        
        terrainContext.closePath();
       
        

        
    }
      currentRound+=1; //next round
      initPos=[];
      for (let i = 0 ; i < cantRobots ; i++){
        initPos.push(robotPath[i][currentRound]) // next round player i
      }
      localStorage.setItem("lastPosition",JSON.stringify(initPos));
      if(currentRound==rounds-1){
          clearInterval(animate);
      }

  },150)
}

