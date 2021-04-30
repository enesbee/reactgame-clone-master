import React, { Component } from 'react';

// 클래스의 경우
// 1. 기본 ==> constructor -> render -> ref -> componentDidMount ->
// 2. setState/props 바뀔때 ==> shouldComponentUpdate(true) -> render -> componentDidUpdate
// 3. 부모에서 자식을 없앴을 때 ==> componentWillUnmount -> 소멸

class Rsp extends Component {
  state = {
    result: '',
    imgCoord: 0, // x축 background-position,
    score: 0,
    // rock = -130px, scissor = -530px, paper = -330px, width = 200px, height = 290px
  };

  componentDidMount() {
    // 컴포넌트가 첫 렌더링된 후
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 리렌더링 후
  }

  componentWillUnmount() {
    // 컴포넌트가 제거되기 직전
  }

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://www.pngjoy.com/pngm/111/2294899_rock-paper-scissors-rock-paper-scissors-svg-png.png) ${imgCoord} -90px`,
          }}
        />
        <div>
          <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>
            바위
          </button>
          <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>
            가위
          </button>
          <button id="paper" className="btn" onClick={() => onClickBtn('보')}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default Rsp;
