import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import AllUsers from "./components/List/AllUsers";
import Register from "./components/Form/Register";

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<AllUsers />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
