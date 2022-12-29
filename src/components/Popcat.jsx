import React, { useState } from "react";
import sound from "../sound/pop-cat-original-meme_3ObdYkj.mp3";
import PopCat from "../img/pop-cat.png";
import unPopCat from "../img/unpop-cat.png";
import styles from "./Popcat.module.css";

function Popcat(prop) {
  const audio = new Audio(sound);
  const [popImage, setPopImage] = useState(unPopCat);
  const [count, setCount] = useState(0);
  const press = () => {
    setPopImage(PopCat);
    audio.play();
  };
  const release = () => {
    setPopImage(unPopCat);
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>POP CAT</h1>
        <h1 className={styles.counter}>{count}</h1>
        <img
          src={popImage}
          alt="popcat"
          className={styles.popcat}
          onMouseDown={press}
          onMouseUp={release}
        />
      </div>
    </>
  );
}
export default Popcat;
