import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import StickyFooter from "./Components/Footer";
import InfoPage from "./Pages/InfoPage";

function App() {
  return (
    <>
        <ResponsiveAppBar/>
      <div  style={{minHeight:"80vh"}}>
          <Routes>
              <Route index element={<MainPage />} />
              <Route path="info" element={<InfoPage />}/>
          </Routes>
      </div>
        <StickyFooter />
    </>
  );
}

export default App;
