import React from 'react';
import { data } from '../data/data';

const Feature = () => {
  return (
    <div>
      <div className="feature_list">
        {data.map((item, i) => {
          if (item.description.startsWith('S')) {
            return (
              <div key={i} className="list">
                <img src={item.icon} alt={'icons'} />
                <h1
                  style={{
                    color: 'white',
                    paddingLeft: '50px',
                  }}
                >
                  {item.description}
                </h1>
                <h1
                  style={{
                    color: 'blue',
                    paddingLeft: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {item.highlight}
                </h1>
              </div>
            );
          }
          return (
            <div key={i} className="list">
              <img src={item.icon} alt={'icons'} />
              <h1
                style={{
                  color: 'blue',
                  paddingLeft: '50px',
                  fontWeight: 'bold',
                }}
              >
                {item.highlight}
              </h1>
              <h1
                style={{
                  color: 'white',
                  paddingLeft: '10px',
                }}
              >
                {item.description}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feature;
