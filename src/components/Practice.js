import React from "react";
import "../styles/Lesson.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import { getLessons } from "../services/api"; // replace './api' with the actual path to the getLessons function
import { useNavigate } from "react-router-dom";
import { GrAchievement } from "react-icons/gr";

const Practice = () => {
  const [lessons, setLessons] = React.useState([]);

  React.useEffect(() => {
    const fetchLessons = async () => {
      const lessonsData = await getLessons();
      setLessons(lessonsData);
    };

    fetchLessons();
  }, []);
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("CZ-RU");
  const [lessonNumber, setLessonNumber] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handlePractice = () => {
    // Save the language and lessonNumber to localStorage
    localStorage.setItem("language", language);
    localStorage.setItem("lessonNumber", lessonNumber);
    localStorage.setItem("isPractice", false);
    navigate("/practice");
  };

  const handleRepeat = () => {
    // Save the language and lessonNumber to localStorage
    localStorage.setItem("language", language);
    localStorage.setItem("lessonNumber", lessonNumber);
    localStorage.setItem("isPractice", true);
    navigate("/practice");
  };

  const handleLessonChange = (event) => {
    setLessonNumber(event.target.value);
  };

  return (
    <div>
      <div
        to="/practice"
        className="lesson edit-lesson"
        onClick={handleClickOpen}
      >
        Practice
        <GrAchievement size="8em" />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>What are we goona to practice?</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value="CZ-RU"
                  onChange={(event) => setLanguage(event.target.value)}
                >
                  <MenuItem value="CZ-RU">CZ-RU</MenuItem>
                  <MenuItem value="RU-CZ">RU-CZ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Lesson</InputLabel>
                <Select
                  value={lessonNumber}
                  onChange={handleLessonChange}
                  label="Lesson"
                >
                  {lessons
                    .sort((a, b) => Number(a) - Number(b))
                    .map((lesson, index) => (
                      <MenuItem key={index} value={lesson}>
                        {lesson}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button
              style={{ marginLeft: 20, marginRight: 20 }}
              onClick={handlePractice}
              variant="outlined"
              color="primary"
              disabled={
                lessonNumber === undefined ||
                lessonNumber === null ||
                lessonNumber === ""
              }
            >
              Practice
            </Button>
            <Button
              onClick={handleRepeat}
              variant="outlined"
              disabled={
                lessonNumber !== undefined &&
                lessonNumber !== null &&
                lessonNumber !== ""
              }
            >
              Repeat
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Practice;
