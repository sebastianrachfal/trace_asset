import React from 'react';
import './App.scss';
import ProductInfo from './Sections/ProductInfo/ProductInfo';
import AssetPieceInfo from './Sections/AssetPieceInfo/AssetPieceInfo';
import Searchboxes from './Sections/Searchboxes/Searchboxes';
import TempData from './TempData.json';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = { assetData: [], assetPiece: undefined, assetInfo: {}, ingredientData: [] };
    this.getAssetPieceInfo = this.getAssetPieceInfo.bind(this);
    this.search = this.search.bind(this);
  }
  search(searchbox, key) {
    console.log(searchbox, key);
    this.setState(TempData);
  }
  getAssetPieceInfo(id) {
    for (let asset of this.state.assetData) {
      if (asset.id === id) return asset;
    }
  }
  render() {
    return (
      <>
        <div className="white_bar"></div>
        <div className="trace">
          <div className="trace__container">
            <h2 className="trace__heading__main">Trace asset</h2>
            <h3 className="trace__heading">Trace your asset using one of the three options below</h3>
            <Searchboxes search={this.search} />
            {this.state.assetData.length > 0 ? (
              <ProductInfo ingredientData={this.state.ingredientData} assetInfo={this.state.assetInfo} assetData={this.state.assetData} assetPiece={(id) => this.setState({ assetPiece: id })} />
            ) : null}
            {this.state.assetData.length > 0 ? <AssetPieceInfo assetPiece={this.getAssetPieceInfo(this.state.assetPiece)} /> : null}
          </div>
        </div>
      </>
    );
  }
}
