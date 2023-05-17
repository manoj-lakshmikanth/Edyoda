import React from 'react';
import RadioButtonSelect from '../Images/RadioButtonSelect.png';
import RadioButtonUnselect from '../Images/RadioButtonUnselect.png';

const SubscriptionComponent = ({
  item,
  recomendedSelected,
  setRecomendedSelected,
  setSubsFee,
}) => {
  return (
    <div
      onClick={() => {
        setRecomendedSelected(item.month);
        setSubsFee(Number(item.feePerMonth.substring(1)) * item.month);
      }}
      style={{
        backgroundColor:
          recomendedSelected === item.month
            ? `rgba(215, 237, 221, 1)`
            : 'white',
        border:
          recomendedSelected === item.month
            ? '2px solid rgba(71, 186, 104, 1)'
            : '2px solid rgba(190, 190, 190, 1)',
        borderRadius: recomendedSelected === item.month ? '4px' : '4px',
      }}
    >
      {item.category === 'Recommended' ? (
        <div className="category_green">{item.category}</div>
      ) : (
        <div></div>
      )}
      <div className="text_field">
        <div className="field1">
          <img
            src={
              recomendedSelected === item.month
                ? RadioButtonSelect
                : RadioButtonUnselect
            }
            alt=""
          />
          <p>{item.subscription}</p>
        </div>
        <div className="field2">
          <p className="total_font" style={{ color: 'rgba(60, 72, 82, 1)' }}>
            Total
            <span
              className="fee_font"
              style={{ color: 'rgba(60, 72, 82, 1)', paddingLeft: '7px' }}
            >
              {item.total}
            </span>
          </p>
          <p className="month_font" style={{ color: 'rgba(60, 72, 82, 1)' }}>
            <span
              className="total_font"
              style={{ color: 'rgba(60, 72, 82, 1)', paddingRight: '5px' }}
            >
              {item.feePerMonth}
            </span>
            /mo
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionComponent;
