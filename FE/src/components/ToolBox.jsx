import React, { useContext, useEffect } from 'react';
import { LogoutIcon } from "../assets/icons";
import DataContext from "../context/DataContext";
import { io } from 'socket.io-client';
import { toast } from "react-toastify";

const ToolBox = () => {
    const { color, setColor, size, setSize, handleLogout, socketRef, loggedUser } = useContext(DataContext);

    useEffect(() => {
        socketRef.current = io('http://localhost:3001');
        if (socketRef.current) {
            socketRef.current.emit("userleft", loggedUser.name);
        }
        return () => {
            socketRef.current.disconnect();
        };
    }, [loggedUser]);

    return (
        <div className="flex bg-gray-300 items-center justify-evenly py-2 relative">
            <div className="flex items-center gap-2">
                <label htmlFor="color-picker" className="cursor-pointer">Color-Picker</label>
                <input type="color" name="color-picker" id="color-picker" className="rounded-full"
                    value={color} onChange={(e) => setColor(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="size-selector" className="cursor-pointer">Size</label>
                <input type="range" name="size-selector" id="size-selector" min={1} max={20}
                    value={size} onChange={(e) => setSize(e.target.value)} />
            </div>
            <div className="bg-gray-400 absolute  top-1 right-3 p-2 rounded-full cursor-pointer duration-200 opacity-75 hover:opacity-100" onClick={handleLogout}>
                <LogoutIcon className={"size-5"} />
            </div>
        </div>
    );
};

export default ToolBox;