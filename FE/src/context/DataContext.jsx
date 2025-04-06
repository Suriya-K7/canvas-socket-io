import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState("");
    const [token, setToken] = useState(null);
    const [resetToken, setResetToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [config, setConfig] = useState({
        headers: {
            authorization: `bearer ${token}`,
        },
    });

    // states for canvas

    const [color, setColor] = useState("#000");
    const [size, setSize] = useState(2);
    const socketRef = useRef(null);

    useEffect(() => {
        let authToken = localStorage.getItem("authToken");
        if (authToken) setToken(authToken);
    }, []);




    const handleLogin = async (email, password) => {
        try {
            const payload = { email, password };
            const response = await Api.post("/auth/login", payload);
            setToken(response.data.token);
            setLoggedUser(response.data.user);
            localStorage.setItem("authToken", response.data.token);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
        setLoggedUser("");
    };



    return (
        <DataContext.Provider
            value={{ color, setColor, size, setSize, handleLogin, handleLogout, token, loggedUser, socketRef }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
