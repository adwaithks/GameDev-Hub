import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Link } from "react-router-dom";

function MyProfile() {
  const [mygames, setMygames] = useState([]);
  const [me, setMe] = useState([]);
  const [letter, setLetter] = useState("");
  const [myfavourites, setmyfavourites] = useState([]);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const myCreatedGames = async () => {
      await fetch("http://localhost:8000/mycreatedgames", {
        method: "GET",
        headers: {
          "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
        },
      })
        .then((res) => res.json())
        .then((finalRes) => {
          console.log(finalRes);
          setMygames(finalRes);
        })
        .catch((err) => {
          console.log(err);
          window.location.href = "/404";
        });
    };

    const myfav = async () => {
      await fetch("http://localhost:8000/myfavouritegames", {
        method: "GET",
        headers: {
          "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
        },
      })
        .then((res) => res.json())
        .then((finalRes3) => {
          console.log(finalRes3);
          setmyfavourites(finalRes3);
        })
        .catch((err) => {
          console.log(err);
          window.location.href = "/404";
        });
    };

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
          setLetter(finalRes2.username.slice(0, 1).toUpperCase());
          setMe(finalRes2);
        })
        .catch((err) => {
          console.log(err);
          window.location.href = "/404";
        });
    };
    me();
    myCreatedGames();
    myfav();
  }, [temp]);

  const removefavHandler = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:8000/${event.target.value}/removefavourite`, {
      method: "GET",
      headers: {
        "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
      },
    })
      .then((res) => res.json())
      .then((finalRes3) => {
        console.log(finalRes3);
        setTemp(Date.now());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profile">
      {(document.cookie = `token=${localStorage.getItem("Access-Token")}`)}
      <h1 className="profile__heading">MY PROFILE</h1>
      <div className="usersection">
        <div className="logo__username">
          <div className="avatar">
            <h1 style={{ color: "white" }}>{letter}</h1>
          </div>
          <h3>{me.username}</h3>
        </div>
        <div className="stats">
          <h2 style={{ marginTop: "20px", fontWeight: "800", color: "white" }}>
            STATS
          </h2>
          <div className="statsoptions">
            <p>Rating: -</p>
            <p>Created Games: {me.noOfCreatedGames}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "red",
          height: "3px",
          marginLeft: "auto",
          marginBottom: "20px",
          marginRight: "auto",
          width: "70%",
        }}
      ></div>

      <div className="gamesection">
        <div className="createdgamesRow">
          <div className="createdgame">
            <h1 style={{ color: "red" }}>Created Games</h1>
          </div>
          {mygames.map((each) => (
            <div key={each._id} className="eachgame">
              <div className="gameimg">
                <img
                  style={{
                    height: "290px",
                    width: "250px",
                    marginBottom: "20px",
                  }}
                  src={each.imageURL}
                  alt=""
                />
              </div>
              <div className="gameinfo">
                <Link className="gameinfo_link" to={"/game/" + each._id}>
                  <h1>{each.name}</h1>
                </Link>
                <h3>{each.description}</h3>
                <PlayCircleOutlineIcon className="play_btn">
                  Play
                </PlayCircleOutlineIcon>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            backgroundColor: "red",
            height: "3px",
            marginLeft: "auto",
            marginBottom: "20px",
            marginRight: "auto",
            width: "70%",
          }}
        ></div>
        <div className="favgamesRow">
          <div className="favgame">
            <h1 style={{ color: "red" }}>My Favourites</h1>
          </div>
          {myfavourites.map((each) => (
            <div key={each._id} className="faveachgame">
              <div className="favgameimg">
                <img
                  style={{
                    height: "240px",
                    width: "190px",
                    marginBottom: "20px",
                  }}
                  src={each.imageURL}
                  alt=""
                />
              </div>
              <div className="gameinfo">
                <Link className="gameinfo_link" to={"/game/" + each._id}>
                  <h1>{each.name}</h1>
                </Link>
                <h3>{each.description}</h3>
                <div>
                  <button>Play</button>
                  <button value={each._id} onClick={removefavHandler}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
