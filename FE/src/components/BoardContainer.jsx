import React, { useRef, useEffect, useContext } from 'react';
import DataContext from "../context/DataContext";

const BoardContainer = () => {
    const canvasRef = useRef(null);
    const { color, size } = useContext(DataContext);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
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

            context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            context.stroke();
            context.beginPath();
            context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mousemove', draw);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mousemove', draw);
        };
    }, [color, size]);
        <div className="flex-1 bg-amber-100 p-2">
            <canvas
                ref={canvasRef}
                className="size-full ring-1 ring-black rounded-lg"
                width={800}
                height={600}
            />

        </div>
    );
};

export default BoardContainer;
