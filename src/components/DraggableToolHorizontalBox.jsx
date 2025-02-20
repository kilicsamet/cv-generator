import React from "react";
import { Rnd } from "react-rnd";

function DraggableToolHorizontalBox({ id, position, size, updateToolHorizontal }) {
  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => updateToolHorizontal(id, { x: d.x, y: d.y }, size)}
      onResizeStop={(e, direction, ref, delta, position) =>
        updateToolHorizontal(id, position, {
          width: ref.offsetWidth,
          height: 1,
        })
      }
      style={{
        backgroundColor: "black",
        borderRadius: "3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab",
        userSelect: "none",
        padding: "1px",
        border: "20px solid white",
      }}
    ></Rnd>
  );
}

export default DraggableToolHorizontalBox;
