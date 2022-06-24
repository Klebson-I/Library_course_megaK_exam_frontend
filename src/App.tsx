import React, {useReducer} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {MainView} from "./views/MainView/MainView";
import {LoginView} from "./views/LoginView/LoginView";
import {RegisterView} from "./views/RegisterView/RegisterView";
import {userContext} from "./utils/UserContext";
import {userInitialState, userReducer} from "./utils/UserReducer";
import {BookView} from "./views/BookView/BookView";
import {UserView} from "./views/UserView/UserView";

export const App = () => {

  const [userState, dispatch] = useReducer(userReducer, userInitialState);

  return <userContext.Provider value={{
    userState,
    dispatch
  }}>
    <Routes>

      <Route path="/" element={<MainView/>}/>

      <Route path="/login" element={
        userState.id !== "" ?
            <Navigate to="/user"/>
            : <LoginView/>
      }/>

      <Route path="/user" element={<UserView/>}/>

      <Route path="/register" element={<RegisterView/>}/>

      <Route path="/book">
        <Route path=":id" element={<BookView/>}/>
      </Route>

    </Routes>
  </userContext.Provider>

}