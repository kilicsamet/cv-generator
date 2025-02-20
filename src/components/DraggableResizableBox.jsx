import { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";

const fontFamilyOptions = {
  normal: "Arial, sans-serif",
  serif: "Georgia, serif",
  monospace: "Courier New, monospace",
  handwriting: "Comic Sans MS, cursive",
  modern: "'Poppins', sans-serif",
  elegant: "'Playfair Display', serif",
  tech: "'Roboto Mono', monospace",
  clean: "'Inter', sans-serif",
};

function StyleControlPanel({ textStyle, handleStyleChange }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "320px",
        left: "10px",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        width: "370px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      onClick={(e) => e.stopPropagation()} // Panel tıklamalarında kapanmayı engelle
    >
      <label>
        Yazı Boyutu:
        <input
          type="number"
          value={parseInt(textStyle.fontSize)}
          onChange={(e) => handleStyleChange("fontSize", `${e.target.value}px`)}
          style={{ width: "50px" }}
        />
      </label>

      <label>
        Yazı Rengi:
        <input
          type="color"
          value={textStyle.color}
          onChange={(e) => handleStyleChange("color", e.target.value)}
        />
      </label>

      <label>
        Kalın:
        <input
          type="checkbox"
          checked={textStyle.fontWeight === "bold"}
          onChange={(e) => handleStyleChange("fontWeight", e.target.checked ? "bold" : "normal")}
        />
      </label>

      <label>
        Yazı Tipi:
        <select
          value={Object.keys(fontFamilyOptions).find(
            (key) => fontFamilyOptions[key] === textStyle.fontFamily
          )}
          onChange={(e) => handleStyleChange("fontFamily", fontFamilyOptions[e.target.value])}
          style={{ width: "150px" }}
        >
          {Object.keys(fontFamilyOptions).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function DraggableResizableBox({ id, text, position, size, updateBox }) {
  const [editableText, setEditableText] = useState(text);
  const [isEditing, setIsEditing] = useState(true);
  const [textStyle, setTextStyle] = useState({
    fontSize: "16px",
    color: "black",
    fontWeight: "normal",
    fontFamily: "Arial, sans-serif",
  });

  const boxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleStyleChange = (style, value) => {
    setTextStyle((prev) => ({ ...prev, [style]: value }));
  };

  return (
    <>
      <Rnd
        ref={boxRef}
        size={{ width: size.width, height: size.height }}
        position={{ x: position.x, y: position.y }}
        onDragStop={(e, d) => updateBox(id, { x: d.x, y: d.y }, size, editableText)}
        onResizeStop={(e, direction, ref, delta, position) =>
          updateBox(id, position, { width: ref.offsetWidth, height: ref.offsetHeight }, editableText)
        }
        style={{
          backgroundColor: isEditing ? "blue" : "transparent",
          color: textStyle.color,
          borderRadius: "5px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          userSelect: "none",
          border: isEditing ? "4px dashed white" : "4px solid white",
        }}
        onClick={() => setIsEditing(true)}
      >
        <div
          ref={inputRef}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onFocus={() => setIsEditing(true)}
          onInput={(e) => setEditableText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setIsEditing(false);
              updateBox(id, position, size, editableText);
            }
          }}
          style={{
            ...textStyle,
            outline: "none",
            textAlign: "center",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            wordBreak: "break-word",
            direction: "ltr",
            pointerEvents: isEditing ? "auto" : "none",
          }}
        >
          {editableText}
        </div>
      </Rnd>

      {isEditing && <StyleControlPanel textStyle={textStyle} handleStyleChange={handleStyleChange} />}
    </>
  );
}

export default DraggableResizableBox;
