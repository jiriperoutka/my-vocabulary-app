import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

const WhiteRadio = (props) => (
  <Radio
    {...props}
    sx={{
      color: "white",
      "&.Mui-checked": {
        color: "white",
      },
    }}
  />
);

const PracticePage = () => {
  const [data, setData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const questionFromLocalStorage = JSON.parse(
    localStorage.getItem("selectedExercise")
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionFromLocalStorage,
        }),
      });
      const data = await response.json();
      setData(data);
    };

    if (!data) {
      fetchData();
    }
  }, []);

  const handleChange = (event, question) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [question]: event.target.value,
    });
  };

  if (!data) {
    return "Preparing your test...";
  }

  // Assume data is your fetched data
  //const parsedData = JSON.parse(data.answer);

  return (
    <Box>
      <h1>Vokals Exeptions</h1>
      {data &&
        data.answer &&
        JSON.parse(data.answer).examples.map((example, index) => (
          <Box key={index} sx={{ marginBottom: 4 }}>
            <Typography variant="h6">{example.question}</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label={`question-${index}`}
                name={`question-${index}`}
                value={selectedAnswers[example.question] || ""}
                onChange={(e) => handleChange(e, example.question)}
              >
                {example.options.map((option, i) => (
                  <FormControlLabel
                    key={i}
                    value={option.text}
                    control={<WhiteRadio />}
                    label={option.text}
                  />
                ))}
              </RadioGroup>
              {selectedAnswers[example.question] &&
                selectedAnswers[example.question] !==
                  example.correct_answer && (
                  <FormHelperText error>
                    {example.feedback.incorrect}
                  </FormHelperText>
                )}
              {selectedAnswers[example.question] &&
                selectedAnswers[example.question] ===
                  example.correct_answer && (
                  <FormHelperText sx={{ color: "white" }}>
                    {example.feedback.correct}
                  </FormHelperText>
                )}
            </FormControl>
          </Box>
        ))}
    </Box>
  );
};

export default PracticePage;
