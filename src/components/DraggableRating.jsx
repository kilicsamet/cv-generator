import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { FaStar } from "react-icons/fa";

function DraggableRating({ id, position, size, updateRating }) {
  const [rating, setRating] = useState(0);

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => updateRating(id, { x: d.x, y: d.y }, size, rating)}
      onResizeStop={(e, direction, ref, delta, position) =>
        updateRating(
          id,
          position,
          { width: ref.offsetWidth, height: ref.offsetHeight },
          rating
        )
      }
      style={{
        backgroundColor: "transparent",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab",
        userSelect: "none",
        padding: "5px",
        color: "gold",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size.height / 2}
          style={{ cursor: "pointer" }}
          color={star <= rating ? "black" : "gray"}
          onClick={() => setRating(star)}
        />
      ))}
    </Rnd>
  );
}

export default DraggableRating;
