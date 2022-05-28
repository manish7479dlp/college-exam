import "./Header.css"
import Image from "../../Images/clgNameWhite.svg"

const Header = () =>{
    return (
        <>
           <div className="center headerContainer">
               <h3 className="clgName">Murshidabad College of Engineering and Technology</h3>
               <img className = "collegeName" src = {Image} alt = "image"/>
           </div>
        </>
    )
}

export default Header;
