import React, { useState, useEffect, useRef } from "react";
import styles from "./Ranking.module.css";
import { useDispatch, useSelector } from "react-redux";
import ModalBasic from "./ModalBasic";

function Ranking(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  const Top10 = useSelector((state) => state.top10);
  const id = useSelector((state) => state.id);
  const name = useSelector((state) => state.nickname);
  const rankingMode = useSelector((state) => state.rankingMode);
  const ranking = useSelector((state) => state.ranking);

  useEffect(() => {
    const onlineButton = document.getElementsByClassName(
      styles.onlineButton
    )[0];
    onlineButton.addEventListener("click", () => {
      dispatch({ type: "RANKING_MODE", mode: !rankingMode });
    });
    return () => {
      onlineButton.removeEventListener("click", () => {
        dispatch({ type: "RANKING_MODE", mode: !rankingMode });
      });
    };
  }, [rankingMode]);
  useEffect(() => {
    if (rankingMode) {
      dispatch({ type: "ONLINE" });
    } else dispatch({ type: "OFFLINE" });
  }, [rankingMode]);
  return (
    <div className={styles.RankingDiv}>
      <button className={styles.onlineButton}>
        {rankingMode ? "오프라인가자!" : "온라인가자!"}
      </button>
      {rankingMode ? (
        <>
          <button
            className={styles.onlineButton}
            onClick={() => {
              dispatch({ type: "MODAL", modal: true });
            }}
          >
            닉네임 입력
          </button>
          <div className={styles.rankList}>
            <h1 className={styles.title}>Ranking</h1>
            {Top10 === undefined ? null : (
              <div className={styles.rankList}>
                {Top10.map((item, index) => (
                  <p key={index}>
                    {item.ranking}등: {item.name} ({item.count})
                  </p>
                ))}
              </div>
            )}
            {name < 1 ? (
              <p>
                YOU :{ranking}등 고냥이{id.substring(0, 4)} ({count})
              </p>
            ) : (
              <p>
                YOU :{ranking}등 {name} ({count})
              </p>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Ranking;
