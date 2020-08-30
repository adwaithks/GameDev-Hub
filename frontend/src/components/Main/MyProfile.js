import React, { useEffect, useState } from 'react';
import './MyProfile.css';

function MyProfile() {

    const [mygames, setMygames] = useState([]);
    const [me, setMe] = useState([]); 
    const [letter, setLetter] = useState('');
    const [myfavourites, setmyfavourites] = useState([]);
    const [temp, setTemp] = useState(0);



    useEffect(() => {
        const myCreatedGames = async () => {
            await fetch('http://localhost:8000/mycreatedgames', {
                method: 'GET',
                headers: {
                    'Access-Token': 'Bearer ' + localStorage.getItem('Access-Token')
                }
            })
            .then(res => res.json())
            .then(finalRes => {
                console.log(finalRes);
                setMygames(finalRes);         
            })
            .catch(err => {
                console.log(err);
            })
            }

            const myfav = async () => {
                await fetch('http://localhost:8000/myfavouritegames', {
                method: 'GET',
                headers: {
                    'Access-Token': 'Bearer ' + localStorage.getItem('Access-Token')
                }
                })
                .then(res => res.json())
                .then(finalRes3 => {
                    console.log(finalRes3);
                    setmyfavourites(finalRes3);
                })
                .catch(err => {
                    console.log(err);
                })
            }

            const me = async () => {
                await fetch('http://localhost:8000/api/user/me', {
                    method: 'GET',
                    headers: {
                        'Access-Token': 'Bearer ' + localStorage.getItem('Access-Token')
                    }
                })
                .then(res => res.json())
                .then(finalRes2 => {
                    console.log(finalRes2);
                    setLetter(finalRes2.username.slice(0,1).toUpperCase())
                    setMe(finalRes2);         
                })
                .catch(err => {
                    console.log(err);
                })
                }
            me();
            myCreatedGames();
            myfav();
        
    }, [temp])

    const removefavHandler = async (event) => {
        await fetch(`http://localhost:8000/${event.target.value}/removefavourite`, {
                method: 'GET',
                headers: {
                    'Access-Token': 'Bearer ' + localStorage.getItem('Access-Token')
                }
                })
                .then(res => res.json())
                .then(finalRes3 => {
                    console.log(finalRes3);
                    setTemp(Date.now());
                })
                .catch(err => {
                    console.log(err);
                })
    }

    return (
        <div className="profile">
            <h1 className="profile__heading">MY PROFILE</h1>
            <div className="usersection">
                <div className="logo__username">
                    <div className="avatar">
                        <h1>{letter}</h1>
                    </div>
                        <h3>{me.username}</h3>
                </div>
            </div>
            <div className="gamesection">
                <div className="createdgamesRow">
                    <div className="createdgame">
                        <h1>Created Games</h1>
                    </div>
                    {
                        mygames.map(each => (
                            <div key={each._id} className="eachgame">
                                <div className="gameimg">
                                    <img style={{height: '240px', width: '190px'}} src={each.imageURL} alt=""/>
                                </div>
                                <div className="gameinfo">
                                    <h1>{each.name}</h1>
                                    <h3>{each.description}</h3>
                                    <button>Play</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="createdgamesRow">
                    <div className="createdgame">
                        <h1>My Favourites</h1>
                    </div>
                    {
                        myfavourites.map(each => (
                            <div key={each._id} className="eachgame">
                                <div className="gameimg">
                                    <img style={{height: '240px', width: '190px'}} src={each.imageURL} alt=""/>
                                </div>
                                <div className="gameinfo">
                                    <h1>{each.name}</h1>
                                    <h3>{each.description}</h3>
                                    <button>Play</button>
                                    <button value={each._id} onClick={removefavHandler}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MyProfile
