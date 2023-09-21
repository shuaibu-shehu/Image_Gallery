import "../components/styles/gallery.css";
import Image from "./Image";
import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import { Link } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const getImages = async () => {
    try {
      const key = "39566677-d23c15e26a344e12b1e00cf0a";
      const res = await fetch(
        `https://pixabay.com/api/?key=39566677-d23c15e26a344e12b1e00cf0a&q=${query}&image_type=photo&pretty=true`
      );
      const data = await res.json();
      setImages(data.hits);
    
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getImages();
  }, [query]);
  console.log(images);

  const onDragEnd=(event)=>{
    const { active, over } = event;
    if(active.id === over.id ){ return; }
    setImages((images)=>{
      const oldIndex=images.findIndex((user)=> user.id === active.id);
      const newIndex=images.findIndex((user)=> user.id === over.id);
      return arrayMove(images,oldIndex,newIndex)
    });
  }
  return (
    <div className="gallery">
      <div className="header">
        <Link className="logout" to="/">
          Logout
        </Link>
      </div>
      <h1>Photo Gallery</h1>
      <div className="search-input-div">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type description"
        />
        <ion-icon name="search"></ion-icon>
      </div>

      <div className="image-grid">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={images} strategy={verticalListSortingStrategy}>

        {images.map((image) => {
          return <Image {...image} key={image.id} />;
        })}

        </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
