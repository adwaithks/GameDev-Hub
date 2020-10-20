import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const sendRegisterInfo = async (event) => {
    const data = {
      email: email,
      username: username,
      password: password,
    };
    event.preventDefault();
    await fetch("http://localhost:8000/api/user/register", {
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
          setResponse(finalRes);
        } else {
          localStorage.setItem("Access-Token", finalRes.accessToken);
          window.location.href = "/myprofile";
        }
      })
      .catch((err) => {
        setOpen(true);
        setResponse("Interal Server Error");
      });
  };

  return (
    <div className="Register">
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
        <h1 className="mainheading">Register</h1>
        <form onSubmit={sendRegisterInfo}>
          <div className="form-group-login">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              placeholder="adwaith"
              required
            />
          </div>
          <div className="form-group-login">
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder="james.bond@spectre.com"
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
          <div className="m-t-lg">
            <ul className="list-inline">
              <li>
                <button className="loginbtn" type="submit">
                  Login
                </button>
              </li>
              <Link className="link" to="/login">
                <h4>New to Community?</h4>
              </Link>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
