import React, { useEffect, useState } from "react";
import sound from "../sound/pop-cat-original-meme_3ObdYkj.mp3";
import PopCat from "../img/pop-cat.png";
import unPopCat from "../img/unpop-cat.png";
import styles from "./Popcat.module.css";
import { isMobile } from "react-device-detect";
import effectSound from "../effectSound";

function Popcat(prop) {
  const [popImage, setPopImage] = useState(unPopCat);
  const [count, setCount] = useState(0);
  const es = effectSound(sound, 1);
  const press = (e) => {
    e.stopPropagation();
    console.log(e.type);
    es.play();
    setPopImage(PopCat);
  };
  const release = (e) => {
    e.stopPropagation();
    console.log(e.type);
    setPopImage(unPopCat);
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
    if (isMobile) {
      document.addEventListener("touchstart", (e) => press(e), false);
      document.addEventListener("touchend", (e) => release(e), false);
    } else {
      document.addEventListener("mousedown", (e) => press(e), false);
      document.addEventListener("mouseup", (e) => release(e), false);
    }
  }, []);
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>POP CAT</h1>
        <h1 className={styles.counter}>{count}</h1>
        <img src={popImage} alt="popcat" className={styles.popcat} />
      </div>
    </>
  );
}
export default Popcat;
