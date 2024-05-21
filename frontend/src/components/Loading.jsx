import "../App.css";
import { useEffect } from "react";
const Loading = ({ state, message }) => {
  
  if (state) {
    document.body.style.overflow = "hidden";

    return (
      <div className="loading-component">
        {message && <p className="loading-text">{message}</p>}
        <div className="loading-animation spinner-grow text-success"></div>
        <div className="loading-background"></div>
      </div>
    );
  } else {
    document.body.style.overflow = "auto";
    return null;
  }
};

export default Loading;
