const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
  //클래스함수때 this.state 안에 있던걸 하나하나 개별적으로 분리함.
  const [firstNumber, setFirstNumber] = useState(Math.ceil(Math.random() * 9)); // setFirstNumber은 firstNumber 전용 setState
  const [secondNumber, setSecondNumber] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const onRefInput = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(value) === firstNumber * secondNumber) {
      setResult(`정답 : ${value}`);
      setFirstNumber(Math.ceil(Math.random() * 9));
      setSecondNumber(Math.ceil(Math.random() * 9));
      setValue('');
      onRefInput.current.focus();
    } else {
      setResult(`땡`);
      setValue('');
      onRefInput.current.focus();
    }
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div>
        {firstNumber} 곱하기 {secondNumber}는?
      </div>
      <form action="" onSubmit={onSubmit}>
        <label>
          <input ref={onRefInput} type="number" value={value} onChange={onChange} />
        </label>
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = GuGuDan;
