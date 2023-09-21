import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../components/styles/image.css";

export default function Image(props) {
const {attributes, listeners, setNodeRef, transform, transition}=useSortable({ id: props.id} )
const style={
    transition:`transform 100ms`,
     transform: CSS.Transform.toString(transform),
};
  return (
    <div 
    className="image-card"
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    >
      <img src={props.webformatURL} alt="" />
      <span className="tags">{props.tags}</span>
    </div>
  );
}
