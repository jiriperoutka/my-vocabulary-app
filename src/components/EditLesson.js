import React from "react";
import { Link } from "react-router-dom";
import "../styles/Lesson.css";

const EditLesson = () => {
  return (
    <Link to="/edit" className="lesson edit-lesson">
      Manage
      <img
        src="plus.png"
        alt="Plus"
        style={{ width: "200px", height: "200px" }}
      />
    </Link>
  );
};

export default EditLesson;
