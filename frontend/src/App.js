import PrivateRoute from "./utilis/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";


import { Header } from "./components";
import { Signup, Login, Profile, UpdateProfile } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-full min-h-screen">
      <AuthProvider>
        <Header />
        <Routes>
            <Route exact path="/login" element={ <Login /> } />
            <Route path="/signup" element={ <Signup /> } />
            <Route path="/" element={ 
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
             } />
             <Route path="/update:id" element={ 
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
             } />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
