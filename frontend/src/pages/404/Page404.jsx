import React from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  let navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="error-page-content">
        <div className="card mb-5 mx-auto" style={{ maxWidth: "320px" }}>
          <div className="card-body">
            <div className="card">
              <div className="error-code">404</div>
              <div className="card-arrow">
                <div className="card-arrow-top-left"></div>
                <div className="card-arrow-top-right"></div>
                <div className="card-arrow-bottom-left"></div>
                <div className="card-arrow-bottom-right"></div>
              </div>
            </div>
          </div>
          <div className="card-arrow">
            <div className="card-arrow-top-left"></div>
            <div className="card-arrow-top-right"></div>
            <div className="card-arrow-bottom-left"></div>
            <div className="card-arrow-bottom-right"></div>
          </div>
        </div>
        <h1>Oops!</h1>
        <h3>We can't seem to find the page you're looking for</h3>
        <br />
        <hr />
        <br />
        <a onClick={() => navigate(-1)} className="btn btn-outline-theme px-3 rounded-pill">
          <i className="fa fa-arrow-left me-1 ms-n1"></i> Go Back
        </a>
      </div>
    </div>
  );
};

export default Page404;
