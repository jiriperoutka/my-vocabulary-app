// Exercises.js
import React from "react";
import { Link } from "react-router-dom";
import { Modal, Box, Button, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import { GrYoga } from "react-icons/gr";

function Exercises() {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  const exercises = [
    {
      id: 1,
      name: "Учить vs. Учиться",
      promt:
        "Give me a test of 2 examples of differences between учить and учиться",
    },
    {
      id: 2,
      name: "Исклучение предложный подеж",
      promt:
        "Give me a test of 2 examples for the exception of the VOCAL case, like берег, уголь, сад, луг етс.",
    },
    { id: 3, name: "Exercise 3" },
    // Add more exercises as needed
  ];

  const [selectedExercise, setSelectedExercise] = useState(() => {
    // Try to get the selected exercise from local storage when initializing state
    const saved = localStorage.getItem("selectedExercise");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  function handleChange(event) {
    const selectedId = Number(event.target.value);
    setSelectedExercise(selectedId);

    // Find the selected exercise by its id
    const selectedExercise = exercises.find(
      (exercise) => exercise.id === selectedId
    );

    // Save the prompt of the selected exercise to local storage
    if (selectedExercise && selectedExercise.promt) {
      localStorage.setItem(
        "selectedExercise",
        JSON.stringify(selectedExercise.promt)
      );
    }
  }

  return (
    <section>
      <div onClick={handleOpen} className="lesson edit-lesson">
        <div>Exercises</div>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#efd6ac",
              boxShadow: 24,
              p: 4,
              width: 680, // Set the width to 680px
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "300px", // Set a minimum height to ensure space for buttons
            }}
          >
            <div>
              <h2 style={{ color: "black" }}>Select an Exercise</h2>
              {/* Add your list of exercises here */}
            </div>
            <TextField
              select
              label="Select an Exercise"
              value={selectedExercise}
              onChange={handleChange}
            >
              {exercises.map((exercise) => (
                <MenuItem key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </MenuItem>
              ))}
            </TextField>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button component={Link} to="/exercises">
                Start Exercise
              </Button>
              <Button onClick={handleClose} color="error">
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
        <GrYoga size="8em" />
      </div>
    </section>
  );
}

export default Exercises;
