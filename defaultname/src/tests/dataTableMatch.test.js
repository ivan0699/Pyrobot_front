import '@testing-library/jest-dom/extend-expect'
import {render,act} from '@testing-library/react' // renderizar un componente y inspeccionar lo que renderizo
import {DataTableMatchs} from '../components/DatatableMatchs'


import { getMatchs } from '../services/MatchService.js';
const exMatch = [
    {
      "name": "felix",
      "games": 2,
      "rounds": 115,
      "num_players_min": 2,
      "num_players_max": 2,
      "id": 1,
      "player_count": 1,
      "owner": "ariel",
      "robots": [
        {
          "name": "Default1",
          "avatar": null,
          "owner_name": "ariel",
          "owner_avatar": null,
          "stats": {
            "matches_won": 2,
            "matches_played": 5
          }
        }
      ]
    },
    {
      "name": "reg",
      "games": 25,
      "rounds": 423,
      "num_players_min": 2,
      "num_players_max": 2,
      "id": 2,
      "player_count": 1,
      "owner": "ariel",
      "robots": [
        {
          "name": "Default1",
          "avatar": null,
          "owner_name": "ariel",
          "owner_avatar": null,
          "stats": {
            "matches_won": 2,
            "matches_played": 5
          }
        }
      ]
    },
    {
      "name": "string",
      "games": 200,
      "rounds": 10000,
      "num_players_min": 4,
      "num_players_max": 4,
      "id": 3,
      "player_count": 1,
      "owner": "ariel",
      "robots": [
        {
          "name": "Default1",
          "avatar": null,
          "owner_name": "ariel",
          "owner_avatar": null,
          "stats": {
            "matches_won": 2,
            "matches_played": 5
          }
        }
      ]
    }
  ]
  
window.alert = () => {}; //empty implementation for alert 
describe('dataTable Component',()=>{
    beforeEach(()=>{
        global.fetch = jest.fn();
        fetch.mockClear()
    })


    test('data table renders', async () => {
        fetch.mockReturnValueOnce(
            Promise.resolve({
                json: () => Promise.resolve(exMatch)
            })
        );
        await act(async() => {
            render(<DataTableMatchs spawnJoin={''} /> )
          });
       
        // expect(getByText('the lion king')).toBeInTheDocument()


    });


    describe('request receives status',()=>{
        test('fetch receives the data from matchs correctly', async ()=>{

            fetch.mockReturnValueOnce(
                Promise.resolve({
                    json: () => Promise.resolve({status:200,response:exMatch})
                })
            );
              
 
            const res = await getMatchs()
    
            
            expect(res.status).toBe(200);
            
        }
        )

    })
})


