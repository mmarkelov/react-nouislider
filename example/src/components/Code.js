import React from 'react';
import './code.css';

const Code = () => (
  <div className="code">
    <pre className="language-javascript">
      <code className="language-javascript">
        {`<Nouislider
    range={{ min: 0, max: 100 }}
    start={[20, 80]}
    connect />`}
      </code>
    </pre>
  </div>
);

export default Code;
