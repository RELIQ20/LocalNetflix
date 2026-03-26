import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "../componentCss/AuthModal.module.css";
import back from "../assets/back.svg";

export const AuthModal = ({ setIsLoggedIn, setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(false);

  const SERVICE = import.meta.env.VITE_SERVICE;
  const TEMPLATE = import.meta.env.VITE_TEMPLATE;
  const USERKEY = import.meta.env.VITE_USERKEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      email: email,
      password: password,
      mode: isLoginMode ? "Login" : "Signup",
    };

    emailjs
      .send(SERVICE, TEMPLATE, templateParams, USERKEY)
      .then(() => {
        alert("Success!");
        setEmail("");
        setPassword("");
        setIsLoggedIn(true);
        setShowLogin(false);
      })
      .catch((err) => {
        console.error("Failed to send email. Error: ", err);
        alert("Something went wrong.");
      });
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className={styles.modalOverlay} onClick={() => setShowLogin(false)}>
      <div
        className={styles.authContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.topContainer}>
          <img
            className={styles.close}
            src={back}
            onClick={() => setShowLogin(false)}
            alt="Close"
          />

          <h2>{isLoginMode ? "Log In" : "Sign up"}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            id={styles.email}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id={styles.password}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{isLoginMode ? "LOG IN" : "SIGN IN"}</button>

          <p onClick={toggleMode}>
            {isLoginMode
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </p>
        </form>
      </div>
    </div>
  );
};
