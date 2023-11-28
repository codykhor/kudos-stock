import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Auth() {
  const [auth, setAuth] = useState("signin");
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const changeAuth = () => {
    setForm({});
    setAuth(auth == "signin" ? "signup" : "signin");
  };

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    window.location.assign(`/home`);
    setForm({ email: "", password: "" });
  };

  const handleSubmit = (event) => {
    alert("Sign up success! Please check your email for verification.");
    event.preventDefault();
    window.location.assign(`/auth`);
    setForm({});
  };

  if (auth === "signin") {
    return (
      <div className="form-container pt-2">
        <form onSubmit={handleSignInSubmit}>
          <h4 className="form-title">Sign in to your account</h4>
          <div className="tagline">
            Not a member yet?{" "}
            <div className="auth-link">
              <span className="link-primary" onClick={changeAuth}>
                Sign Up
              </span>
            </div>
          </div>
          <div className="form-email mt-3">
            <label>Email address: </label> {""}
            <input
              type="email"
              z
              id="emailadd"
              placeholder="Enter email address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-password mt-3">
            <label>Password: </label> {""}
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div>
            <Button variant="dark" type="Submit" className="mt-3">
              SIGN IN
            </Button>
          </div>
          <div className="forgot mt-3">
            <Link to="#">Forgot password?</Link>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="form-container pt-2">
      <form onSubmit={handleSubmit}>
        <h4 className="form-title">Sign up for your account</h4>
        <div>
          Already a member?{" "}
          <div className="auth-link">
            <span className="link-primary" onClick={changeAuth}>
              Sign In
            </span>
          </div>
        </div>
        <div className="form-username mt-3">
          <label>Full Name: </label> {""}
          <input
            type="name"
            id="name"
            placeholder="Enter full name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="form-emailadd mt-3">
          <label>Email address: </label> {""}
          <input
            type="email"
            id="emailadd"
            placeholder="Enter email address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="form-password mt-3">
          <label>Password: </label> {""}
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div>
          <Button variant="dark" type="Submit" className="mt-3">
            SIGN UP
          </Button>
        </div>
        <div className="forgot mt-3">
          <Link to="#">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}
