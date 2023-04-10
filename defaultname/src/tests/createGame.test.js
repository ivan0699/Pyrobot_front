import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react' // renderizar un componente y inspeccionar lo que renderizo
import {CreateGame} from '../components/createGame'


import { createMatch } from '../services/createGame';

window.alert = () => {}; //empty implementation for alert 
describe('Login Component',()=>{
    beforeEach(()=>{
        global.fetch = jest.fn();
        fetch.mockClear()
    })

    describe('Create Game the needed items',()=>{
        test('Create form exists', () => {

 
            render(<CreateGame/>)
            const inputName = screen.queryByPlaceholderText("Match Name");
            const inputPassword = screen.queryByPlaceholderText("Password");
            const inputgames = screen.getByTestId("games");
            const inputrounds = screen.getByTestId("rounds");
            const inputMaxPlayer = screen.getByTestId("max");
            const inputMinPlayer = screen.getByTestId("min");
            const inputRobot = screen.getByTestId("droprobot")
            const buttonSumbit = screen.getByRole('button',{name:"Create"})
            var elements = elements = [inputName,inputPassword,inputgames,inputrounds,inputMaxPlayer,inputMinPlayer,inputRobot,buttonSumbit]

            elements.forEach((elem)=>{
                expect(elem).toBeInTheDocument
            })
        });
        


    })


    describe('request receives status',()=>{
        test('Match info is correct', async ()=>{
            const matchArg =     
                {name:"example",
                games: 1,
                rounds: 1,
                num_players_min:2,
                num_players_max:4,
                owner_robot : "String"
                }
            fetch.mockReturnValueOnce(
                Promise.resolve({
                    json: () => Promise.resolve({
                        status:201,
                        response:{
                            room_id: 0,
                            match_id: 0
                          }}
                        )
                })
            );
              
 
            const res = await createMatch(matchArg.name, matchArg.password, matchArg.games, matchArg.rounds, matchArg.num_players_min,matchArg.num_players_max,'' )
    
            
            expect(res.info.status).toBe(201);
            
        }
        )
        test('User unauthorized', async ()=>{
            
            fetch.mockReturnValueOnce(
                Promise.resolve({
                    json: () => Promise.resolve({status:401,detail: "Could not validate credentials"})
                })
            );
              
 
            const res = await createMatch()
    
            
            expect(res.info.status).toBe(401);
            
        }
        )

    })
})


