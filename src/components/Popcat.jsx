import React, { useEffect, useState } from "react";
import sound from "../sound/pop-cat-original-meme_3ObdYkj.mp3";
import PopCat from "../img/pop-cat.png";
import unPopCat from "../img/unpop-cat.png";
import styles from "./Popcat.module.css";
import { isMobile } from "react-device-detect";
import effectSound from "../effectSound";
import Ranking from "./Ranking";

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
    const popcatEliment = document.getElementById("popcatId");
    if (isMobile) {
      popcatEliment.addEventListener("touchstart", (e) => press(e), false);
      popcatEliment.addEventListener("touchend", (e) => release(e), false);
      return () => {
        popcatEliment.removeEventListener("touchstart", (e) => press(e), false);
        popcatEliment.removeEventListener("touchend", (e) => release(e), false);
      };
    } else {
      popcatEliment.addEventListener("mousedown", (e) => press(e), false);
      popcatEliment.addEventListener("mouseup", (e) => release(e), false);
      return () => {
        popcatEliment.removeEventListener("touchstart", (e) => press(e), false);
        popcatEliment.removeEventListener("touchend", (e) => release(e), false);
      };
    }
  }, []);
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>POP CAT</h1>
        <h1 className={styles.counter}>{count}</h1>
        <img
          src={popImage}
          alt="popcat"
          className={styles.popcat}
          id="popcatId"
        />
      </div>
    </>
  );
}
export default Popcat;
