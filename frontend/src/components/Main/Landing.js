import React, {useState, useEffect} from "react";
import './Landing.css';
import Trending from '../LandingComp/Trending';
import { Link } from 'react-router-dom';

function Landing() {

    const [trending, setTrending] = useState([]);
    const [mostfavourites, setmostfavourites] = useState([]);


    useEffect(() => {
        const getTrending = async () => {
            await fetch(`http://localhost:8000/trending`, {
            method: "GET",
            headers: {
                "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
            },
            })
            .then((res) => res.json())
            .then((finalRes3) => {
                console.log(finalRes3);
                setTrending(finalRes3);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        const getMostFavourites = async () => {
            await fetch(`http://localhost:8000/mostfavourites`, {
            method: "GET",
            headers: {
                "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
            },
            })
            .then((res) => res.json())
            .then((finalRes3) => {
                console.log(finalRes3);
                setmostfavourites(finalRes3);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        getMostFavourites();
        getTrending();
    }, []);

    return (
        <div className="landing">
            <div className="banner">
                <img className="banner_img" src="https://4kwallpapers.com/images/wallpapers/gamer-quotes-dont-die-respawn-hardcore-dark-background-2880x1800-1392.png" />
            </div>
            <div style={{border: 'white'}} className="trending_">
                <h1 style={{color: 'red', marginTop: '30px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto', width: '95%'}}>Trending Now</h1>
                <div className="trendingrow">
                    {
                    trending.map(each => ( 
                        <Link to={'/game/' + each._id}>
                            <Trending image={each.imageURL} />
                        </Link>
                    ))
                    }
                </div>
            </div>

            <div style={{marginTop: '20px'}} className="mostfavs_">
                <h1 style={{color: 'red', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto', width: '95%'}}>Most Favourites</h1>
                <div className="favsrow">
                    {
                    mostfavourites.map(each => ( 
                        <Link to={'/game/' + each._id}>
                            <Trending image={each.imageURL} />
                        </Link>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Landing;
