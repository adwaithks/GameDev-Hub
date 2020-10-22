import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const sendLoginInfo = async (event) => {
    const data = {
      email: email,
      password: password,
    };
    event.preventDefault();
    await fetch("/api/user/login", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((finalRes) => {
        if (!finalRes.accessToken) {
          setOpen(true);
          console.log(finalRes);
          setResponse(finalRes);
        } else {
          localStorage.setItem("Access-Token", finalRes.accessToken);
          window.location.href = "/myprofile";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Login">
      <Collapse in={open}>
        <Alert
          severity="error"
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
      <div className="login__container">
        <h1 className="mainheading">Login</h1>
        <form onSubmit={sendLoginInfo}>
          <div className="formContainer">
            <div className="form-group-login">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                placeholder="email id"
                required
              />
            </div>
            <div className="form-group-login">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                name="password"
                placeholder="********"
                required
              />
            </div>
          </div>
          <div className="buttonlinkContainer">
            <button className="loginbtn" type="submit">
              Login
            </button>
            <Link className="link" to="/register">
              <h4>New to Community?</h4>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
