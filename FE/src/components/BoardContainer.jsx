import React, { useRef, useEffect, useContext } from 'react';
import DataContext from "../context/DataContext";

const BoardContainer = () => {
    const canvasRef = useRef(null);
    const { color, size } = useContext(DataContext);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
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
