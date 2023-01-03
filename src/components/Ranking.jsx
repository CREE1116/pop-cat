import React, { useEffect } from "react";
import styles from "./Ranking.module.css";
import { useDispatch, useSelector } from "react-redux";
import useNetwork from "../useNetwork";

function Ranking(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  const Top10 = useSelector((state) => state.top10);
  const id = useSelector((state) => state.id);
  const name = useSelector((state) => state.nickname);
  const ranking = useSelector((state) => state.ranking);
  const nicknamemodal = useSelector((state) => state.nicknamemodal);
  const loginmodal = useSelector((state) => state.loginmodal);
  const IDchangeModal = useSelector((state) => state.IDchangeModal);
  const handleNetworkChange = (online) => {
    console.log(online ? "We just went online" : "We are offline");
  };
  const networkState = useNetwork(handleNetworkChange);
  useEffect(() => {
    if (networkState) {
      dispatch({ type: "ONLINE" });
    } else dispatch({ type: "OFFLINE" });
  }, [networkState]);

  function onClickButton() {
    if (!(nicknamemodal || loginmodal || IDchangeModal)) {
      if (networkState) {
        dispatch({ type: "LOGINMODAL", loginmodal: true });
      }
    }
  }
  return (
    <div className={styles.RankingDiv}>
      <h1 className={styles.title}>{networkState ? "온라인" : "오프라인"}</h1>
      {networkState ? (
        <>
          <button className={styles.onlineButton} onClick={onClickButton}>
            로그인
          </button>
          <button
            className={styles.onlineButton}
            onClick={() => {
              if (!(nicknamemodal || loginmodal || IDchangeModal)) {
                dispatch({ type: "NICKNAMEMODAL", nicknamemodal: true });
              }
            }}
          >
            닉네임 입력
          </button>
          <div className={styles.rankList}>
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
