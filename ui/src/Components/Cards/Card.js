import Button from "../Buttons/Button";
import "./Card.css"

const Card = (props) => {
    return(
        <>
           <div className="center cardContainer">
               <h1 className="center cardHeading">{props.heading}</h1>
               <p className="cardContent">{props.content}</p>
               <Button onClick = {() => {
                   props.onClick(props.id)
               }} name = {props.name}/>
           </div>
        </>
    )
}

export default Card;