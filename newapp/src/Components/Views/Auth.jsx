import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Auth.css';


export function Auth() {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    // const [auth, setAuth] = useState('');
    const nav = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePassChange(e) {
        setPass(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001", { method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            pass:  pass
         })
        })
        const res  = await response.json();

        if(res.message === 'the user exist') {
            localStorage.setItem('session', 'user Logged in');
            nav('/notebook');
        }
        else {
            console.log('enter valid credentials')
        }
        
    }

    return (
        <>
            <div id='auth' className="container-fluid d-flex align-item-center justify-content-center">
                <form id='form' onSubmit={handleSubmit}>  
                    <div className="row">
                    <h3 className='text-center mb-4'>Welcome</h3>
                        <div className="col-12 my-2">
                            <label className=''>
                                Email ID: {' '}
                            </label>
                                <input type="text" className='form-control' placeholder='Enter your email' autoComplete='false' onChange={handleEmailChange}/>
                        </div>
                        <div className="col-12 my-2">
                            <label>
                                Password: {' '}
                            </label>
                                <input type="text" className='form-control' placeholder='Enter your password' autoComplete='false' onChange={handlePassChange}/>
                        </div>
                        <div className="col-12 my-2 text-end">
                            <a href="abc">Create an account</a>
                        </div>
                        <div className="col-12 my-2 text-center">
                            <input className='btn btn-outline-light' type="submit" value="Login" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}