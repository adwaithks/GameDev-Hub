import React, { useEffect, useState } from "react";

function OtherProfile() {
  const [mygames, setMygames] = useState([]);
  const [me, setMe] = useState([]);
  const [letter, setLetter] = useState("");
  const [myfavourites, setmyfavourites] = useState([]);

  useEffect(() => {
    const author = window.location.href.split("/")[4];
    console.log(author);
    const myCreatedGames = async () => {
      await fetch(`http://localhost:8000/${author}/createdgames`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((finalRes) => {
          setMygames(finalRes);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const myfav = async () => {
      await fetch(`http://localhost:8000/${author}/favouritegames`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((finalRes3) => {
          //console.log(finalRes3);
          setmyfavourites(finalRes3);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const me = async () => {
      await fetch(`http://localhost:8000/profile/${author}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((finalRes2) => {
          console.log(finalRes2);
          if (finalRes2.message === "User does not exist") {
            window.location.href = "http://localhost:3000/404";
          }
          setLetter(finalRes2.username.slice(0, 1).toUpperCase());
          setMe(finalRes2);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    me();
    myCreatedGames();
    myfav();
  }, []);

  return (
    <div className="profile">
      <h1 className="profile__heading">@{me.username} PROFILE</h1>
      <div className="usersection">
        <div className="logo__username">
          <div className="avatar">
            <h1>{letter}</h1>
          </div>
          <h3>{me.username}</h3>
        </div>
        <div className="stats">
          <h2 style={{ marginTop: "20px", fontWeight: "800" }}>STATS</h2>
          <div className="statsoptions">
            <p>Rating: -</p>
            <p>Created Games: {me.noOfCreatedGames}</p>
            <p>Popularity: -</p>
            <p>Signal: -</p>
          </div>
        </div>
      </div>
      <div className="gamesection">
        <div className="createdgamesRow">
          <div className="createdgame">
            <h1>Created Games</h1>
          </div>
          {mygames.map((each) => (
            <div key={each._id} className="eachgame">
              <div className="gameimg">
                <img
                  style={{ height: "240px", width: "190px" }}
                  src={each.imageURL}
                  alt=""
                />
              </div>
              <div className="gameinfo">
                <h1>{each.name}</h1>
                <h3>{each.description}</h3>
                <button>Play</button>
              </div>
            </div>
          ))}
        </div>
        <div className="createdgamesRow">
          <div className="createdgame">
            <h1>My Favourites</h1>
          </div>
          {myfavourites.map((each) => (
            <div key={each._id} className="eachgame">
              <div className="gameimg">
                <img
                  style={{ height: "240px", width: "190px" }}
                  src={each.imageURL}
                  alt=""
                />
              </div>
              <div className="gameinfo">
                <h1>{each.name}</h1>
                <h3>{each.description}</h3>
                <button>Play</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OtherProfile;
