import React from "react";
import { Link } from "react-router-dom";
import "../styles/Lesson.css";
import { GrPerformance } from "react-icons/gr";

const EditLesson = () => {
  return (
    <Link to="/edit" className="lesson edit-lesson">
      Manage
      <GrPerformance size="8em" />
    </Link>
  );
};

export default EditLesson;
