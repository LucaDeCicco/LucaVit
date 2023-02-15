import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import StickyFooter from "./components/Footer";
import InfoPage from "./pages/InfoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";

function App() {
  return (
    <>
        <ResponsiveAppBar/>
      <div  style={{minHeight:"80vh"}}>
          <Routes>
              <Route index element={<MainPage />} />
              <Route path="login" element={<Login />}/>
              <Route path="register" element={<Register />}/>
              <Route path="info" element={<InfoPage />}/>
              <Route path="test" element={<Test />}/>
          </Routes>
      </div>
        <StickyFooter />
    </>
  );
}

export default App;
