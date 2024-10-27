import React from 'react'

function CommonMethodsExamples() {

  // 1. map() - 배열 요소를 반복 처리하여 새로운 배열을 반환
  const numbers = [1,2,3,4,5];
  const squares = numbers.map(num => num * num);

  // 2. filter() - 조건에 맞는 배열 요소만 반환
  const evenNumbers = numbers.filter(num => num % 2 === 0);

  // 3. slice() - 기존 배열을 수정하지 않고 일부 요소만 반환하여 새로운 배열 생성
  const firstTwo = numbers.slice(0,2);

  // 4. find() - 조건에 맞는 첫 번째 요소 반환
  const users = [
    {id: 1, name:'Alice'},
    {id: 2, name:'Bob'},
    {id: 3, name:'Charlie'},
  ];
  const user = users.find(user => user.id ===2);

  // 5. reduce() - 누적 값을 계산하여 최종 결과 반환
  const total = numbers.reduce((acc,cur) => acc + cur,0);


  // 6. forEach() - 각 배열 요소에 대해 반복 작업 수행 (반환 값 없음)
  let summary = '';
  users.forEach(user => {
    summary +=`${user.name}`;
  })

  // 7. includes() - 배열이나 문자열에 특정 값이 포함되어 있는지 확인
  const hasAlice = users.map(user => user.name).includes('Alice');

  // 8. sort() - 배열을 정렬 (주의: 원본 배열을 변경함)
  const sortedUsers = [...users].sort((a,b) => a.name.localeCompare(b.name));

  // 9. split() - 문자열을 특정 구분자로 나누어 배열로 반환
  const sentence = 'React is a JavaScript library';
  const words = sentence.split('');

  // 10. join() - 배열의 모든 요소를 문자열로 결합하여 반환
  const joinedWords = words.join('');

  // 11. Object.keys() - 객체의 모든 키를 배열로 반환
  const userKeys = Object.keys(users[0]);

  // 12. Object.values() - 객체의 모든 값을 배열로 반환
  const userValues = Object.values(users[0]);

  // 13. Object.entries() - 객체의 기와 값을 [key, value] 형태의 배열로 반환
  const userEntries = Object.entries(users[0]);

  // 14. trim() - 문자열 양쪽의 공백 제거
  const stringWithSpaces = '  Hello, React!   ';
  const trimmedString = stringWithSpaces.trim();

  // 15. replace() - 문자열 내의 특정 패턴을 다른 값으로 교체
  const originalString = 'I like Vue.';
  const replacedString = originalString.replace('Vue','React');

  // 16. toUpperCase() - 문자열을 모두 대문자로 변환
  const lowerCaseString = 'react';
  const upperCaseString = lowerCaseString.toUpperCase();
  return (
     <div>
      <h2>리액트에서 자주 사용하는 메서드 예시</h2>

      {/* map 예시 */}
      <h3>1. map() - 배열 요소를 반복 처리하여 새로운 배열 반환</h3>
      <p>원본 배열: {JSON.stringify(numbers)}</p>
      <p>제곱 배열: {JSON.stringify(squares)}</p>

      {/* filter 예시 */}
      <h3>2. filter() - 조건에 맞는 배열 요소만 반환</h3>
      <p>짝수 배열: {JSON.stringify(evenNumbers)}</p>

      {/* slice 예시 */}
      <h3>3. slice() - 기존 배열을 수정하지 않고 일부 요소 반환</h3>
      <p>첫 두 요소: {JSON.stringify(firstTwo)}</p>

      {/* find 예시 */}
      <h3>4. find() - 조건에 맞는 첫 번째 요소 반환</h3>
      <p>id가 2인 유저: {user ? user.name : '없음'}</p>

      {/* reduce 예시 */}
      <h3>5. reduce() - 누적 값을 계산하여 최종 결과 반환</h3>
      <p>숫자의 총합: {total}</p>

      {/* forEach 예시 */}
      <h3>6. forEach() - 각 배열 요소에 대해 반복 작업 수행</h3>
      <p>모든 유저의 이름: {summary}</p>

      {/* includes 예시 */}
      <h3>7. includes() - 배열에 특정 값이 포함되어 있는지 확인</h3>
      <p>Alice가 포함되어 있나요? {hasAlice ? '네' : '아니요'}</p>

      {/* sort 예시 */}
      <h3>8. sort() - 배열을 정렬</h3>
      <p>이름순 정렬: {JSON.stringify(sortedUsers)}</p>

      {/* split & join 예시 */}
      <h3>9. split() & 10. join() - 문자열 나누기 & 결합</h3>
      <p>원본 문장: {sentence}</p>
      <p>단어 배열: {JSON.stringify(words)}</p>
      <p>결합된 문장: {joinedWords}</p>

      {/* Object.keys, Object.values, Object.entries 예시 */}
      <h3>11. Object.keys() - 객체의 키 배열</h3>
      <p>유저 객체의 키: {JSON.stringify(userKeys)}</p>

      <h3>12. Object.values() - 객체의 값 배열</h3>
      <p>유저 객체의 값: {JSON.stringify(userValues)}</p>

      <h3>13. Object.entries() - 객체의 키-값 쌍 배열</h3>
      <p>유저 객체의 키-값 쌍: {JSON.stringify(userEntries)}</p>

      {/* trim, replace, toUpperCase 예시 */}
      <h3>14. trim() - 문자열 양쪽의 공백 제거</h3>
      <p>원본 문자열: "{stringWithSpaces}"</p>
      <p>공백 제거: "{trimmedString}"</p>

      <h3>15. replace() - 문자열 내의 특정 패턴을 다른 값으로 교체</h3>
      <p>원본 문자열: "{originalString}"</p>
      <p>교체된 문자열: "{replacedString}"</p>

      <h3>16. toUpperCase() - 문자열을 대문자로 변환</h3>
      <p>소문자: "{lowerCaseString}"</p>
      <p>대문자: "{upperCaseString}"</p>
    </div>
  )
}

export default CommonMethodsExamples
