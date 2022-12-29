import React, { useEffect, useState } from "react";
import sound from "../sound/pop-cat-original-meme_3ObdYkj.mp3";
import PopCat from "../img/pop-cat.png";
import unPopCat from "../img/unpop-cat.png";
import styles from "./Popcat.module.css";
import { isMobile } from "react-device-detect";

function Popcat(prop) {
  const audio = new Audio(sound);
  const [popImage, setPopImage] = useState(unPopCat);
  const [count, setCount] = useState(0);
  const press = (e) => {
    e.stopPropagation();
    console.log("press");
    setPopImage(PopCat);
    audio.play();
  };
  const release = (e) => {
    e.stopPropagation();
    console.log("release");
    setPopImage(unPopCat);
    setCount((prev) => prev + 1);
  };
  function getConvertedEventType(type) {
    if (isMobile) {
      if (type === "mousedown") {
        console.log("touchstart");
        type = "touchstart";
      } else if (type === "mouseup") {
        console.log("touchend");
        type = "touchend";
      }
    }

    return type;
  }
  useEffect(() => {
    document.addEventListener(
      getConvertedEventType("mousedown"),
      (e) => press(e),
      false
    );
    document.addEventListener(
      getConvertedEventType("mouseup"),
      (e) => release(e),
      false
    );
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
