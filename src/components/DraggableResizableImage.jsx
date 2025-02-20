import { useState, useRef } from "react";
import { Rnd } from "react-rnd";

function DraggableResizableImage({ id, src, position, size, updateImage }) {
  const [imageSrc, setImageSrc] = useState(src);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        updateImage(id, position, size, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => updateImage(id, { x: d.x, y: d.y }, size, imageSrc)}
      onResizeStop={(e, direction, ref, delta, position) =>
        updateImage(id, position, { width: ref.offsetWidth, height: ref.offsetHeight }, imageSrc)
      }
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee",
        cursor: "pointer",
      }}
      onDoubleClick={() => fileInputRef.current.click()}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Eklenen Görsel"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
      ) : (
        <div style={{ textAlign: "center", color: "#555" }}>
          Görsel eklemek için tıklayın
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </Rnd>
  );
}

export default DraggableResizableImage;