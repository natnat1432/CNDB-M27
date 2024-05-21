import React from "react";
import { useNavigate } from "react-router-dom";
const Page404 = () => {
  let navigate = useNavigate();
  return (
    <div className="text-center h-screen flex items-center justify-center">
      <div>
        <h1 className="text-8xl font-bold text-accent">404</h1>
        <h1 className="text-2xl font-bold">PAGE NOT FOUND!</h1>
        <br />
        <p>We looked everywhere for this page.</p>
        <p>Are you sure the website URL is correct?</p>
        <br />
        <button
          className="btn btn-outline btn-accent m-auto flex"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Page404;
