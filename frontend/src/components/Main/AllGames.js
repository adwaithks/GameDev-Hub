import React, { useState, useEffect } from 'react'
import './AllGames.css';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


function AllGames() {

    const [allGames, setAllGames] = useState([]);
    const [array, setArray] = useState(['red', 'orange', 'green', 'pink']);
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState('');
    const [temp, setTemp] = useState(0);


    useEffect(() => {
        const fetchAllGames = async () => {
            await fetch('http://localhost:8000/allgames', {
                method: 'GET'
            })
            .then(res => res.json())
            .then(finalRes => {
                console.log(finalRes);  
                setAllGames(finalRes);
            })
            .catch(err => {
                console.log(err);
            })
        }
        fetchAllGames();
        setArray(['red', 'orange', 'green', 'pink']);
        
    }, [temp]);

    const likeHandler = async (event) => {
        console.log('clicked', event.target.value);
        event.preventDefault();
        const token = localStorage.getItem('Access-Token');
        await fetch(`http://localhost:8000/${event.target.value}/like`, {
            method: 'GET',
            headers: {
                'Access-Token': 'Bearer ' + token
            }
        })
        .then(res => res.json())
            .then(finalRes => {
                console.log(finalRes);
                setTemp(Date.now());
            })
            .catch(err => {
                console.log(err);
            })
    }

    const dislikeHandler = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('Access-Token');
        await fetch(`http://localhost:8000/${event.target.value}/dislike`, {
            method: 'GET',
            headers: {
                'Access-Token': 'Bearer ' + token
            }
        })
        .then(res => res.json())
            .then(finalRes => {
                console.log(finalRes);
                setTemp(Date.now());
            })
            .catch(err => {
                console.log(err);
            })
    }

    const favHandler = async (event) => {
        event.preventDefault();
        console.log(event.target.value);
        const token = localStorage.getItem('Access-Token');
        await fetch(`http://localhost:8000/${event.target.value}/makefavourite`, {
            method: 'GET',
            headers: {
                'Access-Token': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(finalRes => {
                console.log(finalRes);
                setOpen(true);
                setResponse(finalRes);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const unfavHandler = async (event) => {
        event.preventDefault();
        console.log(event.target.value);
        const token = localStorage.getItem('Access-Token');
        await fetch(`http://localhost:8000/${event.target.value}/removefavourite`, {
            method: 'GET',
            headers: {
                'Access-Token': 'Bearer ' + token
            }
        })
        .then(res => res.json())
            .then(finalRes => {
                console.log(finalRes);
                setOpen(true);
                setResponse(finalRes);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const playHandler = (event) => {
        event.preventDefault();
        console.log('clicked', event.target.value);
        window.location.href = `/play?game=${event.target.value}`;
    }

    return (
        <div className="allgames">
            <div className="heading">
                <h1>ALL GAMES</h1>
            </div>
            <Collapse style={{position: 'fixed', zIndex: '1', top: '0', width: '100%'}} in={open}>
                <Alert
                severity="success"
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
            <div className="gamesRow">
                
            {
                allGames.map(eachGame => (
                    <div key={eachGame._id} className="game" style={{WebkitBoxShadow: `-1px 1px 36px 10px ${array[Math.floor(Math.random() * array.length)]}`}}>
                        <h2>{eachGame.name}</h2>
                        <img style={{marginTop: '20px' ,height: '250px', width: '200px'}} src={eachGame.imageURL} alt=""/>
                        <p className="description"> {eachGame.description}</p>
                        <p>Created by {eachGame.creator}</p>
                <p>{eachGame.likes} Likes</p>
                        <div className="button_group">
                            <button value={eachGame._id} onClick={likeHandler}>Like</button>  
                            <button value={eachGame._id} onClick={dislikeHandler}>Dislike</button>
                            <button value={eachGame._id} onClick={favHandler}>Fav</button>
                            <button value={eachGame._id} onClick={unfavHandler}>UnFav</button>
                            <button value={eachGame.hostURL} onClick={playHandler}>Play</button>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default AllGames
