import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState('');

    const sendLoginInfo = async (event) => {
        const data = {
            'email': email,
            'password': password
        }
        event.preventDefault();
        await fetch('http://localhost:8000/api/user/login', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(finalRes => {
            if (!finalRes.accessToken) {
                setOpen(true);
                console.log(finalRes);
                setResponse(finalRes);
            }else{
                localStorage.setItem('Access-Token', finalRes.accessToken);
                window.location.href = "/myprofile";
            }
               
        })
        .catch(err => {
            console.log(err);
        })
    }



    return (
        <div className="Login">
            <Collapse in={open}>
                <Alert
                severity="error"
                action={
                    <CloseIcon
                    fontSize="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                    >
                    </CloseIcon>
                }
                >
                {
                    response
                }
                </Alert>
            </Collapse>
            <div className="login__container">
                <div className="container__child signup__thumbnail">
                    <div className="thumbnail__content">
                        <h1 className="heading--primary">“People who know how to make games need to start focusing on the task of making real life better for as many people as possible.”</h1>
                        <h2 className="heading--secondary">― Jane McGonigal</h2>
                    </div>
                <div className="signup__overlay"></div>
                </div>
            <div className="container__child signup__form">
            <h1 className="mainheading">Login</h1>
                <form onSubmit={sendLoginInfo}>
                    <div className="form-group-login">
                        <label>Email</label>
                        <input className="form-control" type="text" name="email" id="email" onChange={event => setEmail(event.target.value)} value={email}  placeholder="james.bond@spectre.com" required />
                    </div>
                    <div className="form-group-login">
                        <label>Password</label>
                        <input className="form-control" type="password" onChange={event => setPassword(event.target.value)} value={password}  name="password" id="password" placeholder="********" required />
                    </div>
                    <div className="m-t-lg">
                        <ul className="list-inline">
                            <li>
                                <button className="loginbtn" type="submit">Login</button>
                            </li>
                            <Link className="link" to="/register">
                                    <h4>New to Community?</h4>
                            </Link> 
                        </ul>
                    </div>
                </form>  
                </div>
            </div> 
        </div>
    )
}

export default Login;
