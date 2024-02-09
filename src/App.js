import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Practice from "./components/Practice";
import EditLesson from "./components/EditLesson";
import PracticePage from "./components/PracticePage";
import EditPage from "./components/EditPage";
import Navbar from "./components/NavBar";

function HomePage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        src="/./bigLogoText.png"
        alt="Logo Text"
        style={{ width: "300px", height: "300px" }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <EditLesson />
        <Practice />
      </div>
      {/* other components specific to the home page */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/edit" element={<EditPage />} />
          {/* other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
