import React, { useState } from 'react';
import { BsFill1CircleFill, BsFill2CircleFill } from 'react-icons/bs';

import { subscriptionDetails } from '../data/data';
import Vector from '../Images/Vector.png';
import Razorpay from '../Images/RazorpayIcon.png';
import RadioButton from '../Images/RadioButton.png';

import SubscriptionComponent from './SubscriptionComponent';

const RightPanel = () => {
  const [recomendedSelected, setRecomendedSelected] = useState(12);
  const [subsFee, setSubsFee] = useState(180);
  let limitedoffer = 18500 - subsFee;
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
          if (item.category === 'Offer Expired') {
            return (
              <div key={id}>
                <div className="category_red">{item.category}</div>
                <div className="text_field_gray">
                  <div className="field1">
                    <img src={RadioButton} alt="" />
                    <p>{item.subscription}</p>
                  </div>
                  <div className="field2">
                    <p className="total_font">
                      Total
                      <span className="fee_font" style={{ paddingLeft: '7px' }}>
                        {item.total}
                      </span>
                    </p>
                    <p className="month_font">
                      <span
                        className="total_font"
                        style={{ paddingRight: '5px' }}
                      >
                        {item.feePerMonth}
                      </span>
                      /mo
                    </p>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <SubscriptionComponent
                key={id}
                item={item}
                recomendedSelected={recomendedSelected}
                setRecomendedSelected={setRecomendedSelected}
                setSubsFee={setSubsFee}
                subsFee={subsFee}
              />
            );
          }
        })}
      </div>
      {/* Summary fee */}
      <div className="summary">
        <div className="fee">
          <p>Subscription Fee</p>
          <p style={{ fontWeight: '500' }}>₹ 18,500</p>
        </div>
        <div className="limited_offer">
          <div className="offer_detail">
            <p style={{ fontWeight: '500', color: 'rgba(222, 67, 19, 1)' }}>
              Limited time offer
            </p>
            <p style={{ fontWeight: '600' }}>-₹ {limitedoffer}</p>
          </div>
          <div className="timeframe">
            <img src={Vector} alt="error" />
            <p>Offer valid till 25th May 2023 </p>
          </div>
        </div>
        <div className="total">
          <p>Total(Incl. of 18% GST)</p>
          <p style={{ fontWeight: '700', fontSize: '24px' }}>₹ {subsFee}</p>
        </div>
      </div>
      <div className="button_container">
        <button className="cancel">CANCEL</button>
        <button className="pay">PROCEED TO PAY</button>
      </div>
      <div className="razorpay">
        <img src={Razorpay} alt="" />
      </div>
    </div>
  );
};

export default RightPanel;
