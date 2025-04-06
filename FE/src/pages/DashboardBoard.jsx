import React, { useEffect, useContext } from 'react';
import { BoardContainer, ToolBox } from "../components";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataContext from "../context/DataContext";

const DashboardBoard = () => {
    const { loggedUser } = useContext(DataContext);

    useEffect(() => {
        if (loggedUser) {
            toast.success(`${loggedUser} is logged in`);
        }
    }, [loggedUser]);

    return (
        <div className="flex flex-col h-screen">
            <ToolBox />
            <BoardContainer />
            <ToastContainer />
        </div>
    );
};

export default DashboardBoard;
