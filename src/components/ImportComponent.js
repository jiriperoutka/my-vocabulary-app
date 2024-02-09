import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { addVocabularyItem } from "../services/api";
import CircularProgress from "@material-ui/core/CircularProgress";

function ImportComponent() {
  const [open, setOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [lessonNumber, setLessonNumber] = useState("");
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const saveItems = async () => {
    if (uploadResult) {
      for (let item of uploadResult) {
        try {
          item.lesson = lessonNumber;
          await addVocabularyItem(item);
        } catch (error) {
          console.error("Failed to add item:", item, "Error:", error);
        }
      }
    }
  };

  const handleClose = () => {
    setLessonNumber(""); // or whatever your initial value is
    setFile(null); // or whatever your initial value is
    setOpen(false);
  };

  const handleResultClose = () => {
    setResultOpen(false);
  };

  const handleLessonNumberChange = (event) => {
    setLessonNumber(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImport = async () => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUploadResult(response.data);
        setResultOpen(true);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ height: "40px", marginLeft: "20px", color: "white" }}
      >
        Import Data
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Import Data</DialogTitle>
        <DialogContent>
          <div style={{ display: "block", justifyContent: "space-between" }}>
            <TextField
              autoFocus
              margin="dense"
              id="lesson"
              label="Lesson Number"
              type="number"
              fullWidth
              value={lessonNumber}
              onChange={handleLessonNumberChange}
              style={{ marginRight: "10px" }}
            />
            <div>
              <input
                accept=".jpeg,.jpg,.png,.gif"
                style={{ display: "none", height: "40px" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  <p>{file ? file.name : "Select File"}</p>
                </Button>
              </label>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleImport} color="primary" disabled={!file}>
            Import
          </Button>
        </DialogActions>
      </Dialog>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Dialog open={resultOpen} onClose={handleResultClose}>
          <DialogTitle>Upload Result</DialogTitle>
          <DialogContent>
            {uploadResult &&
              uploadResult.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id={`word-${index}`}
                    label="Word"
                    type="text"
                    fullWidth
                    value={item.word || ""}
                    onChange={(e) => {
                      const newUploadResult = [...uploadResult];
                      newUploadResult[index].word = e.target.value;
                      setUploadResult(newUploadResult);
                    }}
                    style={{ marginRight: "10px" }}
                  />
                  <TextField
                    margin="dense"
                    id={`definition-${index}`}
                    label="Definition"
                    type="text"
                    fullWidth
                    value={item.definition || ""}
                    onChange={(e) => {
                      const newUploadResult = [...uploadResult];
                      newUploadResult[index].definition = e.target.value;
                      setUploadResult(newUploadResult);
                    }}
                  />
                  <Button
                    color="secondary"
                    onClick={() => {
                      const newUploadResult = [...uploadResult];
                      newUploadResult.splice(index, 1);
                      setUploadResult(newUploadResult);
                    }}
                  >
                    <img
                      src="/bin.svg"
                      alt="Delete Item"
                      style={{ width: "30px", height: "30px" }}
                    ></img>
                  </Button>
                </div>
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleResultClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                saveItems();
                handleResultClose();
              }}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default ImportComponent;
