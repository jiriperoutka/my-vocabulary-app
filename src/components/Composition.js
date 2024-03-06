import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import { GrDocumentTxt } from "react-icons/gr";
import CircularProgress from "@mui/material/CircularProgress";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import { Typography } from "@mui/material";

function Composition() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(localStorage.getItem("text") || "");
  const [validation, setValidation] = useState("");
  const [openSecondModal, setOpenSecondModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("isLoading is now " + isLoading);
  }, [isLoading]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
    localStorage.setItem("text", event.target.value);
  };

  const handleCheckComposition = async () => {
    handleClose(); // Close the first modal
    setIsLoading(true);
    setTimeout(handleOpenSecondModal, 0); // Open the second modal
    try {
      const response = await fetch("api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await response.json();
      let answer =
        typeof data.answer === "string" ? data.answer : data.answer.toString();
      setValidation(answer);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the API call
      console.log(isLoading);
    }
  };

  return (
    <section>
      <div onClick={handleOpen} className="lesson edit-lesson">
        <div>Composition</div>
        <GrDocumentTxt size="8em" />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            bgcolor: "#efd6ac",
            borderRadius: 2,
            boxShadow: 24,
            width: 500,
            height: 600,
          }}
        >
          <h1 style={{ color: "black" }}>Let AI check your composition</h1>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Paste your text here"
            type="text"
            fullWidth
            multiline
            rows={8}
            value={text}
            onChange={handleTextChange}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleCheckComposition}>Check</Button>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openSecondModal}
        onClose={handleCloseSecondModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#efd6ac",
            boxShadow: 24,
            p: 4,
            color: "black",
            overflow: "auto",
            maxHeight: "90vh",
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={80} />
              <Typography variant="h6" component="div" gutterBottom>
                AI is validating your text
              </Typography>
            </Box>
          ) : (
            <ReactMarkdown>{validation.toString()}</ReactMarkdown>
          )}
        </Box>
      </Modal>
    </section>
  );
}

export default Composition;
