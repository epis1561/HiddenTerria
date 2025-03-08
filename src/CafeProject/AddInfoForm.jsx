import React, { useState } from "react";

function AddInfoForm({ goBack, addCafe, cafeList }) {
  const [newCafe, setNewCafe] = useState({
    name: "",
    address: "",
    stars: "",
    review: "",
    lat: "",
    lon: "",
    S_time: "",
    E_time: "",
    images: [],
  });
  const [isFull, setisFull] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 8) {
      alert("최대 8장까지 업로드 할 수 있습니다.");
      e.target.value = "";
      return;
    }

    const newPreviews = await Promise.all(
      files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result); // Base64 미리보기 이미지
          };
        });
      })
    );
    setImagePreviews(newPreviews); // 미리보기 이미지 업데이트

    // 비동기적으로 이미지 업로드 및 URL 추가 처리
    const uploadPromises = files.map((file) => handleImageUpload(file));
    await Promise.all(uploadPromises); // 모든 이미지 업로드 대기
  };

  const handleImageUpload = (file) => {
    const formData = new FormData();

    // 현재 날짜와 시간을 기반으로 고유한 파일명 생성
    const uniqueFileName = `${new Date().toISOString().replace(/[:.]/g, "-")}_${
      file.name
    }`;
    formData.append("image", file, uniqueFileName); // 고유 파일명으로 변경

    return fetch("http://epis1561.dothome.co.kr/upload.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((imageURL) => {
        console.log("서버로부터 받은 이미지 URL:", imageURL);
        setNewCafe((prevCafe) => ({
          ...prevCafe,
          images: [...prevCafe.images, imageURL],
        }));
      })
      .catch((error) => {
        console.log("이미지 업로드 실패", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, stars, review, lat, lon, S_time, E_time } = newCafe;

    // 필수 필드가 모두 입력되었는지 확인
    if (
      !name ||
      !address ||
      !stars ||
      !review ||
      !lat ||
      !lon ||
      !S_time ||
      !E_time
    ) {
      setisFull(true); // 필수 정보가 모두 입력되지 않았을 때 경고
      return;
    }

    // 위도 경도 범위 검증
    if (lat < -90 || lat > 90) {
      alert("위도는 -90에서 90 사이의 값이어야 합니다.");
      return;
    }
    if (lon < -180 || lon > 180) {
      alert("경도는 -180에서 180 사이의 값이어야 합니다.");
      return;
    }

    // 이름에서 공백을 제거하여 비교용으로 처리
    const newCafeName = name.split(" ").join("");

    // 기존 카페 리스트에서 이름과 위도/경도를 비교
    const isDuplicate = cafeList.some((cafe) => {
      const existingCafeName = cafe.name.split(" ").join("");

      // 이름이 4글자 이상 겹치는지 확인
      const isNameSimilar =
        newCafeName.length >= 4 &&
        existingCafeName.includes(newCafeName.slice(0, 4));

      // 위도와 경도의 차이가 0.0001 이하인지를 확인 (매우 근접한지)
      const isLocationSimilar =
        Math.abs(cafe.lat - lat) < 0.0001 && Math.abs(cafe.lon - lon) < 0.0001;

      // 이름과 위치가 모두 비슷하면 중복 카페로 간주
      return isNameSimilar && isLocationSimilar;
    });

    if (isDuplicate) {
      alert("이미 등록된 카페입니다.");
      return; // 중복 카페일 경우 등록 중단
    }

    // 카페 추가 로직 (중복된 카페가 아닐 때)
    addCafe(newCafe); // 카페 추가
    setisFull(false); // 필수 정보가 모두 입력되었으므로 경고 제거
    goBack(); // 폼 닫기
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCafe({ ...newCafe, [name]: value });
  };

  return (
    <form className="addform">
      <div className="flex-box2">
        <p>카페정보를 아래 양식에 따라 입력해주세요.</p>
        <button type="button" onClick={goBack}>
          이전
        </button>
      </div>
      <div>
        <label htmlFor="name">
          <span style={{ color: "red" }}>*</span>카페명
        </label>
        <input type="text" name="name" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="address">
          <span style={{ color: "red" }}>*</span>주소
        </label>
        <input type="text" name="address" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="stars">
          <span style={{ color: "red" }}>*</span>별점
        </label>
        <input type="number" name="stars" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="review">
          <span style={{ color: "red" }}>*</span>한줄평
        </label>
        <input type="text" name="review" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="lat">
          <span style={{ color: "red" }}>*</span>위도
        </label>
        <input
          type="number"
          name="lat"
          onChange={handleChange}
          step="0.000001"
        />
      </div>
      <div>
        <label htmlFor="lon">
          <span style={{ color: "red" }}>*</span>경도
        </label>
        <input
          type="number"
          name="lon"
          onChange={handleChange}
          step="0.000001"
        />
      </div>
      <div>
        <label htmlFor="S_time">
          <span style={{ color: "red" }}>*</span>시작시간
        </label>
        <input type="text" name="S_time" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="E_time">
          <span style={{ color: "red" }}>*</span>마감시간
        </label>
        <input type="text" name="E_time" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="images">이미지등록(최대8장)</label>
        <input
          type="file"
          name="images"
          multiple
          accept="/image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* 이미지 미리보기 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {imagePreviews.map((img, index) => (
          <img
            alt=""
            key={index}
            src={img}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="submit"
          style={{ margin: "0", marginTop: "20px" }}
          onClick={handleSubmit}
        >
          추가하기
        </button>
      </div>
      {isFull && (
        <div className="addModal">
          <i className="xi-info-o"></i>
          <p>필수정보를 모두 입력해주세요.</p>
          <button type="button" onClick={() => setisFull(false)}>
            확인
          </button>
        </div>
      )}
    </form>
  );
}

export default AddInfoForm;
