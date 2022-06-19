import React from 'react';
import {Route, Router, Routes} from "react-router-dom";
import {MainView} from "./views/MainView/MainView";
import {LoginView} from "./views/LoginView/LoginView";

export const App = () => {
  return <Routes>
    <Route path="/library" element={<MainView/>}/>
    <Route path="/library/login" element={<LoginView/>}/>
  </Routes>
}