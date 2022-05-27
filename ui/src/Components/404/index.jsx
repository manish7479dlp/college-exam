import React from "react";
import "./style.css";

// 404 page funtional component and add go to home link
const NotFound = () => (
    <>
        <div className="number">404</div>
        <div className="text">
            <span>Ooops...</span>
            <br />
            page not found
        </div>
    </>
);

export default NotFound;
