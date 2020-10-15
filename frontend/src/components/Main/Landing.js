import React, { useState, useEffect } from "react";
import "./Landing.css";
import Trending from "../LandingComp/Trending";
import { Link } from "react-router-dom";
import banner_img from "../../assets/bannerimg.png";

function Landing() {
  const [trending, setTrending] = useState([]);
  const [mostfavourites, setmostfavourites] = useState([]);
  const [upcomingreleases, setupcomingreleases] = useState([]);

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
    };

    const getReleases = async () => {
      await fetch(`http://localhost:8000/myschedules`, {
        method: "GET",
        headers: {
          "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
        },
      })
        .then((res) => res.json())
        .then((finalRes3) => {
          console.log(finalRes3);
          setupcomingreleases(finalRes3);
        })
        .catch((err) => {
          console.log(err);
        });
    };

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
    };
    getReleases();
    getMostFavourites();
    getTrending();
  }, []);

  return (
    <div className="landing">
      <div className="banner">
        <img className="banner_img" src={banner_img} />
      </div>
      <div style={{ border: "white" }} className="trending_">
        <h1
          style={{
            color: "red",
            marginTop: "30px",
            marginBottom: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "95%",
          }}
        >
          Trending Now
        </h1>
        <div className="trendingrow">
          {trending.map((each) => (
            <Link
              style={{ textDecoration: "none", color: "darkgray" }}
              to={"/game/" + each._id}
            >
              <Trending image={each.imageURL} />
              <h3>{each.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      <div className="trending_">
        <h1
          style={{
            color: "red",
            marginTop: "30px",
            marginBottom: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "95%",
          }}
        >
          Upcoming Releases
        </h1>
        <div className="upcomingreleases">
          {upcomingreleases.map((each) => (
            <Link
              style={{ textDecoration: "none", color: "darkgray" }}
              to={"/game/" + each._id}
            >
              <div className="upcoming">
                <img
                  style={{
                    textAlign: "center",
                    borderRadius: "50%",
                    height: "250px",
                    width: "250px",
                  }}
                  className="upcoming_img"
                  src={each.imageURL}
                />
                <div className="textContain">
                    <h3 style={{ textAlign: "center", marginLeft: "-20px" }}>
                    {each.name}
                    </h3>
                    <p style={{ textAlign: "center", marginLeft: "0px" }}>
                    Releasing on {each.release}
                    </p>
                </div>
                
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div
        style={{ marginTop: "20px", marginBottom: "80px" }}
        className="mostfavs_"
      >
        <h1
          style={{
            color: "red",
            marginBottom: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "95%",
          }}
        >
          Most Favourites
        </h1>
        <div className="favsrow">
          {mostfavourites.map((each) => (
            <Link
              style={{ textDecoration: "none", color: "darkgray" }}
              to={"/game/" + each._id}
            >
              <Trending image={each.imageURL} />
              <h3>{each.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
