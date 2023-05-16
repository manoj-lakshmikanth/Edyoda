import React from 'react';
import Feature from './Feature';

const LeftPanel = () => {
  return (
    <div className="left_panel">
      <div className="heading">
        <div>Access curated courses worth</div>
        <div>
          <span
            style={{
              color: '#fff',
              paddingRight: '25px',
              position: 'relative',
            }}
          >
            ₹ 18,500
            <div className="rectangle"></div>
          </span>
          at just <span style={{ padding: '0px 15px 0px 15px' }}>₹ 99</span>per
          year!
        </div>
      </div>
      <Feature />
    </div>
  );
};

export default LeftPanel;
