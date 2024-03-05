import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { GrDocumentTxt } from "react-icons/gr";

function Composition() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(localStorage.getItem("text") || "");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
    localStorage.setItem("text", event.target.value);
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
            <Button component={Link} to="/exercises">
              Check Composition
            </Button>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </section>
  );
}

export default Composition;
