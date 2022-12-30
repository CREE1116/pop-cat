import React, { useState, useEffect } from "react";
import styles from "./Ranking.module.css";
import Modal from "./Modal";
function Ranking(props) {
  const [RankinMode, setRankinMode] = useState(false);
  const [nickName, setNickName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const onlineButton = document.getElementsByClassName(
      styles.onlineButton
    )[0];
    onlineButton.addEventListener("click", () => {
      setRankinMode((prev) => !prev);
      setModalOpen(true);
    });
    return () => {
      onlineButton.removeEventListener("click", () => {
        setRankinMode((prev) => !prev);
      });
    };
  }, []);
  const isEnter = (e) => {
    if (e.key === "Enter") {
      console.log("enter", e.target.value);
      setNickName(e.target.value);
      setModalOpen(false);
    }
  };
  useEffect(() => {
    const nickNameInput = document.getElementById("nickNameInput");
    if (nickNameInput) {
      nickNameInput.addEventListener("keydown", (e) => isEnter(e));
    }
    return () => {
      if (nickNameInput) {
        nickNameInput.removeEventListener("keydown", (e) => isEnter(e));
      }
    };
  }, [RankinMode]);
  return (
    <div className={styles.RankingDiv}>
      <button className={styles.onlineButton}>
        {RankinMode ? "오프라인가자!" : "온라인가자!"}
      </button>
      <Modal open={modalOpen} close={() => setModalOpen(false)}>
        <p>사용할 이름을 입력해주시죠</p>
        <input type="text" id="nickNameInput" />
      </Modal>
      {RankinMode ? (
        <>
          <h1 className={styles.title}>Ranking</h1>
          <ul className={styles.Ranking}>
            <li>ranking1</li>
            <li>ranking2</li>
          </ul>
        </>
      ) : null}
    </div>
  );
}

export default Ranking;
