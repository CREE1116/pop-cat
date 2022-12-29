import React, { useState } from "react";
import sound from "../sound/pop-cat-original-meme_3ObdYkj.mp3";
import PopCat from "../img/pop-cat.png";
import unPopCat from "../img/unpop-cat.png";
import styles from "./Popcat.module.css";
import { BrowserView, MobileView } from "react-device-detect";
function Popcat(prop) {
  const audio = new Audio(sound);
  const [popImage, setPopImage] = useState(unPopCat);
  const press = () => {
    setPopImage(PopCat);
    audio.play();
  };
  const release = () => {
    setPopImage(unPopCat);
  };
  return (
    <div className={styles.container}>
      <img
        src={popImage}
        alt="popcat"
        className={styles.popcat}
        onMouseDown={press}
        onMouseUp={release}
      />
    </div>
  );
}
export default Popcat;
