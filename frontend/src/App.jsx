import { Routes, Route, Navigate } from "react-router-dom";

/* Pages */
import Home from "./pages/Home";
import PredictPage from "./pages/PredictPage";
import NewsPage from "./pages/NewsPage";
import Surveys from "./pages/Surveys";
import Chatbot from "./pages/Chatbot";

/* Components */
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/surveys" element={<Surveys />} />
        <Route path="/chatbot" element={<Chatbot />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
