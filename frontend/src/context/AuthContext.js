import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({children}) => {

    
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)

    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState([])

    

    const navigate = useNavigate()


    const loginUser = async (e) => {
        e.preventDefault()
   
        const response = await fetch('http://127.0.0.1:8000/account/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization: 'Bearer' + localStorage.getItem('access')
            },
            body:JSON.stringify({
                'username':e.target.username.value, 
                'password':e.target.password.value
            })
        })
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens()
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Something went wrong!')
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const updateToken = async () => {
        const response = await fetch('http://127.0.0.1:8000/account/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        })
       
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    

    useEffect(() => {
        if(authTokens === null || authTokens === undefined) {
            console.error('authTokens is null or undefined')
            return;
        }
        getProfile()
    }, [authTokens])
      
      const getProfile = async () => {
        if(!authTokens) {
            setLoading(false)
            console.error('authTokens is null')
        }
      
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`,
              },
            });
        
            const data = response.data;
            console.log(data);
        
            if (response.status === 200) {
              setProfile(data);
            } else if (response.statusText === 'Unauthorized access') {
              logoutUser();
            }
          } catch (error) {
            // Handle error case
            console.log(error)
          }
        };
      

    const contextData = {
        user:user,
        profile:profile,
        loading:loading,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    useEffect(()=>{
        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    },[authTokens])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}