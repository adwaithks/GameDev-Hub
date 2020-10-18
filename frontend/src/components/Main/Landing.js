import React, { useState, useEffect } from "react";
import "./Landing.css";
import Trending from "../LandingComp/Trending";
import { Link } from "react-router-dom";
import banner_img from "../../assets/bannerimg.png";

function Landing() {
  const [trending, setTrending] = useState([]);
  const [mostfavourites, setmostfavourites] = useState([]);
  const [upcomingreleases, setupcomingreleases] = useState([]);
  const [trailers, setTrailers] = useState([]);

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

    const getTrailers = async () => {
      await fetch(`http://localhost:8000/teasers`, {
        method: "GET",
        headers: {
          "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
        },
      })
        .then((res) => res.json())
        .then((finalRes3) => {
          setTrailers(finalRes3);
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
    getTrailers();
    getMostFavourites();
    getTrending();
  }, []);

  return (
    <div className="landing">
      <div className="banner">
        <img alt="bannerimg" className="banner_img" src={banner_img} />
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
            <div className="eachUpcoming">
              <div key={each._id} className="upcoming">
                <img
                  alt="upcomgin release"
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
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      marginLeft: "-20px",
                      color: "white",
                    }}
                  >
                    {each.name}
                  </h3>
                  <p
                    style={{
                      textAlign: "center",
                      color: "darkgray",
                      marginLeft: "-15px",
                    }}
                  >
                    Releasing on {each.release}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
        Trailers
      </h1>

      <div className="trailers_row">
        {trailers.map((each) => (
          <div className="eachTrailer">
            <img alt="trailers" src={each.coverimageurl} />
            <div className="trailerinfo">
              <h3 style={{ color: "red" }}>{each.name}</h3>
              <h4>{each.description}</h4>
              <Link className="trailer_view" to={"/teaser/" + each._id}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
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
          Trending Now
        </h1>
        <div className="trendingrow">
          {trending.map((each) => (
            <div className="eachTrending">
              <Link
                style={{ textDecoration: "none", color: "darkgray" }}
                to={"/game/" + each._id}
              >
                <Trending image={each.imageURL} />
                <h3>{each.name}</h3>
              </Link>
            </div>
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
            <div className="eachfav">
              <Link
                style={{ textDecoration: "none", color: "darkgray" }}
                to={"/game/" + each._id}
              >
                <Trending image={each.imageURL} />
                <h3 className="eachfav_name">{each.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
