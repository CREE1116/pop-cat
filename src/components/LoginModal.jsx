import styles from "./ModalBasic.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
function NicknameModal(prop) {
  const dispatch = useDispatch();
  const [id, setID] = useState("");
  // 모달 끄기
  const closeModal = () => {
    dispatch({ type: "LOGINMODAL", loginmodal: false });
  };

  const onClickButton = () => {
    console.log("로그인: ", id);
    dispatch({ type: "ID", id: id });
    dispatch({ type: "RANKING_MODE", mode: true });
    closeModal();
  };
  function onChangeInput(e) {
    setID(e.target.value);
  }
  const enterPress = (e) => {
    if (e.key === "Enter") {
      onClickButton();
    }
  };
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      <p>로그인</p>
      <input
        value={id}
        id="nickname"
        type="text"
        placeholder="id가 있다면 id를 넣어주세요"
        size="30"
        onChange={onChangeInput}
        onKeyDown={enterPress}
      ></input>
      <button onClick={onClickButton} id="enterButton">
        없으면 그냥 넘어가자구요!
      </button>
    </div>
  );
}
export default NicknameModal;
