import React, { useState, useEffect } from "react";
import "./AllGames.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Markdown from "markdown-to-jsx";
import { Link } from "react-router-dom";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GetAppIcon from "@material-ui/icons/GetApp";

function AllGames() {
  const [allGames, setAllGames] = useState([]);
  //const [collapseState, setCollapseState] = useState('success');
  //const [liked, setLiked] = useState(false);
  //const [likeState, setLIkeState] = useState('Like');
  //const [fav, setFav] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  //const [favState, setFavState] = useState('Fav');
  //const [open, setOpen] = useState(false);
  //const [response, setResponse] = useState('');
  //const [temp, setTemp] = useState(0);

  useEffect(() => {
    const fetchAllGames = async () => {
      await fetch("http://localhost:8000/allgames", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((finalRes) => {
          console.log(finalRes);
          setAllGames(finalRes);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAllGames();
  }, []);

  /**const getAGame = async (event) => {
        event.preventDefault();
        await fetch(`http://localhost:8000/game/${event.target.value}`, {
            method: 'GET',
            headers: {
                'Access-Token': 'Bearer ' + localStorage.getItem('Access-Token')
            }
        })
        .then(res => res.json())
            .then(finalRes => {
                console.log(finalRes);
                setgameId(event.target.value);
            })
            .catch(err => {
                console.log(err);
            })
    }**/

  const visitProfile = async (author) => {
    const me = async () => {
      await fetch("http://localhost:8000/api/user/me", {
        method: "GET",
        headers: {
          "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
        },
      })
        .then((res) => res.json())
        .then((finalRes2) => {
          console.log(finalRes2);
          if (finalRes2.username) {
            setIsAuth(true);
          } else {
            setIsAuth(false);
          }
        })
        .catch((err) => {
          setIsAuth(false);
          console.log(err);
        });
    };
    me();
    if (isAuth) {
      window.location.href = "http://localhost:3000/myprofile";
    } else {
      window.open(`http://localhost:3000/profile/${author}`, "_blank");
    }
  };

  const gameExplore = (id) => {
    window.location.href = `http://localhost:3000/game/${id}`;
  };

  const playHandler = async (id) => {
    await fetch(`http://localhost:8000/game/getready/${id}`, {
      method: "GET",
      headers: {
        "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
      },
    })
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes);
        window.location.href = `/play?game=${finalRes}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="allgames">
      <h1
        style={{
          color: "white",
          fontSize: "30px",
          textAlign: "center",
          marginTop: "150px",
          fontWeight: "400",
        }}
      >
        ALL GAMES
      </h1>
      <div className="gamesRow">
        {allGames.map((eachGame) => (
          <div key={eachGame._id} className="game">
            <h2 className="heading">{eachGame.name}</h2>

            <div
              className="author_info"
              onClick={() => {
                visitProfile(eachGame.creator);
              }}
            >
              <div
                style={{
                  borderRadius: "50%",
                  backgroundColor: "orange",
                  height: "40px",
                  width: "40px",
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontSize: "30px",
                    fontWeight: "400",
                  }}
                >
                  {eachGame.creator.slice(0, 1).toUpperCase()}
                </p>
              </div>
              <p style={{ color: "white", fontSize: "15px" }}>
                @{eachGame.creator}
              </p>
            </div>
            <div className="image">
              {eachGame.imageURL.includes("http") ? (
                <img
                  style={{
                    height: "250px",
                    width: "200px",
                    marginTop: "-18px",
                    marginLeft: "50px",
                  }}
                  src={eachGame.imageURL}
                  alt=""
                />
              ) : (
                <div
                  style={{
                    backgroundColor: "black",
                    height: "250px",
                    width: "200px",
                    marginTop: "-18px",
                    marginLeft: "50px",
                    border: "solid white 1px",
                  }}
                ></div>
              )}
            </div>
            <p className="author">
              Created by{" "}
              <Link
                style={{ color: "red" }}
                to={"/profile/" + eachGame.creator}
              >
                {eachGame.creator}
              </Link>
            </p>
            <div className="descriptionContainer">
              <p className="description">
                <Markdown>{eachGame.description}</Markdown>
              </p>
              <div className="tagContainer">
                <div className="category">
                  <p>{eachGame.category[0]}</p>
                </div>
                <div className="platform">
                  <p>{eachGame.platform[0]}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                gameExplore(eachGame._id);
              }}
              className="explore"
            >
              Explore
            </button>
            <div className="button_group">
              <GetAppIcon className="thumbsup" />
              <p className="likes">{eachGame.downloads}</p>
              <ThumbUpAltIcon className="thumbsup" />
              <p className="likes">{eachGame.likes}</p>
              <ThumbDownAltIcon className="thumbsup"></ThumbDownAltIcon>
              <p className="likes">{eachGame.dislikes}</p>
              <FavoriteIcon className="thumbsup"></FavoriteIcon>
              <p className="likes">{eachGame.favourites}</p>
              <PlayCircleOutlineIcon
                className="playbtn"
                onClick={() => playHandler(eachGame._id)}
              >
                Play
              </PlayCircleOutlineIcon>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllGames;
