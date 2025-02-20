import { useState } from "react";
import {
  FaDownload,
  FaGripLines,
  FaImage,
  FaPlus,
  FaStar,
} from "react-icons/fa";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DraggableResizableBox from "./components/DraggableResizableBox";
import DraggableResizableImage from "./components/DraggableResizableImage";
import DraggableToolHorizontalBox from "./components/DraggableToolHorizontalBox";
import DraggableToolVerticalBox from "./components/DraggableToolVerticalBox";
import DraggableRating from "./components/DraggableRating";

const exportToPDF = () => {
  const input = document.getElementById("cv-container");

  html2canvas(input, {
    scale: 2, // Çözünürlüğü 2 katına çıkarır
    useCORS: true, // Dış kaynaklı resimler için CORS izni
    logging: true, // Hata ayıklama için
    allowTaint: true, // Dış kaynaklı resimler için
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0); // Yüksek kaliteli PNG
    const pdf = new jsPDF("p", "mm", "a4"); // A4 boyutunda dikey PDF
    const imgWidth = 210; // A4 genişliği (mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("cv.pdf");
  });
};
export default function App() {
  const [boxes, setBoxes] = useState([]);
  const [images, setImages] = useState([]);
  const [toolHorizontals, setToolHorizontals] = useState([]);
  const [toolVerticals, setToolVerticals] = useState([]);
  const [ratings, setRatings] = useState([]);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  function updateToolVertical(id, newPosition, newSize) {
    setToolVerticals((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id ? { ...box, position: newPosition, size: newSize } : box
      )
    );
  }

  function handleCreateToolVertical() {
    const newId = `toolVertical-${toolVerticals.length + 1}`;
    setToolVerticals([
      ...toolVerticals,
      {
        id: newId,
        position: {
          x: screenWidth * 0.2 - 20,
          y: screenHeight * 0.3,
        },
        size: { width: 1, height: 150 },
      },
    ]);
  }

  function updateToolHorizontal(id, newPosition, newSize) {
    setToolHorizontals((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id ? { ...box, position: newPosition, size: newSize } : box
      )
    );
  }

  function handleCreateToolHorizontal() {
    const newId = `toolHorizontal-${toolHorizontals.length + 1}`;
    setToolHorizontals([
      ...toolHorizontals,
      {
        id: newId,
        position: {
          x: screenWidth * 0.2 - 20,
          y: screenHeight * 0.3,
        },
        size: { width: 150, height: 1 },
      },
    ]);
  }
  function updateBox(id, newPosition, newSize, newText) {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id
          ? { ...box, position: newPosition, size: newSize, text: newText }
          : box
      )
    );
  }

  function updateImage(id, newPosition, newSize, newSrc) {
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === id
          ? { ...img, position: newPosition, size: newSize, src: newSrc }
          : img
      )
    );
  }

  function handleCreateBox() {
    const newId = `box-${boxes.length + 1}`;
    setBoxes([
      ...boxes,
      {
        id: newId,
        text: `Kutu ${boxes.length + 1}`,
        position: {
          x: screenWidth * 0.2 - 20,
          y: screenHeight * 0.3,
        },
        size: { width: 150, height: 50 },
      },
    ]);
  }

  function handleCreateImage() {
    const newId = `img-${images.length + 1}`;
    setImages([
      ...images,
      {
        id: newId,
        src: "",
        position: {
          x: screenWidth * 0.2 - 20,
          y: screenHeight * 0.3,
        },
        size: { width: 150, height: 150 },
      },
    ]);
  }

  function updateRating(id, newPosition, newSize, newRating) {
    setRatings((prevRatings) =>
      prevRatings.map((rating) =>
        rating.id === id
          ? {
              ...rating,
              position: newPosition,
              size: newSize,
              rating: newRating,
            }
          : rating
      )
    );
  }

  function handleCreateRating() {
    const newId = `rating-${ratings.length + 1}`;
    setRatings([
      ...ratings,
      {
        id: newId,
        position: {
          x: screenWidth * 0.2 - 20,
          y: screenHeight * 0.3,
        },
        size: { width: 120, height: 40 },
        rating: 0,
      },
    ]);
  }

  return (
    <div className="flex h-screen">
      {/* Sol Panel - Araç Çubuğu */}
      <div className="w-96 bg-gray-100 p-4 space-y-2 fixed shadow-md">
        {" "}
        {/* Genişlik w-96 olarak artırıldı */}
        <button
          onClick={handleCreateBox}
          className="flex items-center gap-2 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          <FaPlus /> Yeni Kutu Ekle
        </button>
        <button
          onClick={handleCreateImage}
          className="flex items-center gap-2 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <FaImage /> Yeni Görsel Ekle
        </button>
        <button
          onClick={handleCreateToolHorizontal}
          className="flex items-center gap-2 w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          <FaGripLines /> Yatay Çizgi Ekle
        </button>
        <button
          onClick={handleCreateToolVertical}
          className="flex items-center gap-2 w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          <FaGripLines className="rotate-90" /> Dikey Çizgi Ekle
        </button>
        <button
          onClick={handleCreateRating}
          className="flex items-center gap-2 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <FaStar /> Yeni Rating Ekle
        </button>
        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          <FaDownload /> PDF olarak kaydet
        </button>
      </div>

      {/* Sağ Panel - CV Oluşturma Alanı */}
      <div className="flex-1 flex justify-center items-center bg-gray-50">
        {" "}
        {/* Ortalama için flex ve justify-center eklendi */}
        <div
          id="cv-container"
          className="w-[794px] h-[1123px] bg-white border border-gray-300 shadow-lg p-6 overflow-hidden"
        >
          <div className="w-full h-full p-4">
            {boxes.map((box) => (
              <DraggableResizableBox
                key={box.id}
                id={box.id}
                text={box.text}
                position={box.position}
                size={box.size}
                updateBox={updateBox}
              />
            ))}

            {images.map((image) => (
              <DraggableResizableImage
                key={image.id}
                id={image.id}
                src={image.src}
                position={image.position}
                size={image.size}
                updateImage={updateImage}
              />
            ))}

            {toolHorizontals.map((box) => (
              <DraggableToolHorizontalBox
                key={box.id}
                id={box.id}
                text={box.text}
                position={box.position}
                size={box.size}
                updateToolHorizontal={updateToolHorizontal}
              />
            ))}

            {toolVerticals.map((box) => (
              <DraggableToolVerticalBox
                key={box.id}
                id={box.id}
                text={box.text}
                position={box.position}
                size={box.size}
                updateToolVertical={updateToolVertical}
              />
            ))}

            {ratings.map((rating) => (
              <DraggableRating
                key={rating.id}
                id={rating.id}
                position={rating.position}
                size={rating.size}
                updateRating={updateRating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
