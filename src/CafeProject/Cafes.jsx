import React, { useState, useEffect } from "react";
import Cafe from "./Cafe";
import AddInfoForm from "./AddInfoForm";
import GoogleMap from "./GoogleMap";
import SearchContext from "./SearchContext";

const Cafeinfos = [
  {
    id: 1,
    name: "어스17",
    address: "강원특별자치도 춘천시 신북읍 천전리 36-2",
    stars: 4.7,
    review: "경치 뷰가 좋은곳.",
    lat: 37.93272575674,
    lon: 127.793860140086,
    S_time: "07:00",
    E_time: "15:00",
    images: [
      "/images/cafe1.jpg",
      "/images/cafe2.jpg",
      "/images/cafe3.jpg",
      "/images/cafe4.jpg",
      "/images/cafe5.jpg",
      "/images/cafe6.jpg",
      "/images/cafe7.jpg",
    ],
  },
  {
    id: 2,
    name: "지내리429-1",
    address: "강원특별자치도 춘천시 신북읍 지내리 429-1",
    stars: 4.2,
    review: "조용하고 한적한 차분한 분위기",
    lat: 37.9526444910233,
    lon: 127.737319517451,
    S_time: "07:00",
    E_time: "15:00",
    images: [
      "/images/cafe1.jpg",
      "/images/cafe2.jpg",
      "/images/cafe3.jpg",
      "/images/cafe4.jpg",
      "/images/cafe5.jpg",
      "/images/cafe6.jpg",
      "/images/cafe7.jpg",
    ],
  },
  {
    id: 3,
    name: "카페컴포어",
    address: "강원특별자치도 춘천시 퇴계동 493-3",
    stars: 4.5,
    review: "넓은 내부공간과 좌석, 접근성",
    lat: 37.8485720321722,
    lon: 127.731842550021,
    S_time: "07:00",
    E_time: "15:00",
    images: [
      "/images/cafe1.jpg",
      "/images/cafe3.jpg",
      "/images/cafe4.jpg",
      "/images/cafe2.jpg",
      "/images/cafe6.jpg",
      "/images/cafe7.jpg",
      "/images/cafe5.jpg",
    ],
  },
  {
    id: 4,
    name: "리버레인",
    address: "강원특별자치도 춘천시 영서로 2529-47",
    stars: 4.0,
    review: "사람이 많긴하나 뷰가 맛집인 곳",
    lat: 37.8846324785358,
    lon: 127.712050525076,
    S_time: "07:00",
    E_time: "15:00",
    images: [
      "/images/cafe7.jpg",
      "/images/cafe6.jpg",
      "/images/cafe5.jpg",
      "/images/cafe4.jpg",
      "/images/cafe3.jpg",
      "/images/cafe2.jpg",
      "/images/cafe1.jpg",
    ],
  },
  {
    id: 5,
    name: "와이어드커피(Wired Coffee)",
    address: "강원특별자치도 춘천시 동내면 순환대로 632",
    stars: 4.4,
    review: "빵이 맛있는집",
    lat: 37.8398440432871,
    lon: 127.762180269185,
    S_time: "07:00",
    E_time: "15:00",
    images: [
      "/images/cafe7.jpg",
      "/images/cafe5.jpg",
      "/images/cafe3.jpg",
      "/images/cafe1.jpg",
      "/images/cafe2.jpg",
      "/images/cafe4.jpg",
      "/images/cafe6.jpg",
    ],
  },
  {
    id: 6,
    name: "라타르타(LATARTA)",
    address: "강원특별자치도 춘천시 동면 순환대로 1154-53",
    stars: 4.7,
    review: "타르트가 맛있고, 분위기좋음.",
    lat: 37.8875844320993,
    lon: 127.776340574548,
    S_time: "07:00",
    E_time: "15:00",
    images: [
      "/images/cafe1.jpg",
      "/images/cafe2.jpg",
      "/images/cafe3.jpg",
      "/images/cafe4.jpg",
      "/images/cafe5.jpg",
      "/images/cafe6.jpg",
      "/images/cafe7.jpg",
    ],
  },
  {
    id: 7,
    name: "데이글로우(Dayglow)",
    address: "강원특별자치도 춘천시 동면 서부대성로 500 KR",
    stars: 4.1,
    review: "접근성이떨어지나 나머진 너무좋다.",
    lat: 37.8756644600911,
    lon: 127.771184340022,
    S_time: "07:00",
    E_time: "15:00",
    images: [
      "/images/cafe7.jpg",
      "/images/cafe4.jpg",
      "/images/cafe1.jpg",
      "/images/cafe3.jpg",
      "/images/cafe6.jpg",
      "/images/cafe2.jpg",
      "/images/cafe5.jpg",
    ],
  },
];

function Cafes() {
  const [selectedCafe, setSelectedCafe] = useState({
    lat: Cafeinfos[0]?.lat, // 기본값 설정
    lon: Cafeinfos[0]?.lon,
    name: Cafeinfos[0]?.name,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [showAddInfo, setShowAddInfo] = useState(false);

  const [cafeList, setCafeList] = useState([...Cafeinfos]);
  const handleCafeClick = (cafe) => {
    // lat와 lon 값을 숫자로 변환
    const lat = parseFloat(cafe.lat);
    const lon = parseFloat(cafe.lon);

    // 위도와 경도의 값이 유효한 숫자인지 확인 (NaN 방지)
    if (isNaN(lat) || isNaN(lon)) {
      alert("유효하지 않은 위도 또는 경도 값입니다.");
      return;
    }

    // 클릭한 카페의 정보를 selectedCafe 상태에 업데이트
    setSelectedCafe({
      lat: lat,
      lon: lon,
      name: cafe.name,
    });

    if (window.innerWidth <= 768) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // 부드럽게 스크롤
      });
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredCafes = cafeList.filter((cafe) =>
    cafe.name.toLowerCase().includes(searchTerm)
  );

  const handleAddCafeClick = () => {
    setShowAddInfo(true);
    console.log("실행 setShowAddInfo STATE변경");
  };

  const handleGoBack = () => {
    setShowAddInfo(false);
  };

  const handleAddCafe = (newCafe) => {
    setCafeList([...cafeList, newCafe]);
    console.log("업데이트된 cafeList:", [...cafeList, newCafe]);
    // setShowAddInfo(false);
  };

  useEffect(() => {
    console.log("현재 cafeList:", cafeList);
  }, [cafeList]);
  return (
    <SearchContext.Provider value={{ handleSearch }}>
      <div>
        <div className="flex_box">
          {showAddInfo ? (
            <AddInfoForm
              goBack={handleGoBack}
              addCafe={handleAddCafe}
              cafeList={cafeList}
            />
          ) : (
            <Cafe
              cafeInfos={filteredCafes}
              onClick={handleCafeClick}
              addInfos={handleAddCafeClick}
            />
          )}
          {selectedCafe.lat && selectedCafe.lon && (
            <GoogleMap
              lat={selectedCafe.lat}
              lon={selectedCafe.lon}
              title={selectedCafe.name}
            />
          )}
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default Cafes;
