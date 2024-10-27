import React, { useState, useEffect, useRef } from "react";

const ImageSlider = ({ images = [] }) => {
  const swiperRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  useEffect(() => {
    if (swiperRef.current && window.Swiper) {
      // Swiper 초기화
      new window.Swiper(swiperRef.current, {
        spaceBetween: 5,
        slidesPerView: 4,
        loop: true,
      });
    }
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true); // 모달 상태를 열림으로 변경
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false); // 모달 상태를 닫음으로 변경
  };

  return (
    <div>
      <div
        className="swiper"
        style={{ zIndex: isModalOpen ? -1 : 1 }}
        ref={swiperRef}
      >
        <div className="swiper-wrapper">
          {images.map((image, index) => (
            <div
              className="swiper-slide"
              key={index}
              onClick={() => handleImageClick(image)}
            >
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
