import React, {useContext, useReducer} from 'react';
import {Route, Router, Routes} from "react-router-dom";
import {MainView} from "./views/MainView/MainView";
import {LoginView} from "./views/LoginView/LoginView";
import {RegisterView} from "./views/RegisterView/RegisterView";
import {userContext} from "./utils/UserContext";
import {userInitialState, userReducer} from "./utils/UserReducer";

export const App = () => {

  const context = useContext(userContext);

  const [userState,dispatch] = useReducer(userReducer,userInitialState);

  return <userContext.Provider value={{
    userState,
    dispatch
  }}>
    <Routes>
      <Route path="/" element={<MainView/>}/>
      <Route path="/login" element={<LoginView/>}/>
      <Route path="/register" element={<RegisterView/>}/>
    </Routes>
  </userContext.Provider>

}