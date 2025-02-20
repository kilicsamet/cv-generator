import React from "react";
import { Rnd } from "react-rnd";

function DraggableToolVerticalBox({ id, position, size, updateToolVertical }) {
  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => updateToolVertical(id, { x: d.x, y: d.y }, size)}
      onResizeStop={(e, direction, ref, delta, position) =>
        updateToolVertical(id, position, {
          width: 1,
          height: ref.offsetHeight,
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
    />
  );
}

export default DraggableToolVerticalBox;
