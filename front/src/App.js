import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import React, { createContext, useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import DisplaySinglePost from "./pages/DisplaySinglePost";
import CreatePost from "./pages/CreatePost";
import RequireAuth from "./RequireAuth";
import ModifyPost from "./pages/ModifyPost";

export const authContext = createContext();

export default function App(){
    const [auth, setAuth] = useState({userId: null, token: null});

    return(
        <authContext.Provider value={{auth, setAuth}}>
            <Router>
                <Routes>
                    <Route path="*" element={<h1>Page not found</h1>} />
                    <Route exact path="/" element={<Login />} />
                    <Route element ={<RequireAuth />}>
                        <Route path="/home" element={<Home />}/>
                        <Route path="/post/:postId" element={<DisplaySinglePost />} />
                        <Route path="/post/:postId/edit" element={<ModifyPost />} />
                        <Route path="/post/new" element={<CreatePost />} />
                    </Route>
                </Routes>
            </Router>
        </authContext.Provider>
    )
}





