import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getVocabulary = async () => {
  try {
    const response = await axios.get(`${API_URL}/vocabulary`);
    console.log("here");
    return response.data;
  } catch (error) {
    console.error(`Error fetching vocabulary: ${error}`);
  }
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error uploading file: ${error}`);
  }
};

export const getVocabularyForPractice = async () => {
  try {
    const response = await axios.get(`${API_URL}/vocabulary/attempts/4`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vocabulary item: ${error}`);
  }
};

export const getVocabularyByLesson = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/vocabulary/lesson/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vocabulary item: ${error}`);
  }
};

export const addVocabularyItem = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/vocabulary`, item);
    return response.data;
  } catch (error) {
    console.error(`Error adding vocabulary item: ${error}`);
  }
};

export const deleteVocabularyItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/vocabulary/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting vocabulary item: ${error}`);
  }
};

export const getLessons = async () => {
  return fetch(`${API_URL}/lessons`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const api = {
  // Existing code...
  updateVocabularyItem: function (id, updatedItem) {
    return fetch(`${API_URL}/vocabulary/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  // other methods...
  getVocabulary: function () {
    return fetch(`${API_URL}/vocabulary`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  // other methods...
};
