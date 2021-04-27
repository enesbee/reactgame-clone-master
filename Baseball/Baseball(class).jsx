import React, { Component, createRef } from 'react';
import Try from './Try(class)';

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

class Baseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {}
  // GrandParent -> Parent -> Children
  // GP 가 C에 주기위해선 P를 거쳐야 함. 따라서 Parent 의문의 렌더링행.
  // 그래서 Context를 활용해 GP에서 C로 바로 넘겨줌. (이러면서 Redux가 나옴)

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      // 정답 맞췄을 때,
      this.setState((prevState) => {
        return {
          result: '홈런!',
          tries: [...prevState.tries, { try: this.state.value, result: '홈런!' }],
        };
      });
      alert('게임을 다시 시작합니다.');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
    } else {
      // 답 틀렸을 때
      const answerArray = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        // 10회 이상 틀렸을때
        this.setState({
          result: `10번 실패! 답은 ${this.state.answer.join(',')} 였습니다.`,
        });
        alert('게임을 다시 시작합니다.');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        // 아직 10회 이상 틀리지 않았을 경우
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼!` }],
            value: '',
          };
        });
        this.inputRef.current.focus(); // 포커스 주고 싶을 때 input쪽에 inputRef 라고 해서 Ref 준게 있음. 확인 ㄱㄱ
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef();

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form action="" onSubmit={this.onSubmitForm}>
          <input type="text" ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도 : {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

// export const hi = 'hi'; // 구조분해 import { hi } from ....;
export default Baseball; // import Baseball from ....;
