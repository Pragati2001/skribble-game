import React, { useRef, useEffect, useState } from "react";
import "../../styles/main_page.css";
export default function Canvas({ socket }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const defaultStyle = "rgb(255, 255, 255)";
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = defaultStyle;
    contextRef.current = context;
    socket.on("draw/command", (commands) => {
      commands.forEach((batch) => {
        // console.log(batch[0], batch[1], batch[2], batch[3], batch[4]);
        if (batch[0] === 1) {
          eraseIt(batch[3], batch[4]);
        } else if (batch[0] === 0) {
          if (!batch[1]) {
            batch[1] = batch[3];
            batch[2] = batch[4];
          }
          drawIt(batch[1], batch[2], batch[3], batch[4]);
        }
      });
    });
  }, []);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraser, setEraser] = useState(false);
  let startX, startY;

  const handleMouseDown = (e) => {
    startX = e.nativeEvent.offsetX;
    startY = e.nativeEvent.offsetY;
    setIsDrawing(true);
  };

  let batch = [];
  let isRequestTimed = false;
  function sendDraw(command, currentX, currentY) {
    batch.push([command, startX, startY, currentX, currentY]);
    if (!isRequestTimed) {
      setTimeout(() => {
        socket.emit("draw/command", batch);
        isRequestTimed = false;
        batch = [];
      }, 50);
      isRequestTimed = true;
    }
  }

  function eraseIt(currentX, currentY) {
    contextRef.current.fillStyle = defaultStyle;
    contextRef.current.fillRect(currentX, currentY, 20, 20);
  }
  function drawIt(startX, startY, currentX, currentY) {
    contextRef.current.fillstyle = "rgb(0, 0, 0)";

    contextRef.current.beginPath();
    contextRef.current.moveTo(startX, startY);
    contextRef.current.lineTo(currentX, currentY);
    contextRef.current.stroke();
  }

  const handleMouseMove = (e) => {
    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;
    if (isDrawing) {
      if (eraser) {
        eraseIt(currentX, currentY);
        sendDraw(1, currentX, currentY);
      } else {
        drawIt(startX, startY, currentX, currentY);
        sendDraw(0, currentX, currentY);

        startX = currentX;
        startY = currentY;
      }
    }
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  const toggleEraser = () => {
    setEraser(true);
  };
  const selectPen = () => {
    setEraser(false);
  };
  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setEraser(false);
  };

  return (
    <>
      <div className="canvas-wrapper">
        <canvas
          className="canvas"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          width="800"
          height="500"
        ></canvas>
        <div className="tools">
          <button id="pencil" onClick={selectPen}>
            pencil
          </button>
          <button id="eraser" onClick={toggleEraser}>
            eraser
          </button>
          <button id="clear" onClick={clearCanvas}>
            clear
          </button>
        </div>
      </div>
    </>
  );
}
