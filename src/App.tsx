import React, {useReducer} from 'react';
import {Route, Routes} from "react-router-dom";
import {MainView} from "./views/MainView/MainView";
import {LoginView} from "./views/LoginView/LoginView";
import {RegisterView} from "./views/RegisterView/RegisterView";
import {userContext} from "./utils/UserContext";
import {userInitialState, userReducer} from "./utils/UserReducer";
import {BookView} from "./views/BookView/BookView";

export const App = () => {

  const [userState, dispatch] = useReducer(userReducer, userInitialState);

  return <userContext.Provider value={{
    userState,
    dispatch
  }}>
    <Routes>
      <Route path="/" element={<MainView/>}/>
      <Route path="/login" element={<LoginView/>}/>
      <Route path="/register" element={<RegisterView/>}/>
      <Route path="/book">
        <Route path=":id" element={<BookView/>}/>
      </Route>
    </Routes>
  </userContext.Provider>

}