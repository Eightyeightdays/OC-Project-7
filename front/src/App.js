import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import React, { createContext, useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import RequireAuth from "./RequireAuth";
import EditPost from "./pages/EditPost";

export const authContext = createContext();

// export default function App(){
//     const [auth, setAuth] = useState({userId: null, token: null, admin: false});

//     return(
//         <authContext.Provider value={{auth, setAuth}}>
//             <Router>
//                 <Routes>
//                     <Route path="*" element={<h1>Page not found</h1>} />
//                     <Route path="/" element={<Login />} />
//                     <Route element ={<RequireAuth />}>
//                         <Route path="/home" element={<Home />}/>
//                         <Route path="/post/:postId" element={<SinglePost />} />
//                         <Route path="/post/:postId/edit" element={<EditPost />} />
//                         <Route path="/post/new" element={<CreatePost />} />

//                     </Route>
//                 </Routes>
//             </Router>
//         </authContext.Provider>
//     )
// }

export default function App() {
    const [auth, setAuth] = useState({userId: null, token: null, admin: false});
    return (
        <authContext.Provider value={{auth, setAuth}}>
            <Router>
                <Routes>
                    <Route path="*" element={<h1>Page not found</h1>} />
                    <Route path="/" element={<Login />} />
                    <Route
                    path="/home"
                    element={
                        <RequireAuth redirectTo="/">
                            <Home path="/home"/>
                        </RequireAuth>
                    }
                    />
                    <Route
                    path="/post/:postId"
                    element={
                        <RequireAuth redirectTo="/">
                            <SinglePost path="/post/:postId" />
                        </RequireAuth>
                    }
                    />
                    <Route
                    path="/post/new"
                    element={
                        <RequireAuth redirectTo="/">
                            <CreatePost path="/post/new" />
                        </RequireAuth>
                    }
                    />
                    <Route
                    path="/post/:postId/edit"
                    element={
                        <RequireAuth redirectTo="/">
                            <EditPost path="/post/:postId/edit" />
                        </RequireAuth>
                    }
                    />
                </Routes>
            </Router>
        </authContext.Provider>
    );
  }

  
                           
                            




