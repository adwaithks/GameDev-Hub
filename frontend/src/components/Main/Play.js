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
    <div className="play">
      <div className="iframeContainer">
        {/**<iframe id="iframe-id" title="iframe-title" className="gameiframe" src={url}></iframe>**/}
      </div>
      <div className="iframe-btn-group">
        <button>Donate</button>
      </div>
    </div>
  );
}

export default Play;
