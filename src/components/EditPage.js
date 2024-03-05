import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { api } from "../services/api"; // import your api
import ColumnFilter from "./ColumnFilter";
import "../styles/App.css";
import { addVocabularyItem } from "../services/api.js";
import { deleteVocabularyItem } from "../services/api.js";
//import DialogContent from "@material-ui/core/DialogContent";
import ImportComponent from "../components/ImportComponent.js";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TablePagination from "@mui/material/TablePagination";

const EditPage = () => {
  const [vocabulary, setVocabulary] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({
    word: "",
    definition: "",
    lesson: "",
    score: "",
  });
  useEffect(() => {
    api
      .getVocabulary()
      .then((data) => setVocabulary(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleEdit = (item) => {
    setEditing(item._id);
    setEditData(item);
  };

  const handleBlur = () => {
    api.updateVocabularyItem(editing, editData).then((updatedItem) => {
      setVocabulary(
        vocabulary.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );
      setEditing(null);
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const [filters, setFilters] = React.useState({
    word: "",
    definition: "",
    lesson: "",
    score: "",
  });

  const setWordFilter = (value) =>
    setFilters((old) => ({ ...old, word: value }));
  const setDefinitionFilter = (value) =>
    setFilters((old) => ({ ...old, definition: value }));
  const setLessonFilter = (value) =>
    setFilters((old) => ({ ...old, lesson: value }));
  const setScoreFilter = (value) =>
    setFilters((old) => ({ ...old, score: value }));

  const [open, setOpen] = useState(false);

  const handleAddNewItem = () => {
    setOpen(true);
  };

  const [newItem, setNewItem] = useState({
    word: "",
    definition: "",
    lesson: "",
    // Add other fields as necessary
  });

  // Create a ref for the "Word" TextField
  const wordRef = React.useRef();

  React.useEffect(() => {
    if (wordRef.current) {
      wordRef.current.focus();
    }
  }, [newItem]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
      handleSaveNewItem(event);
      setTimeout(() => wordRef.current.focus(), 0);
    }
  };

  const handleSaveNewItem = async () => {
    // Call the addVocabularyItem function to save the item to the database
    const savedItem = await addVocabularyItem(newItem);

    // Check if the item was saved successfully
    if (savedItem) {
      // Update the vocabulary state with the saved item
      setVocabulary([...vocabulary, savedItem]);

      // Reset the new item state and set focus to wordRef
      setNewItem({
        word: "",
        definition: "",
        // Add other fields as necessary
      });
    }
    // Don't Close the dialog
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleDeleteItem = async (item) => {
    // Call the deleteVocabularyItem function to delete the item from the database
    const success = await deleteVocabularyItem(item._id);

    // If the deletion was successful, update the state
    if (success) {
      console.log("success");
      setVocabulary((old) => old.filter((oldItem) => oldItem._id !== item._id));
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: 30,
          marginTop: 30,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleAddNewItem}>
          Add New Item
        </Button>
        <ImportComponent />
      </div>
      <Dialog open={open} maxWidth="md" onClose={() => setOpen(false)}>
        <DialogTitle>Add New Item</DialogTitle>
        <TextField
          ref={wordRef}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoFocus
          margin="dense"
          id="word"
          label="RU"
          type="text"
          fullWidth
          value={newItem.word}
          onChange={(e) => setNewItem({ ...newItem, word: e.target.value })}
        />
        <TextField
          onKeyDown={handleKeyDown}
          autoComplete="off"
          margin="dense"
          id="definition"
          label="CZ"
          type="text"
          fullWidth
          value={newItem.definition}
          onChange={(e) =>
            setNewItem({ ...newItem, definition: e.target.value })
          }
        />
        <TextField
          onKeyDown={handleKeyDown}
          autoComplete="off"
          margin="dense"
          id="lesson"
          label="Lesson"
          type="text"
          fullWidth
          value={newItem.lesson}
          onChange={(e) => setNewItem({ ...newItem, lesson: e.target.value })}
        />
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewItem} color="primary">
            Save and continue
          </Button>
          <Button onClick={closeDialog}>Finish</Button>
        </DialogActions>
      </Dialog>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>
                <Box display="flex" flexDirection="column">
                  RU
                  <ColumnFilter
                    style={{ color: "white" }}
                    column={{
                      id: "word",
                      filterValue: filters.word,
                      setFilter: setWordFilter,
                    }}
                    className="white-text"
                  />
                </Box>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Box display="flex" flexDirection="column">
                  CZ
                  <ColumnFilter
                    column={{
                      id: "definition",
                      filterValue: filters.definition,
                      setFilter: setDefinitionFilter,
                    }}
                    className="white-text"
                  />
                </Box>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Box display="flex" flexDirection="column">
                  Lesson
                  <ColumnFilter
                    column={{
                      id: "lesson",
                      filterValue: filters.lesson,
                      setFilter: setLessonFilter,
                    }}
                    className="white-text"
                  />
                </Box>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Box display="flex" flexDirection="column">
                  Score
                  <ColumnFilter
                    column={{
                      id: "score",
                      filterValue: filters.score,
                      setFilter: setScoreFilter,
                    }}
                    className="white-text"
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vocabulary
              .filter((item) => {
                return (
                  (item.word ? item.word.includes(filters.word) : true) &&
                  (item.definition
                    ? item.definition.includes(filters.definition)
                    : true) &&
                  (item.lesson ? item.lesson.includes(filters.lesson) : true) &&
                  (item.score ? item.score.includes(filters.score) : true)
                );
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell
                    style={{ color: editing === item._id ? "black" : "white" }}
                  >
                    {editing === item._id ? (
                      <TextField
                        name="word"
                        value={editData.word}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          style: { color: "white" },
                        }}
                      />
                    ) : (
                      <span onClick={() => handleEdit(item)}>{item.word}</span>
                    )}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {editing === item._id ? (
                      <TextField
                        name="definition"
                        value={editData.definition}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          style: { color: "white" },
                        }}
                      />
                    ) : (
                      <span onClick={() => handleEdit(item)}>
                        {item.definition}
                      </span>
                    )}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {editing === item._id ? (
                      <TextField
                        name="lesson"
                        value={editData.lesson}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          style: { color: "white" },
                        }}
                      />
                    ) : (
                      <span onClick={() => handleEdit(item)}>
                        {item.lesson}
                      </span>
                    )}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {editing === item._id ? (
                      <TextField
                        name="score"
                        value={editData.score}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          style: { color: "white" },
                        }}
                      />
                    ) : (
                      item.attempts
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      style={{ color: "white" }}
                      onClick={() => handleDeleteItem(item)}
                    >
                      <img
                        src="/bin.svg"
                        alt="Delete Item"
                        style={{ width: "30px", height: "30px" }}
                      ></img>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={vocabulary.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default EditPage;
