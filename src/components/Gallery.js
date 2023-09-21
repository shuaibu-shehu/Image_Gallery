import "../components/styles/gallery.css";
import Image from "./Image";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SignIn from "./SignIn";
import { Link } from "react-router-dom";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [query,setQuery]=useState('');
  const getImages = async () => {
    try {
      const key = "39566677-d23c15e26a344e12b1e00cf0a";
      const res = await fetch(
        `https://pixabay.com/api/?key=39566677-d23c15e26a344e12b1e00cf0a&q=${query}&image_type=photo&pretty=true`
      );
      const data = await res.json();
      setImages(data.hits);
      setFinalResult(data.hits)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getImages();
  }, [query]);
  console.log(images);

  const [finalResult,setFinalResult]=useState([]);

  function handleOnDragEnd(result){
  const items= Array.from(finalResult);
  const [reorderedItem]=items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0 , reorderedItem)
  setFinalResult(items);
  }

  return (
    <div className="gallery">
      <div className="header">
        <Link className="logout" to='/'>Logout</Link>
      </div>
        <h1>Photo Gallery</h1>
      <div className="search-input-div">
        <input type="search" 
        value={query} 
         onChange={(e)=>setQuery(e.target.value)}
         placeholder="Type description"
         />
         <ion-icon name="search"></ion-icon>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="images">
            {(provided)=>(

                <div className="image-grid" {...provided.droppableProps} ref={provided.innerRef}>
            {finalResult.map((image,index) => {
                return <Image {...image} key={image.id} index={index} />;
            })}
            {provided.placeholder}
          </div>
  )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
