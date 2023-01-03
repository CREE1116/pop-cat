import React, { useRef, useEffect, useState } from "react";
import Popcat from "./components/Popcat";
import Ranking from "./components/Ranking";
import styles from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import NicknameModal from "./components/NicknameModal";
import LoginModal from "./components/LoginModal";

function App() {
  const onlineMode = useSelector((state) => state.onlineMode);
  const id = useSelector((state) => state.id);
  const count = useSelector((state) => state.count);
  const rankingMode = useSelector((state) => state.rankingMode);
  const nicknamemodal = useSelector((state) => state.nicknamemodal);
  const loginmodal = useSelector((state) => state.loginmodal);
  const changeId = useSelector((state) => state.changeId);
  const name = useSelector((state) => state.nickname);
  const ws = useRef(null);
  const dispatch = useDispatch();
  const wsurl = //"ws://localhost:8080/popcat_server";
    "wss://port-0-pop-cat-server-cf24lca6hcal.gksl2.cloudtype.app/popcat_server";
  useEffect(() => {
    if (onlineMode) {
      console.log("connecting to  ", wsurl);
      ws.current = new WebSocket(wsurl);
      ws.current.onopen = () => {
        console.log("connected");
        if (id.length > 0) {
          ws.current.send(JSON.stringify({ type: "login", id: id }));
        }
      };
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log("get messgae", data);
        if (data.type === "ranking") {
          dispatch({ type: "RANKING", ranking: data.data });
        } else if (data.type === "top10") {
          dispatch({ type: "TOP10", top10: data.data });
        } else if (data.type === "id") {
          console.log("id", data.data);
          if (id.length < 1) {
            dispatch({ type: "ID", id: data.data });
          } else {
            console.log("id is exist", data.data);
            localStorage.setItem("tempId", data.data);
            console.log("save temp id:", localStorage.getItem("tempId"));
          }
        } else if (data.type === "login") {
          console.log(data.count, data.name);
          dispatch({ type: "SET", count: data.count });
          dispatch({ type: "NICKNAME", nickname: data.name });
          localStorage.setItem("tempId", data.id);
          console.log("save success id:", localStorage.getItem("tempId"));
        } else if (data.type === "loginFail") {
          console.log("login fail temp:", localStorage.getItem("tempId"));
          dispatch({ type: "ID", id: localStorage.getItem("tempId") });
        } else if (data.type === "change") {
          console.log("change success");
          dispatch({ type: "ID", id: data.changeId });
          dispatch({ type: "IDCHANGE", changeId: "" });
        } else if (data.type === "changeFail") {
          console.log("change fail");
          dispatch({ type: "IDCHANGE", changeId: "" });
        }
      };
      ws.current.onclose = (e) => {
        console.log("disconnected");
        dispatch({ type: "OFFLINE" });
        console.log(e);
      };
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [onlineMode]);

  useEffect(() => {
    if (onlineMode && rankingMode) {
      ws.current.send(
        JSON.stringify({
          type: "count",
          id: id,
          count: count,
        })
      );
    } else if (!onlineMode && rankingMode) {
      dispatch({ type: "ONLINE" });
    }
  }, [count]);

  useEffect(() => {
    if (onlineMode) {
      ws.current.send(
        JSON.stringify({
          type: "nickname",
          id: id,
          name: name,
        })
      );
    }
  }, [name]);

  useEffect(() => {
    if (onlineMode && localStorage.getItem("tempId") !== null) {
      ws.current.send(
        JSON.stringify({
          type: "login",
          id: id,
        })
      );
    }
  }, [id]);

  useEffect(() => {
    if (onlineMode) {
      console.log("change id send", changeId);
      ws.current.send(
        JSON.stringify({
          type: "changeId",
          id: id,
          changeId: changeId,
        })
      );
    }
  }, [changeId]);

  return (
    <div className={styles.container}>
      {nicknamemodal ? <NicknameModal /> : null}
      {loginmodal ? <LoginModal /> : null}
      <h1 className={styles.title}>POP CAT</h1>
      <Popcat />
      <div className={styles.idContainer}>
        {id.length < 1 ? null : <p> 아이디: {id}</p>}
      </div>
      <Ranking />
      <footer>
        <a href="https://github.com/CREE1116">개발자 깃허브 가기</a>
      </footer>
    </div>
  );
}

export default App;
