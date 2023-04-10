import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen, fireEvent} from '@testing-library/react' // renderizar un componente y inspeccionar lo que renderizo
import LoginForm from '../components/LoginForm'
import {validateInput,sendData} from '../services/LoginForm'

import { BrowserRouter } from 'react-router-dom';
window.alert = () => {}; //empty implementation for alert 
describe('Login Component',()=>{
    beforeEach(()=>{
        global.fetch = jest.fn();
        fetch.mockClear()
    })

    describe('Login have the needed items',()=>{
        test('Login form in document', () => {


            render(
                <BrowserRouter>
                    <LoginForm/>
                </BrowserRouter>
                )
            const inputNode = screen.getByText("Username");
            const passwordNode = screen.getByText("Password");
        
            expect(inputNode).toBeInTheDocument()
            expect(passwordNode).toBeInTheDocument()
        });
        test('Button Exsits', () => {

            render(
                <BrowserRouter>
                    <LoginForm/>
                </BrowserRouter>
                )
        
            const button = screen.getByRole('button',{name:"Submit"})
            expect(button).toBeInTheDocument();
        
        });
        test('Button fires correctly', () => {

            render(
                <BrowserRouter>
                    <LoginForm/>
                </BrowserRouter>
                )
        
            const button = screen.getByRole('button',{name:"Submit"})
            fireEvent.click(button);
            const alert = screen.getByText("Warning") // empty fields must show a warning
            
            expect(alert).toBeInTheDocument();
        
        });

    })

    describe('input validates correctly',()=>{
        test('Username input is an email',() =>{
            const usernameExample = "test@test.com";
            const passwordExample = "1234";
            expect(validateInput(usernameExample,passwordExample).inputMail).toBe(false);
        })
        test('fieldd is empty',() =>{
            const usernameExample = "";
            const passwordExample = "";
            expect(validateInput(usernameExample,passwordExample).empty).toBe(false);
        })
        test('Input is valid',() =>{
            const usernameExample = "username";
            const passwordExample = "1234";
            let validated = validateInput(usernameExample,passwordExample)
            
            expect(validated.empty && validated.inputMail).toBe(true);
        })
        
    })

    describe('request receives status',()=>{
        test('fetch receives http status connected', async ()=>{

            fetch.mockReturnValueOnce(
                Promise.resolve({
                    json: () => Promise.resolve({status:200,info:"token..."})
                })
            );
              
 
            const res = await sendData({
                name: "test",
                password: "Foobar--1"
            })
            
            expect(res.info.status).toBe(200);
            
        }
        )
        test('fetch receives http status incorrect username or password', async ()=>{
            fetch.mockReturnValueOnce(
                Promise.resolve({
                  json: () => Promise.resolve({
                    status: 400,
                    detail:'Incorrect username or password'
                })
                })
              )
            const dataUser = {
                name: "ariel",
                password: "Foobar--11"
            }
            const res = await sendData(dataUser)
        
            expect(res.info.status).toBe(400);
            
        }
        )

        test('fetch receives http status not validated', async ()=>{
            fetch.mockReturnValueOnce(
                Promise.resolve({
                  json: () => Promise.resolve({
                    status: 403,
                    detail:'User not validated'
                }),
                })
              )
            const dataUser = {
                name: "ariel",
                password: "Foobar--11"
            }
            const res = await sendData(dataUser)
        
            expect(res.info.status).toBe(403);
            
        }
        )
    })
})


