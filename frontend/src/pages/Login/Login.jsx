import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Particle from "../../components/partials/Particle";
import { Container } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const [recaptcha, setRecaptcha] = useState("");

  const onCaptchaChange = (val) => {
    setRecaptcha(val);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (!recaptcha) {
      alert("Veuillez valider le captcha");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
        recaptcha,
      });

      authContext.login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };
  return (
    <Container className="container d-flex justify-content-center align-items-center vh-100 min-vw-100">
      <Particle />
      <form
        onSubmit={loginSubmit}
        className="formLogin p-4 border rounded shadow bg-light"
      >
        <h1 className="text-center mb-4">Connexion</h1>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 d-flex justify-content-center">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={onCaptchaChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!recaptcha}
        >
          Se connecter
        </button>
      </form>
    </Container>
  );
};
export default Login;
