import React from 'react';
import './SingleAsset.scss';
import TriangleIcon from '../TriangleIcon/TriangleIcon';
export default function SingleAsset(props) {
  return (
    <div
      className={'product-info__asset ' + (props.selected ? 'product-info__asset--open' : '')}
      style={{ top: props.top, left: props.left, borderColor: props.color }}
      onClick={() => props.selectAsset(props.assetId, !!props.organisationID || props.organisationID === 0 ? props.organisationID : null)}
    >
      <div style={{ overflow: 'hidden' }}>
        <div className="product-info__asset__title">{props.title}</div>
        <div className="product-info__asset__subtitle">{props.subtitle}</div>
      </div>
      {!!props.selectAsset ? (
        <div className="product-info__asset__more">
          <TriangleIcon className="product-info__asset__triangle" />
        </div>
      ) : null}
    </div>
  );
}
