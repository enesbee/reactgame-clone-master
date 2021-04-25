import React, { Component } from 'react';
import Try from './Try';

// const Baseball = () => {
// };

function getNumbers() {} // 숫자 네 개를 겹치지 않고 랜덤하게 출력하는 함수

class Baseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.state.value);
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form action="" onSubmit={this.onSubmitForm}>
          <input type="text" maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도 : {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, i) => {
            return <Try key={v + i} value={v} index={i} />;
          })}
        </ul>
      </>
    );
  }
}

// export const hi = 'hi'; // 구조분해 import { hi } from ....;
export default Baseball; // import Baseball from ....;
