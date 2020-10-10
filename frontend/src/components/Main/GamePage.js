import React, { useEffect, useState } from "react";
import "./GamePage.css";
import Alert from "@material-ui/lab/Alert";
import Markdown from "markdown-to-jsx";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import GetAppIcon from "@material-ui/icons/GetApp";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function GamePage() {
  const [info, setInfo] = useState({});
  const [price, setPrice] = useState("");
  const [liked, setLiked] = useState(0);
  const [sdesc, setsDesc] = useState("");
  const [ldesc, setlDesc] = useState("");
  const [disliked, setDisliked] = useState(0);
  const [me, setMe] = useState({});
  const [downloads, setDownloads] = useState(0);
  const [severity, setSeverity] = useState("error");
  const [fav, setFav] = useState(false);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const gameid = window.location.href.split("/")[4];

    const fetchGame = async () => {
      await fetch(`http://localhost:8000/game/${gameid}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((finalRes) => {
          setInfo(finalRes);

          if (finalRes.price !== "Free") {
            setPrice(finalRes.price);
          }
          setLiked(finalRes.likes);
          setsDesc(finalRes.description);
          setlDesc(finalRes.longdescription);
          setDisliked(finalRes.dislikes);
          setDownloads(finalRes.downloads);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const my = async () => {
      await fetch("http://localhost:8000/api/user/me", {
        method: "GET",
        headers: {
          "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
        },
      })
        .then((res) => res.json())
        .then((finalRes2) => {
          console.log(finalRes2);
          setMe(finalRes2);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchGame();
    my();
  }, [temp]);

  const likeHandler = async (id) => {
    const token = localStorage.getItem("Access-Token");
    await fetch(`http://localhost:8000/${id}/like`, {
      method: "GET",
      headers: {
        "Access-Token": "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes);
        setTemp(Date.now());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dislikeHandler = async (id) => {
    const token = localStorage.getItem("Access-Token");
    await fetch(`http://localhost:8000/${id}/dislike`, {
      method: "GET",
      headers: {
        "Access-Token": "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes);
        setTemp(Date.now());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const favHandler = async (id) => {
    console.log(me.favouriteGames);
    setSeverity("success");
    setFav(true);
    const token = localStorage.getItem("Access-Token");
    await fetch(`http://localhost:8000/${id}/makefavourite`, {
      method: "GET",
      headers: {
        "Access-Token": "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes);
        setOpen(true);
        setResponse(finalRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadHandler = async (id) => {
    window.open(`http://localhost:8000/download/${id}`);
  };

  const purchaseHandler = async () => {
    console.log("purchased");
  };

  const unfavHandler = async (id) => {
    setSeverity("error");
    setFav(false);
    const token = localStorage.getItem("Access-Token");
    await fetch(`http://localhost:8000/${id}/removefavourite`, {
      method: "GET",
      headers: {
        "Access-Token": "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes);
        setOpen(true);
        setResponse(finalRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="gamepage">
      <Collapse
        style={{ position: "fixed", zIndex: "-1", top: "0", width: "100%" }}
        in={open}
      >
        <Alert
          severity={severity}
          action={
            <CloseIcon
              fontSize="small"
              onClick={() => {
                setOpen(false);
              }}
            ></CloseIcon>
          }
        >
          {response}
        </Alert>
      </Collapse>
      <div className="mainsection">
        <img className="infoimage" src={info.imageURL} alt="" />
        <div className="gameInformation">
          <div>
            <h1 style={{ textTransform: "uppercase", fontWeight: "800" }}>
              {info.name}
            </h1>
          </div>
          {price ? (
            <button className="downloadbtn" onClick={purchaseHandler}>
              Purchase
            </button>
          ) : (
            <button
              className="downloadbtn"
              onClick={() => {
                downloadHandler(info.gameFile);
              }}
            >
              Download
            </button>
          )}
          <p style={{ width: "600px" }}>{sdesc}</p>

          <div className="gameinfo2">
            <h3>Author: {info.creator}</h3>
            <h3>Price: ${info.price}</h3>
            <div className="buttongroup">
              <GetAppIcon className="downloadIcon"></GetAppIcon>
              <p>{downloads}</p>
              <ThumbUpAltIcon
                onClick={() => {
                  likeHandler(info._id);
                }}
                className="downloadIcon"
              ></ThumbUpAltIcon>
              <p>{liked}</p>
              <ThumbDownAltIcon
                onClick={() => {
                  dislikeHandler(info._id);
                }}
                className="downloadIcon"
              ></ThumbDownAltIcon>
              <p>{disliked}</p>
              {fav ? (
                <FavoriteIcon
                  onClick={() => {
                    unfavHandler(info._id);
                  }}
                  className="downloadIcon"
                  style={{ cursor: "pointer" }}
                ></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon
                  className="downloadIcon"
                  onClick={() => {
                    favHandler(info._id);
                  }}
                  style={{ cursor: "pointer" }}
                ></FavoriteBorderIcon>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hline"></div>

      <div className="gamedescription">
        <p>
          <Markdown>{ldesc}</Markdown>
        </p>
      </div>
    </div>
  );
}

export default GamePage;
