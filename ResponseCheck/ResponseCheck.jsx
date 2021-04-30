import React, { useRef, useState } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  const timeOut = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  // useState 는 바뀔때 렌더링이 새로 되지만 useRef 는 렌더링이 새로 되지는 않음. (둘다 값을 바꾸는 기능 하나는 동일함)

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeOut.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');

        startTime.current = new Date();
        console.log(startTime.current);
        console.log(typeof startTime.current);
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      // 일찍 클릭한 경우
      clearTimeout(timeOut.current);
      setState('waiting');
      setMessage('초록색이 되면 클릭해주세요 ^^');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };
  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>초기화</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
