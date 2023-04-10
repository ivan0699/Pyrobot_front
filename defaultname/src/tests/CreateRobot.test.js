import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react' // renderizar un componente y inspeccionar lo que renderizo
import {RobotForm} from '../components/CreateRobot';


import {sendRobot} from '../services/CreateRobot';

  
window.alert = () => {}; //empty implementation for alert 
describe('robotForm Component',()=>{
    beforeEach(()=>{
        global.fetch = jest.fn();
        fetch.mockClear()

        
    })


    test('create robot form exists', async () => {

    
            render(<RobotForm/> )
            const inputName = screen.queryByText("Robot Name")
            const inputCode = screen.queryByTestId("code")
            const uploadNode = screen.queryByTestId("upload")
            const uploadButton = screen.getByRole('button',{name:"Upload"})
            var element = [inputName, inputCode, uploadNode,uploadButton]
            element.forEach((elem)=>{
                expect(elem).toBeInTheDocument
            }) 
    
       
        // expect(getByText('the lion king')).toBeInTheDocument()


    });
    test('fetch receives the data from matchs correctly', async ()=>{
        const fakeData = {
            name: '',
            code: '',
            avatar: {
                ext: '',
                content: ''
            }
        }
        fetch.mockReturnValueOnce(
            Promise.resolve({
                json: () => Promise.resolve({status:201,response:{}})
            })
        );
          
        
        const res = await sendRobot(fakeData)

        
        expect(res.status).toBe(201);
        
    }
    )


})


