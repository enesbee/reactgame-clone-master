const React = require('react');
const { useState, useRef } = React;

const Baseball = () => {
  const [word, setWord] = useState('쿠다닥');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);
  
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setValue('');
      setResult('딩동댕');
      inputRef.current.focus();
    } else {
      setValue('');
      setResult('땡');
      inputRef.current.focus();
    }
  };
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};
module.exports = Baseball;
