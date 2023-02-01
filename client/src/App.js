import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import StickyFooter from "./Components/Footer";

function App() {
  return (
    <>
        <ResponsiveAppBar/>
      <div>
          <Routes>
              <Route index element={<MainPage />} />
          </Routes>
      </div>
        <StickyFooter />
    </>
  );
}

export default App;
