import React from 'react';
import {Route, Router, Routes} from "react-router-dom";
import {MainView} from "./views/MainView/MainView";
import {LoginView} from "./views/LoginView/LoginView";
import {RegisterView} from "./views/RegisterView/RegisterView";

export const App = () => {
  return <Routes>
    <Route path="/" element={<MainView/>}/>
    <Route path="/login" element={<LoginView/>}/>
    <Route path="/register" element={<RegisterView/>}/>
  </Routes>
}