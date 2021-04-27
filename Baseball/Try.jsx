import React, { memo, useState } from 'react';

const Try = memo(({ tryInfo }) => {
  // 어쩔 수 없이 부모로부터 받은 props를 바꿔야 하는 상황이 생길 경우.
  // 직접 바꾸지 말고 state로 바꿔서 사용해서 부모쪽에 영향이 안가게 한다.
  // const [result, setResult] = useState(tryInfo.result);
  // const onClick = () => {
  //   setResult('1');
  // };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
