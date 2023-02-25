import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import StickyFooter from "./components/Footer";
import InfoPage from "./pages/InfoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";
import AddAnnouncement from "./pages/AddAnnouncement";
import '../src/style/app.css';
import FilteredAnnouncementsPage from "./pages/FilteredAnnouncementsPage";
import AnnouncementPage from "./pages/AnnouncementPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    //TODO
  return (
    <>
        <ResponsiveAppBar/>

      <div className={"mainDiv"}>
          <Routes>
              <Route index element={<MainPage />} />
              <Route path="login" element={<Login />}/>
              <Route path="register" element={<Register />}/>
              <Route path="info" element={<InfoPage />}/>
              <Route path="test" element={<Test />}/>
              <Route path="addAnnouncement" element={<AddAnnouncement />}/>
              <Route path="filteredAnnouncements" element={<FilteredAnnouncementsPage />}/>
              <Route path="/announcement/:id" element={<AnnouncementPage />}/>
              <Route path="/profile/:username" element={<ProfilePage />}/>
          </Routes>
      </div>
        <StickyFooter />
    </>
  );
}

export default App;
