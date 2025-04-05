import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState("");
    const [token, setToken] = useState("");
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



    return (
        <DataContext.Provider
            value={{ color, setColor, size, setSize }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;