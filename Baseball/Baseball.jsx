import React, { useState, useRef, memo } from 'react';
import Try from './Try';

// const Baseball = () => {
// };

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
} // 숫자 네 개를 겹치지 않고 랜덤하게 출력하는 함수

const Baseball = memo(() => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null); // 클래스 형태일때 inputRef로 해서 input태그안에 Ref 넣었던거랑 같은 구현.

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      // 정답 맞췄을 때,
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: '홈런!' }];
      });
      setResult('홈런!');
      alert('게임을 다시 시작합니다.');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      inputEl.current.focus(); // 클래스 형태일때, this.inputRef.current.focus(); 썼던거
    } else {
      // 답 틀렸을 때
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10회 이상 틀렸을때
        setResult(`10번 실패! 답은 ${answer.join(',')} 였습니다.`);
        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus(); // 클래스 형태일때, this.inputRef.current.focus(); 썼던거
      } else {
        // 아직 10회 이상 틀리지 않았을 경우
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼!` }];
        });
        setValue('');
      }
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form action="" onSubmit={onSubmitForm}>
        <input type="text" maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />;
        })}
      </ul>
    </>
  );
});

export default Baseball; // import Baseball from ....;
