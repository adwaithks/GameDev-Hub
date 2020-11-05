import React, { useState } from "react";
import Dropzone from "react-dropzone";
import CloseIcon from "@material-ui/icons/Close";

import "./Teaser.css";

function Teaser() {
  const [desc, setDesc] = useState("");
  const [fee, setFee] = useState("");
  const [category, setcategory] = useState("action");
  const [platform, setplatform] = useState("Mac");
  const [schedule, setSchedule] = useState("");
  const [video, setVideo] = useState();
  const [imagenames, setimagenames] = useState([]);
  const [videoname, setvideoname] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(files);
    const formData = new FormData();
    formData.append("release", schedule);
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("fee", fee);
    formData.append("img", url);
    formData.append("platform", platform);
    formData.append("category", category);
    let count = 0;
    console.log(files);
    for (const i in files) {
      formData.append("files", files[i]);
      count = count + 1;
    }
    for (const i in video) {
      formData.append("video", video[i]);
    }
    formData.append("fileCount", count);

    console.log(formData);
    const response = await fetch(
      "http://localhost:5000/proxy/teaser/upload/new",
      {
        method: "POST",
        headers: {
          "Access-Token": "Bearer " + localStorage.getItem("Access-Token"),
        },
        body: formData,
      }
    );
    console.log(response);
    window.open("/home");
    return false;
  };

  const onDrop = (acceptedFiles) => {
    console.log("dropped");
    setFiles(acceptedFiles);
  };

  const onDrop2 = (acceptedFiles) => {
    console.log("dropped");
    setvideoname(acceptedFiles[0].name);
    setVideo(acceptedFiles);
  };

  const categoryHandler = (e) => {
    setcategory(e.target.value);
  };

  const platformHandler = (e) => {
    setplatform(e.target.value);
  };

  return (
    <div className="teaser">
      <h1
        style={{
          marginTop: "150px",
          fontSize: "800",
          color: "red",
        }}
      >
        Publish Teaser
      </h1>
      <div className="upload_form" style={{ marginTop: "50px" }}>
        <form onSubmit={submitHandler}>
          <div className="name" style={{ marginTop: "-10px" }}>
            <label className="namel" htmlFor="">
              Name:
            </label>
            <input
              type="text"
              placeholder="Name of the game"
              name="gname"
              onChange={(event) => setName(event.target.value)}
              value={name}
              placeholder="Name of the game"
              required
            />
          </div>
          <div className="name">
            <label className="descl">Short Description:</label>
            <input
              type="text"
              name="sdescription"
              onChange={(event) => setDesc(event.target.value)}
              value={desc}
              placeholder="Description"
              maxLength="500"
              required
            />
          </div>

          <div className="name3">
            <label className="imgl">Cover image URL:</label>
            <input
              type="text"
              name="imgurl"
              onChange={(event) => setUrl(event.target.value)}
              value={url}
              placeholder="Cover image of the game."
              required
            />
          </div>

          <div className="name3">
            <label className="imgl">Purchase Fee($):</label>
            <input
              type="text"
              name="fee"
              onChange={(event) => setFee(event.target.value)}
              value={fee}
              placeholder="Leave it blank, if no fee to be incurred"
              maxLength="10"
            />
          </div>
          <div className="name4">
            <label className="imgl">Select category:</label>
            <select
              onChange={categoryHandler}
              className="categories"
              name="category"
            >
              <option value="action">Action</option>
              <option value="roleplaying">Role Playing</option>
              <option value="simulation">Simulation</option>
              <option value="sports">Sports</option>
              <option value="strategy">Strategy</option>
            </select>
          </div>
          <div className="name4">
            <label className="imgl" htmlFor="">
              Select Platform:
            </label>
            <select
              onChange={platformHandler}
              className="platforms"
              name="platform"
            >
              <option value="Mac">Mac</option>
              <option value="WebGL">WebGL</option>
              <option value="windows">Windows</option>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
              <option value="Linux">Linux</option>
            </select>
          </div>
          <div className="name4">
            <label for="datetime">Release date:</label>
            <input
              onChange={(e) => {
                setSchedule(e.target.value);
              }}
              className="date_time"
              type="date"
              name="datetime"
            />
          </div>
          <div style={{ marginTop: "40px" }}>
            <Dropzone className="dropzone" onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div className="droparea" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <h3 style={{ color: "darkgray", padding: "80px" }}>
                    Drag & Drop some early game images Images (.png)
                  </h3>
                </div>
              )}
            </Dropzone>
          </div>

          {videoname ? (
            <div className="filenameContainer" style={{ marginTop: "40px" }}>
              <div style={{ color: "white" }} className="filenameindicator">
                <h3>{videoname}</h3>
              </div>
              <div>
                <CloseIcon
                  style={{ color: "white" }}
                  onClick={() => {
                    setvideoname("");
                    setVideo();
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="" style={{ marginTop: "40px" }}>
              <Dropzone className="dropzone" onDrop={onDrop2}>
                {({ getRootProps, getInputProps }) => (
                  <div className="droparea" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <h3 style={{ color: "darkgray", padding: "80px" }}>
                      Drag & Drop Trailer movie (.mp4)
                    </h3>
                  </div>
                )}
              </Dropzone>
            </div>
          )}

          <button className="create" type="submit" value="Create">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}
export default Teaser;
