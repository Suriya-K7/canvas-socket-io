import React from "react";
import { Modal, Box } from "@mui/material";

const ModalBox = ({ open, onClose, children }) => {
    return (
        <Modal open={open} onClose={onClose} className="flex items-center justify-center">
            <Box
                className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px] border border-gray-700 transition-all transform scale-95"
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <h2 className="text-lg font-semibold">Demo Login Id</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition duration-200 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
                {/* Modal Content */}
                <div className="mt-4 flex flex-col gap-2">{children}</div>
                {/* Modal Footer */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalBox;
