// PracticePage.js
import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { getVocabularyByLesson } from "../services/api";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getVocabularyForPractice } from "../services/api";
//import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";
import { api } from "../services/api";

const language = localStorage.getItem("language");
const lessonNumber = localStorage.getItem("lessonNumber");

console.log("language", language + "lessonNumber", lessonNumber);

const useStyles = styled({
  checkButton: {
    marginTop: "20px", // Adjust this value as needed
  },
  underline: {
    "&:before": {
      borderBottomColor: "white", // Change this to your desired color
    },
    "&:hover:before": {
      borderBottomColor: "white", // Change this to your desired color
    },
  },
});

const PracticePage = () => {
  const classes = useStyles();

  const [progress, setProgress] = React.useState(0);
  const [lessonData, setLessonData] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [correctAnswer, setCorrectAnswer] = React.useState("");
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openRepeatDialog, setOpenRepeatDialog] = useState(false);
  const [originalLessonData, setOriginalLessonData] = useState([]);

  const [language, setLanguage] = React.useState(
    localStorage.getItem("language")
  );
  const [lessonNumber, setLessonNumber] = React.useState(
    localStorage.getItem("lessonNumber")
  );

  const [practice] = React.useState(localStorage.getItem("isPractice"));

  const [isAnswerIncorrect, setIsAnswerIncorrect] = React.useState(false);

  const navigate = useNavigate();
  React.useEffect(() => {}, [openSuccessDialog, openRepeatDialog]);

  React.useEffect(() => {
    setLanguage(localStorage.getItem("language"));
    setLessonNumber(localStorage.getItem("lessonNumber"));

    const fetchLessonData = async () => {
      let data;
      console.log(practice);
      if (practice === true) {
        console.log("practice Fetch");
        data = await getVocabularyForPractice();
      } else {
        console.log("lesson Fetch");
        data = await getVocabularyByLesson(lessonNumber);
      }
      setLessonData(data);
      setOriginalLessonData(data);
    };

    fetchLessonData();
  }, [language, lessonNumber, practice]);

  const handleInputChange = (event) => {
    //console.log("Input changed:", event.target.value); // Add this line
    setInputValue(event.target.value);
  };

  const handleRepeatYesClick = () => {
    // Reset the lesson data
    setLessonData([...originalLessonData]);

    // Close the repeat dialog
    setOpenRepeatDialog(false);

    // Reset any other state variables as needed
    // For example, you might want to reset the progress and clear the input field
    setProgress(0);
    setInputValue("");
  };

  const handleRepeatNoClick = () => {
    // Code to execute when the "No" button in the Repeat dialog is clicked
    navigate("/");
  };

  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const handleButtonClick = () => {
    const inputValueLower = inputValue.toLowerCase();
    const correctAnswer =
      language === "CZ-RU"
        ? removeAccents(lessonData[0].word.toLowerCase())
        : removeAccents(lessonData[0].definition.toLowerCase());
    //console.log(inputValueLower);
    if (inputValueLower === correctAnswer) {
      // Remove the first item from the list
      let newLessonData = lessonData.slice(1);

      // Check if there are no more items in the list
      if (newLessonData.length === 0) {
        // Reset lessonData to originalLessonData
        newLessonData = [...originalLessonData];
        // Open the success dialog
        setOpenSuccessDialog(true);
      }

      api
        .updateVocabularyItem(lessonData[0]._id, {
          attempts: lessonData[0].attempts + 1,
        })
        .then(() => {
          console.log("Attempts increased");
        })
        .catch((error) => {
          console.error("Error updating item: ", error);
        });

      setLessonData(newLessonData);

      // Increase the progress
      setProgress(progress + 100 / originalLessonData.length);

      // Clear the input field
      setInputValue("");

      // Clear the correct answer
      setCorrectAnswer("");

      // Reset the incorrect answer flag
      setIsAnswerIncorrect(false);
    } else {
      api
        .updateVocabularyItem(lessonData[0]._id, {
          attempts: lessonData[0].attempts - 1,
        })
        .then(() => {
          console.log("Attempts increased");
        })
        .catch((error) => {
          console.error("Error updating item: ", error);
        });
      // Set the correct answer
      if (language === "RU-CZ") setCorrectAnswer(lessonData[0].definition);
      else {
        setCorrectAnswer(lessonData[0].word);
      }

      // Set the incorrect answer flag
      setIsAnswerIncorrect(true);

      // Check if the current item is the last item in the list
      if (lessonData.length === 1) {
        // Open the repeat dialog
        setOpenRepeatDialog(true);
      }
    }
  };

  const handleNext = () => {
    setLessonData(lessonData.slice(1));
    setInputValue("");
    setCorrectAnswer("");
    setIsAnswerIncorrect(false);
  };

  // ...rest of your component code...

  return (
    <div>
      <Dialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
      >
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You successfully repeated all the words!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/")}>OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRepeatDialog}
        onClose={() => setOpenRepeatDialog(false)}
      >
        <DialogTitle>Repeat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you wish to repeat wrong answers?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRepeatYesClick} variant="outlined">
            Yes
          </Button>
          <Button onClick={handleRepeatNoClick} variant="outlined">
            No
          </Button>
        </DialogActions>
      </Dialog>
      <p></p>
      <ProgressBar progress={progress} />
      <div>
        <p>Language: {language}</p>
        <p>Lesson Number: {lessonNumber}</p>
      </div>
      {lessonData && lessonData.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {language === "RU-CZ" ? (
            <>
              <h2>{lessonData[0].word}</h2>
              <label>
                <TextField
                  type="text"
                  name="definition"
                  value={inputValue}
                  autoComplete="off"
                  onChange={handleInputChange}
                  InputProps={{
                    classes: {
                      underline: classes.underline,
                    },
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      if (isAnswerIncorrect) {
                        // If the answer was incorrect, move to the next word
                        setLessonData(lessonData.slice(1));
                        setInputValue("");
                        setCorrectAnswer("");
                        setIsAnswerIncorrect(false);
                      } else {
                        // If the answer was not incorrect, check the current answer
                        handleButtonClick();
                      }
                    }
                  }}
                />
              </label>
            </>
          ) : (
            <>
              <p>{lessonData[0].definition}</p>
              <label>
                <TextField
                  type="text"
                  name="definition"
                  value={inputValue}
                  autoComplete="off"
                  onChange={handleInputChange}
                  InputProps={{
                    classes: {
                      underline: classes.underline,
                    },
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      if (isAnswerIncorrect) {
                        // If the answer was incorrect, move to the next word
                        setLessonData(lessonData.slice(1));
                        setInputValue("");
                        setCorrectAnswer("");
                        setIsAnswerIncorrect(false);
                      } else {
                        // If the answer was not incorrect, check the current answer
                        handleButtonClick();
                      }
                    }
                  }}
                />
              </label>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={isAnswerIncorrect ? handleNext : handleButtonClick}
            className={classes.checkButton}
          >
            {isAnswerIncorrect ? "Next" : "Check"}
          </Button>
          {correctAnswer && <p>Correct answer: {correctAnswer}</p>}
        </div>
      )}
    </div>
  );
};

export default PracticePage;
