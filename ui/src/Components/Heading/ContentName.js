import "./ContentName.css"

const ContentName = (props) => {
    return (
        <> 
           <div className="center contentNameContainer">
               <h1>{props.title}</h1>
           </div>
        </>
    )
}

export default ContentName;