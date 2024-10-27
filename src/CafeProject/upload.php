<?php
header("Access-Control-Allow-Origin: *"); // 모든 도메인에 대해 허용
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // 허용할 HTTP 메소드
header("Access-Control-Allow-Headers: Content-Type"); // 허용할 헤더
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $target_dir = "images/";  // 이미지가 저장될 경로
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // 이미지 파일이 실제 이미지인지 확인
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        echo "파일이 이미지가 아닙니다.";
        $uploadOk = 0;
    }

    // 파일이 이미 존재하는지 확인
    if (file_exists($target_file)) {
        echo "이미 존재하는 파일입니다.";
        $uploadOk = 0;
    }

    // 파일 크기 제한 (5MB)
    if ($_FILES["image"]["size"] > 5000000) {
        echo "파일 크기가 너무 큽니다.";
        $uploadOk = 0;
    }

    // 특정 파일 형식만 허용
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
        echo "허용되지 않는 파일 형식입니다.";
        $uploadOk = 0;
    }

    // 업로드가 성공적일 때
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            // 업로드된 파일의 경로를 반환
            echo "http://epis1561.dothome.co.kr/" . $target_file;
        } else {
            echo "파일 업로드에 실패했습니다.";
        }
    }
}
?>