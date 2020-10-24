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
    <iframe
      title="iframe-title"
      className="gameiframe"
      src={"http://localhost:5000/games/zips/" + url + "/index.html"}
    ></iframe>
  );
}

export default Play;
