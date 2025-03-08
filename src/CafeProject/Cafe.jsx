import React from "react";
import ImageSlider from "./ImageSlider";
import Search from "./Search";

function Cafe({ cafeInfos, onClick, addInfos }) {
  const isOpen = (startTime, endTime) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const openTime = startHours * 60 + startMinutes;
    const closeTime = endHours * 60 + endMinutes;

    return currentTime >= openTime && currentTime < closeTime;
  };

  return (
    <div className="cafeList">
      <Search />
      <button onClick={addInfos} className="addInfo">
        카페추가
      </button>
      <ul>
        {cafeInfos.map((cafe) => (
          <li key={cafe.id}>
            <h2 onClick={() => onClick(cafe)}>{cafe.name}</h2>
            <p>{cafe.address}</p>
            <p>
              {isOpen(cafe.S_time, cafe.E_time) ? "영업중" : "영업종료"} ·{" "}
              <span>
                <i className="xi-star"></i>
                {cafe.stars}
              </span>
            </p>
            <p className="review">한줄평 : {cafe.review}</p>
            <ImageSlider images={cafe.images} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Cafe;
