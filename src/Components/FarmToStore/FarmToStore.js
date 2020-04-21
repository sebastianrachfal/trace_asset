import React from 'react';
import './FarmToStore.scss';
import SingleAsset from '../SingleAsset/SingleAsset';
import AssetInfo from '../../AssetInfo.json';

const AssetWidth = AssetInfo.width;
const AssetHeight = AssetInfo.height;
const AssetColor = AssetInfo.colors;

export default class FarmToStore extends React.Component {
  constructor() {
    super();
    this.state = {
      chartHeight: 0,
      chartWidth: 0,
      selectedAsset: undefined,
      assetData: undefined,
      lineData: [],
    };
    this.selectAsset = this.selectAsset.bind(this);
    this.determineSize = this.determineSize.bind(this);
    this.calculate = this.calculate.bind(this);
  }
  determineSize(rows, columns) {
    this.setState({ chartWidth: (columns + 1) * (AssetWidth + 25) + 40, chartHeight: 20 + (rows + 1) * AssetHeight });
  }
  selectAsset(asset) {
    let sel = asset === this.state.selectedAsset ? undefined : asset;
    this.props.selectAsset(sel);
    this.setState({ selectedAsset: sel });
  }
  calculate() {
    if (JSON.stringify(this.props.assetData) !== JSON.stringify(this.state.assetData))
      this.setState({ assetData: this.props.assetData, lineData: [] }, () => {
        // Calculate lines
        let connections = {};
        let lines = [];
        let assets = {};
        let maxC = 0,
          maxR = 0;
        for (let asset of this.state.assetData) {
          if (asset.row > maxR) maxR = asset.row;
          if (asset.column > maxC) maxC = asset.column;
          assets[asset.id] = { row: asset.row, column: asset.column };
          if (!!asset.con_to) connections[asset.con_to] = [...(connections[asset.con_to] || []), { id: asset.id, row: asset.row, column: asset.column }];
        }

        for (let conn of Object.entries(connections)) {
          let connect = conn[1];
          let to = assets[conn[0]];
          let offset = AssetHeight / (connect.length + 1);
          for (let i = 0; i < connect.length; i++)
            lines.push({
              x1: 40 + AssetWidth + connect[i].column * (AssetWidth + 25),
              y1: AssetHeight / 2 + connect[i].row * AssetHeight,
              x2: 40 + to.column * (AssetWidth + 25 + 1),
              y2: (connect[i].row === to.row ? AssetHeight / 2 : offset * (i + 1)) + to.row * 66,
            });
        }
        this.setState({ lineData: lines });
        this.determineSize(maxR, maxC);
      });
  }
  componentDidMount() {
    this.calculate();
  }
  componentDidUpdate() {
    this.calculate();
  }
  render() {
    return !!this.state.assetData ? (
      <>
        <svg className="farmtostore__line-container">
          {this.state.lineData.map((e) => (
            <line key={e.x1 + '_' + e.y1} className="product-info__asset__line" x1={e.x1 + 'px'} y1={e.y1 + 'px'} x2={e.x2 + 'px'} y2={e.y2 + 'px'} />
          ))}
        </svg>
        <div style={{ height: this.state.chartHeight + 'px', width: this.state.chartWidth + 'px' }} className="farmtostore__element-container">
          {this.state.assetData.map((e) => (
            <SingleAsset
              assetId={e.id}
              key={'flow-asset_' + e.id}
              top={e.row * AssetHeight + 'px'}
              left={40 + e.column * (AssetWidth + 25) + 'px'}
              title={e.title.length > 17 ? e.title.substr(0, 14).trim() + '...' : e.title}
              subtitle={e.subtitle}
              color={AssetColor[e.type]}
              selected={this.state.selectedAsset === e.id}
              selectAsset={this.selectAsset}
            />
          ))}
        </div>
      </>
    ) : null;
  }
}
