import React from 'react';
import { BsFill1CircleFill, BsFill2CircleFill } from 'react-icons/bs';
import { HiCheckCircle } from 'react-icons/hi';
import { subscriptionDetails } from '../data/data';

const RightPanel = () => {
  return (
    <div className="right_panel">
      {/* Progress bar */}
      <div className="progress_bar">
        <div className="stage">
          <BsFill1CircleFill
            style={{ color: 'rgba(0, 150, 255, 1)', fontSize: '30px' }}
          />
          <p style={{ fontFamily: 'Roboto' }}>Sign Up</p>
        </div>
        <div className="stage">
          <BsFill2CircleFill
            style={{ color: 'rgba(0, 150, 255, 1)', fontSize: '30px' }}
          />
          <p style={{ fontFamily: 'Roboto' }}>Subscribe</p>
        </div>
      </div>
      <p>Select your subcription plan</p>
      {/* Input Subscription */}
      <div className="input_container">
        {subscriptionDetails.map((item, id) => {
          if (item.category) {
            return (
              <div>
                <div
                  className={
                    item.category === 'Offer Expired'
                      ? 'category_red'
                      : 'category_green'
                  }
                >
                  {item.category}
                </div>
                <div
                  className={
                    item.category === 'Offer Expired'
                      ? 'text_field_gray'
                      : 'text_field_green'
                  }
                >
                  <div className="field1">
                    <HiCheckCircle />
                    <p>{item.subscription}</p>
                  </div>
                  <div className="field2">
                    <p className="total_font">
                      Total
                      <span className="fee_font"> {item.total}</span>
                    </p>
                    <p className="month_font">
                      <span className="total_font">{item.feePerMonth}</span>
                      /mo
                    </p>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="text_field">
                <div className="field1">
                  <HiCheckCircle />
                  <p>{item.subscription}</p>
                </div>
                <div className="field2">
                  <p className="total_font">
                    Total
                    <span className="fee_font"> {item.total}</span>
                  </p>
                  <p className="month_font">
                    <span className="total_font">{item.feePerMonth}</span>
                    /mo
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default RightPanel;
