import React, { useEffect, useRef, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useFetch, { writeNewPost, writeEditPost } from "../hooks/useFetch";
import useScreen from "../hooks/useScreen";

const WritePost = ({ isNewWrite }) => {
  const [thisPostDefaultValueState, setThisPostDefaultValueState] = useState({
    title: "",
    content: "",
    board: "",
    id: "",
    writeCount: "",
  });
  useEffect(() => {
    const thisPostDefaultValue = JSON.parse(localStorage.getItem("thisPost"));
    if (!isNewWrite) {
      setThisPostDefaultValueState({
        title: thisPostDefaultValue.title,
        content: thisPostDefaultValue.content,
        board: thisPostDefaultValue.board,
        id: thisPostDefaultValue.id,
        writeCount: thisPostDefaultValue.writeCount,
      });
    }
  }, []);

  const navigate = useNavigate();
  const handleTempSave = () => {};
  const { sendRequest, status, message, setFetchStateDefault } = useFetch(
    isNewWrite ? writeNewPost : writeEditPost
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;
    const board = e.target[2].value;
    const date = new Date();
    const nickname = localStorage.getItem("displayName");
    const postId = isNewWrite ? "" : thisPostDefaultValueState.id;
    const writeCount = isNewWrite ? "" : thisPostDefaultValueState.writeCount;
    await sendRequest({
      title,
      content,
      date,
      nickname,
      board,
      postId,
      writeCount,
    });
    localStorage.removeItem("thisPost");
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/board", { replace: false });
    }
  }, [status]);

  const screen = useScreen({
    status,
    errorMessage: message,
    setFetchStateDefault,
  });
  return (
    <form className="WritePost" onSubmit={handleSubmit}>
      {screen}
      <section className="post-section">
        <FloatingLabel
          className="title"
          controlId="floatingTextarea2"
          label="Title"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a title here"
            defaultValue={isNewWrite ? "" : thisPostDefaultValueState.title}
          />
        </FloatingLabel>
        <FloatingLabel
          className="content"
          controlId="floatingTextarea2"
          label="Content"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a content here"
            defaultValue={isNewWrite ? "" : thisPostDefaultValueState.content}
          />
        </FloatingLabel>
        <Form.Select
          className="board"
          aria-label="Default select example"
          defaultValue={isNewWrite ? "" : thisPostDefaultValueState.board}
        >
          <option value="board1">???????????????</option>
          <option value="board2">???????????????</option>
          <option value="board3">???????????????</option>
          <option value="board4">???????????????</option>
        </Form.Select>
      </section>
      <section className="btn-section btn-group">
        <Button type="button" onClick={handleTempSave} variant="outline-info">
          ????????????
        </Button>{" "}
        <Button type="submit" variant="outline-primary">
          ??????
        </Button>{" "}
      </section>
    </form>
  );
};

export default WritePost;
