/* eslint-disable @next/next/no-img-element */
'use client';

import { memo } from 'react';
import './styles.css';

// Svgs icons was turned into React Functional Components.
import BackIcon from '../../../public/icons/back';
import MarketIcon from '../../../public/icons/market';

/**
 * This component represents a preview of an item, the target output is an HTML markup that looks like /images/card.png
 * See `/cards` page for the output
 *
 * @todo:
 * - setup the HTML markup by replacing <img /> below by yours
 * - put and set all necessary css as you want in ./styles.css the main entry class is `preview-card`
 *
 * you can find all assets to use in /public/images and /public/icons
 */
export function CardPreviewImage() {
  return (
    <div className="preview-card-image">
      <img alt="fake card" src="/images/card.png" />
    </div>
  );
}

// Note [ key, value ] array, key should be unique.
const productInfo = [
  ['PLATFORM', 'PS5'],
  ['RELEASE', 'Fall 2020'],
  ['PRICE', '$50'],
];

const productFeature = [
  ['Futuristic', 'Design'],
  ['Built-in', 'Microphone'],
];

function CardPreview() {
  return (
    <div className="preview-card">
      <div className="product-card-header">
        <img className="product-image" alt="PS5 Image" src="/images/ps5.png" />
        <div className="back-button">
          <BackIcon />
        </div>
        <div className="market-button">
          <MarketIcon />
          <div className="market-badge"></div>
        </div>
        <div className="product-info">
          {productInfo.map((item) => {
            const [key, value] = item;
            return (
              <div key={key}>
                <p className="primary">{key}</p>
                <p className="secondary">{value}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="product-card-footer">
        <p className="product-title">Dual Sense</p>
        <p className="product-subtitle">
          DualSense also adds a build-in microphone array, which will enable players to easily chat with friends without a headset...
        </p>
        <div className="product-features">
          {productFeature.map((item) => {
            const [key, value] = item;
            return (
              <div className="product-feature-item" key={key}>
                <div className="feature-box"></div>
                <div className="feature-typography">
                  <div className="feature-primary-text">{key}</div>
                  <div className="feature-secondary-text">{value}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="product-price-container">
          <div className="product-price">
            <p className="price">0.78 ETH</p>
            <div className="buy-button">
              <p>Buy</p>
              <div className="back-icon">
                <BackIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CardPreview);
