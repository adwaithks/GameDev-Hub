import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

function MyProfile() {
  const [mygames, setMygames] = useState([]);
  const [me, setMe] = useState([]);
  const [otherinfoexpanded, setOtherinfoexpanded] = useState(false);
  const [letter, setLetter] = useState("");
  const [createdgamesexpanded, setCreatedgamesexpanded] = useState(false);
  const [myfavsexpanded, setMyfavsexpanded] = useState(false);
  const [myfavourites, setmyfavourites] = useState([]);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const myCreatedGames = async () => {
      await fetch("http://localhost:5000/proxy/mycreatedgames", {
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
          localStorage.removeItem("Access-Token");
          window.location.href = "/login";
        });
    };

    const myfav = async () => {
      await fetch("http://localhost:5000/proxy/myfavouritegames", {
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
          localStorage.removeItem("Access-Token");
          window.location.href = "/login";
        });
    };

    const me = async () => {
      await fetch("http://localhost:5000/api/user/me", {
        method: "GET",
        headers: {
          "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
        },
      })
        .then((res) => res.json())
        .then((finalRes2) => {
          console.log("me::::" + finalRes2.username);
          setLetter(finalRes2.username.slice(0, 1).toUpperCase());
          setMe(finalRes2);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("Access-Token");
          window.location.href = "/login";
        });
    };
    me();
    myCreatedGames();
    myfav();
  }, [temp]);

  const logoutHandler = () => {
    localStorage.removeItem("Access-Token");
    window.location.href = "/login";
  };

  const removefavHandler = async (event) => {
    event.preventDefault();
    await fetch(
      `http://localhost:5000/proxy/${event.target.value}/removefavourite`,
      {
        method: "GET",
        headers: {
          "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
        },
      }
    )
      .then((res) => res.json())
      .then((finalRes3) => {
        console.log(finalRes3);
        setTemp(Date.now());
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("Access-Token");
        window.location.href = "/login";
      });
  };

  const playHandler = (id) => {
    window.open(`http://localhost:3000/play?game=${id}`, "_blank");
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
        <div className="otherInfoHeading">
          <h2 style={{ color: "red", fontWeight: "400" }}>Other Info</h2>
          <KeyboardArrowDownIcon
            onClick={() => {
              setOtherinfoexpanded(!otherinfoexpanded);
            }}
          />
        </div>
        {otherinfoexpanded ? <div className="otherinfoexpanded">
          <div className="upcomingPayments">

          <h3 style={{fontWeight: '400'}}>Upcoming Payments: </h3><h1 style={{fontWeight: '400'}}>${me.upcomingPayments}</h1>

          </div>
        </div> : null}

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
        <div className="createdgamesRow">
          <div className="createdgame">
            <h2 style={{ color: "red", fontWeight: "400" }}>Created Games</h2>
            <KeyboardArrowDownIcon
              onClick={() => {
                setCreatedgamesexpanded(!createdgamesexpanded);
              }}
            />
          </div>
          {createdgamesexpanded ? (
            <div className="createdgamesSection">
              {mygames.map((each) => (
                <div key={each._id} className="eachgame">
                  <div className="gameimg">
                    <img
                      style={{
                        height: "260px",
                        width: "240px",
                        marginBottom: "10px",
                      }}
                      src={each.imageURL}
                      alt=""
                    />
                  </div>
                  <div className="gameinfo">
                    <Link className="gameinfo_link" to={"/game/" + each._id}>
                      <h2>{each.name}</h2>
                    </Link>
                    <h3>{each.description}</h3>
                    <PlayCircleOutlineIcon
                      className="play_btn"
                      onClick={() => {
                        playHandler(each._id);
                      }}
                    >
                      Play
                    </PlayCircleOutlineIcon>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
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
            <h2 style={{ color: "red", fontWeight: "400" }}>My Favourites</h2>
            <KeyboardArrowDownIcon
              onClick={() => {
                setMyfavsexpanded(!myfavsexpanded);
              }}
            />
          </div>
          {myfavsexpanded ? (
            <div className="favgamessection">
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
                      <h2>{each.name}</h2>
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
          ) : null}
        </div>
      </div>
      <div style={{width: "fit-content", marginLeft: "auto", marginRight: "auto"}}>
      <button onClick={logoutHandler} className="logout">Logout</button>

      </div>
    </div>
  );
}

export default MyProfile;
