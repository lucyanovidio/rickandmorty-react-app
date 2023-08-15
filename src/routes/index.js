import React from "react";
import Home from "../pages/Home/Home";
import SingleChar from "../pages/SingleChar/SingleChar";
import Favorites from "../pages/Favorites/Favorites";
import Erro from "../pages/Erro/Erro";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/character/:id" element={<SingleChar />}></Route> 
                <Route path="/favorites" element={<Favorites />}></Route>
                <Route path="*" element={<Erro />}></Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;