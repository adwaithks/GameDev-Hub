import React, { useEffect, useState } from "react";
import "./Play.css";

function Play() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    if (!param.has("game")) {
      setUrl("");
    } else {
      console.log(param.get("game"));
      setUrl(param.get("game"));
    }
  }, []);

  return (
    <>
    <iframe
      title="iframe-title"
      className="gameiframe"
      src={"http://localhost:5000/games/zips/" + new URLSearchParams(window.location.search).get("game") + "/index.html"}
    ></iframe>
    <img src="http://localhost:5000/games/favicon.ico" />
    </>
  );
}

export default Play;
