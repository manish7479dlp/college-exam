import React from "react";
import "./style.css";

// 404 page funtional component and add go to home link
const NotFound = ({title, description , extraDes }) => (
    <>
        <div className="number">{title}</div>
        <div className="text">
            <span>{description}</span>
            <br />
            {extraDes}
        </div>
    </>
);

NotFound.defaultProps = {
    title: "404",
    description: "Ooops...",
    extraDes: "page not found"
}

export default NotFound;
