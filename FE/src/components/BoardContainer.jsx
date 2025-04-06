import React, { useRef, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import DataContext from "../context/DataContext";
import { toast } from 'react-toastify';

const BoardContainer = () => {
    const canvasRef = useRef(null);
    const { color, size, loggedUser } = useContext(DataContext);

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('http://localhost:3001');

        socketRef.current.on('canvas-data', (data) => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const img = new Image();
            img.src = data;
            img.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0);
            };
        });
        socketRef.current.on('loggeduser', (username) => {
            if (username !== loggedUser.name)
                toast.info(`${username} has joined`);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socketRef.current && loggedUser.name) {
            socketRef.current.emit("loggeduser", loggedUser.name);
        }
    }, [loggedUser]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const emitCanvasData = () => {
            const base64ImageData = canvas.toDataURL('image/png');
            socketRef.current.emit('canvas-data', base64ImageData);
        };

        if (canvas) {
            canvas.addEventListener('mouseup', emitCanvasData);
        }
        if (canvas) {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }

        return () => {
            if (canvas) {
                canvas.removeEventListener('mouseup', emitCanvasData);
            }
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const controller = new AbortController();
        const { signal } = controller;
        let drawing = false;

        const startDrawing = (e) => {
            drawing = true;
            draw(e);
        };

        const endDrawing = () => {
            drawing = false;
            context.beginPath();
        };

        const draw = (e) => {
            if (!drawing) return;
            context.lineWidth = size;
            context.lineCap = 'round';
            context.strokeStyle = color;

            const rect = canvas.getBoundingClientRect();
            context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            context.stroke();
            context.beginPath();
            context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        };

        canvas.addEventListener('mousedown', startDrawing, { signal });
        canvas.addEventListener('mouseup', endDrawing, { signal });
        canvas.addEventListener('mousemove', draw, { signal });

        return () => controller.abort();
    }, [color, size]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.lineWidth = size;
        context.strokeStyle = color;
    }, [color, size]);

    return <div className="flex-1 bg-amber-100 p-2 ">
        <canvas
            ref={canvasRef}
            className="size-full ring-1 ring-black rounded-lg w-full h-full"
        />
    </div>;
};

export default BoardContainer;
