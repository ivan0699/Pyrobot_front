import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react' // renderizar un componente y 
import {getRobots} from '../services/getRobots'
import {getSimulation} from '../services/SimulationService'
import {Board} from '../components/Board'
import {Simulation} from '../components/simulationForm'
window.alert = () => {}; //empty implementation for alert 

const robot = {
  "name": "Default1",
  "avatar": null,
  "owner_name": "ariel2",
  "owner_avatar": null,
  "matches_winned": 0,
  "matches_played": 0
}
const simulatedRobots = [
  [
    {
      "robots": [
        {
          "damage": 0,
          "direction": 90,
          "velocity": 50,
          "position": [
            81,
            402
          ],
          "scanner_direction": 90,
          "scanner_resolution": 10
        },
        {
          "damage": 0,
          "direction": 225,
          "velocity": 80,
          "position": [
            192,
            600
          ],
          "scanner_direction": 225,
          "scanner_resolution": 10
        }
      ],
      "missiles": []
    }
  ],
  {
    "winner": null
  }
]
const DataSimulation ={
  robots:['Default1','Default2'],
  rounds:1
}
describe("Simulation Board",()=>{

    beforeEach(()=>{
        global.fetch = jest.fn();
        fetch.mockClear()
    })
    test('renders board canvas well', ()=>{

        render( <Board DataSimulation={DataSimulation}/>)
        const canvasElement = screen.getByTestId("canvas")
        expect(canvasElement).toBeInTheDocument()


    })
    test('The form for create the simulation exists', ()=>{

      render( <Simulation/>)
      const inputRounds = screen.getByTestId("roundsSlider")
      const dropRobot0 = screen.getByTestId("dropdown0")
      const dropRobot1 = screen.getByTestId("dropdown1")
      const dropRobot2 = screen.getByTestId("dropdown2")
      const dropRobot3 = screen.getByTestId("dropdown3")
      const submitButton = screen.getByTestId("button")
      var elements = [inputRounds, dropRobot0, dropRobot1, dropRobot2, dropRobot3,submitButton]
      elements.forEach((elem)=>{
        expect(elem).toBeInTheDocument()
      })
      


  })
    describe("simulation needed values",()=>{
      
      test('robots are correctly get it',async ()=>{

        fetch.mockReturnValueOnce(
          Promise.resolve({
            json: () => Promise.resolve(robot),
          })
        )
      const res = await getRobots()
      
      expect(res).toBe(robot)

      })

      test('simulation is get it correctly',async ()=>{

        fetch.mockReturnValueOnce(
          Promise.resolve({
            json: () => Promise.resolve(simulatedRobots),
          })
        )
      const res = await getSimulation(1,['Default1','Default2'])
      
      expect(res).toBe(simulatedRobots)

      })

      test('only one robot was passed',async ()=>{

        fetch.mockReturnValueOnce(
          Promise.resolve({
            json: () => Promise.resolve({detail:'Add at least one more robot'}),
          })
        )
      const res = await getSimulation(1,['Default1'])
      
      expect(res.detail).toBe('Add at least one more robot')

      })

    })


})