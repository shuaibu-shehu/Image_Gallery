import "../components/styles/image.css"
import { Draggable } from "react-beautiful-dnd";

export default function Image(props){
    
    return (
        <Draggable key={props.id.toString()} draggableId={props.id.toString()} index={props.index} >
            {(provided)=>(

                <div className="image-card"
                {...provided.draggableProps} 
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
            <img src={props.webformatURL} alt="" />
            <span className="tags">{props.tags}</span>
        </div>
        )}
        </Draggable>
    )
}