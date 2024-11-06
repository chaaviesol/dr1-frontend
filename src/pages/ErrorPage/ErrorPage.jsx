import React from "react";
import "./errorpage.css";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container  errorpageui flex">
        <img src="/images/error.png" alt="" />

        <h1>Oops!</h1>
        <h4>
          Unfortunately the page you are looking for has been moved or deleted
        </h4>
        <h4 style={{ marginTop: "40px" }}>
          Wrong Directry?{" "}
          <span onClick={() => navigate("/")} className="errorpageuibacktohome">
            Back to Home
          </span>
        </h4>
      </div>
    </>
  );
}

export default ErrorPage;
