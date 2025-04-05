import React from 'react';
import { BoardContainer, ToolBox } from "../components";

const DashboardBoard = () => {
    return (
        <div className="flex flex-col h-screen gap-1">
            <ToolBox />
            <BoardContainer />
        </div>
    );
};

export default DashboardBoard;