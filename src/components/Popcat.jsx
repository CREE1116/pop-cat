import React, { useState } from "react";
import sound from "../sound/pop-cat-original-meme_3ObdYkj.mp3";
import PopCat from "../img/pop-cat.png";
import unPopCat from "../img/unpop-cat.png";
import styles from "./Popcat.module.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
function Popcat() {
  const [imageSRC, changeImage] = useState(unPopCat);

  const popDown = () => {
    changeImage(PopCat);
    const audio = new Audio(sound);
    audio.play();
  };
  const popUp = () => {
    changeImage(unPopCat);
  };
  return (
    <div className={styles.container}>
      <BrowserView>
        <img
          className={styles.popcat}
          src={imageSRC}
          onMouseDown={popDown}
          onMouseUp={popUp}
        />
      </BrowserView>
      <MobileView>
        <img
          className={styles.popcat}
          src={imageSRC}
          onTouch={popDown}
          onTouchEnd={popUp}
        />
      </MobileView>
    </div>
  );
}

export default Popcat;
