import React, { useEffect, useState } from "react";
import sound from "../sound/pop-cat-original-meme_3ObdYkj.mp3";
import PopCat from "../img/pop-cat.png";
import unPopCat from "../img/unpop-cat.png";
import styles from "./Popcat.module.css";
import useSound from "use-sound";
import { isMobile } from "react-device-detect";

function Popcat(prop) {
  const [popImage, setPopImage] = useState(unPopCat);
  const [count, setCount] = useState(0);

  const press = (e) => {
    e.stopPropagation();
    console.log(e.type);
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
  const [popsound] = useSound(sound, { volume: 0.5 });
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>POP CAT</h1>
        <h1 className={styles.counter}>{count}</h1>
        <img
          src={popImage}
          alt="popcat"
          className={styles.popcat}
          onMouseDown={popsound}
          touchstart={popsound}
        />
      </div>
    </>
  );
}
export default Popcat;
