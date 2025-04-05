import React, { useContext } from 'react';
import { LogoutIcon } from "../assets/icons";
import DataContext from "../context/DataContext";

const ToolBox = () => {
    const { color, setColor, size, setSize } = useContext(DataContext);

    return (
        <div className="flex bg-gray-300 items-center justify-evenly py-3 relative">
            <div className="flex items-center gap-2">
                <label htmlFor="color-picker" className="cursor-pointer">Color-Picker</label>
                <input type="color" name="color-picker" id="color-picker" className="rounded-full"
                    value={color} onChange={(e) => setColor(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="size-selector" className="cursor-pointer">Size</label>
                <input type="range" name="size-selector" id="size-selector" min={1} max={10}
                    value={size} onChange={(e) => setSize(e.target.value)} />
            </div>
            <div className="bg-gray-400 absolute top-1 right-3 p-2 rounded-full cursor-pointer duration-200 opacity-75 hover:opacity-100">
                <LogoutIcon />
            </div>
        </div>
    );
};

export default ToolBox;