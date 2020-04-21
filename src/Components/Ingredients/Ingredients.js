import React from 'react';
import './Ingredients.scss';
import SingleAsset from '../SingleAsset/SingleAsset';
import AssetInfo from '../../AssetInfo.json';

const AssetWidth = AssetInfo.width;
const AssetHeight = AssetInfo.height;
const AssetColor = AssetInfo.colors;

export default class Ingredients extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIngredient: undefined,
      chartHeight: 0,
      chartWidth: 0,
      ingredientData: [],
      lineData: [],
    };
    this.selectIngredient = this.selectIngredient.bind(this);
  }
  determineSize(rows, columns) {
    this.setState({ chartWidth: (columns + 1) * (AssetWidth + 75) + 10, chartHeight: 30 + (rows + 1) * (AssetHeight - 13) });
  }
  selectIngredient(ingr, org) {
    let sel = ingr === this.state.selectedIngredient ? undefined : ingr;
    this.props.selectAsset(sel === undefined ? undefined : org);
    this.setState({ selectedIngredient: sel });
  }
  calculate() {
    if (JSON.stringify(this.props.ingredientData) !== JSON.stringify(this.state.ingredientData))
      this.setState({ ingredientData: this.props.ingredientData, lineData: [] }, () => {
        // Calculate lines
        let connections = {};
        let lines = [];
        let ingredients = {};
        let maxC = 0,
          maxR = 0;
        for (let ingr of this.state.ingredientData) {
          if (ingr.row > maxR) maxR = ingr.row;
          if (ingr.column > maxC) maxC = ingr.column;
          ingredients[ingr.id] = { row: ingr.row, column: ingr.column };
          if (!!ingr.con_to) connections[ingr.con_to] = [...(connections[ingr.con_to] || []), { id: ingr.id, row: ingr.row, column: ingr.column }];
        }
        // Split into groups
        let groups = {};
        for (let conn of Object.entries(connections)) {
          let temp = conn[1];
          while (temp.length > 0) {
            let item = temp.shift();
            groups[item.column + '-' + conn[0]] = [...(groups[item.column + '-' + conn[0]] || []), { id: item.id, row: item.row, column: item.column }];
          }
        }
        // Draw the groups
        let lineId = 0;
        for (let group of Object.entries(groups)) {
          let groupId = group[0].split('-');
          let items = group[1];
          let column = +groupId[0];
          let to = groupId[1];
          let min_r = -1,
            max_r = -1;
          for (let item of items) {
            if (item.row > max_r) max_r = item.row;
            if (min_r === -1 || item.row < min_r) min_r = item.row;
            lines.push({
              id: lineId++,
              x1: 40 + item.column * (AssetWidth + 75) + AssetWidth,
              y1: item.row * (AssetHeight - 13) + AssetHeight / 2,
              x2: 40 + (AssetWidth + 75) / 2 + item.column * (AssetWidth + 75) + AssetWidth / 2,
              y2: item.row * (AssetHeight - 13) + AssetHeight / 2,
            });
          }
          lines.push({
            id: lineId++,
            x1: 40 + (AssetWidth + 75) / 2 + column * (AssetWidth + 75) + AssetWidth / 2,
            y1: min_r * (AssetHeight - 13) + AssetHeight / 2,
            x2: 40 + (AssetWidth + 75) / 2 + column * (AssetWidth + 75) + AssetWidth / 2,
            y2: max_r * (AssetHeight - 13) + AssetHeight / 2,
          });
          let to_r = ingredients[to].row;
          if (column + 1 === ingredients[to].column) {
            lines.push({
              id: lineId++,
              x1: 40 + (AssetWidth + 75) / 2 + column * (AssetWidth + 75) + AssetWidth / 2,
              y1: to_r * (AssetHeight - 13) + AssetHeight / 2,
              x2: 40 + (column + 1) * (AssetWidth + 75),
              y2: to_r * (AssetHeight - 13) + AssetHeight / 2,
            });
          } else {
            let new_row = (min_r + max_r) / 2;
            lines.push({
              id: lineId++,
              x1: 40 + (AssetWidth + 75) / 2 + column * (AssetWidth + 75) + AssetWidth / 2,
              y1: new_row * (AssetHeight - 13) + AssetHeight / 2,
              x2: 40 + (AssetWidth + 75) / 2 + (ingredients[to].column - 1) * (AssetWidth + 75) + AssetWidth / 2,
              y2: new_row * (AssetHeight - 13) + AssetHeight / 2,
            });
            lines.push({
              id: lineId++,
              x1: 40 + (AssetWidth + 75) / 2 + (ingredients[to].column - 1) * (AssetWidth + 75) + AssetWidth / 2,
              y1: new_row * (AssetHeight - 13) + AssetHeight / 2,
              x2: 40 + (AssetWidth + 75) / 2 + (ingredients[to].column - 1) * (AssetWidth + 75) + AssetWidth / 2,
              y2: to_r * (AssetHeight - 13) + AssetHeight / 2,
            });
            let path = {
              id: lineId++,
              x1: 40 + (AssetWidth + 75) / 2 + (ingredients[to].column - 1) * (AssetWidth + 75) + AssetWidth / 2,
              y1: to_r * (AssetHeight - 13) + AssetHeight / 2,
              x2: 40 + ingredients[to].column * (AssetWidth + 75),
              y2: to_r * (AssetHeight - 13) + AssetHeight / 2,
            };
            let to_compare = JSON.stringify(path);
            let exists = false;
            for (let line of lines)
              if (JSON.stringify(line) === to_compare) {
                exists = true;
                break;
              }
            if (!exists) lines.push(path);
          }
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
    return (
      <>
        <svg className="ingredients__line-container">
          {this.state.lineData.map((e) => (
            <line key={'ing_line' + e.id} className="product-info__asset__line" x1={e.x1 + 'px'} y1={e.y1 + 'px'} x2={e.x2 + 'px'} y2={e.y2 + 'px'} />
          ))}
        </svg>
        <div style={{ height: this.state.chartHeight + 'px', width: this.state.chartWidth + 'px' }} className="farmtostore__element-container">
          {this.state.ingredientData.map((e) => (
            <SingleAsset
              assetId={e.id}
              key={'flow-ing_' + e.id}
              top={e.row * (AssetHeight - 13) + 'px'}
              left={40 + e.column * (AssetWidth + 75) + 'px'}
              title={e.title.length > 17 ? e.title.substr(0, 17).trim() + '...' : e.title}
              subtitle={e.subtitle}
              organisationID={e.organisationID}
              color={AssetColor[e.type]}
              selected={this.state.selectedIngredient === e.id}
              selectAsset={this.selectIngredient}
            />
          ))}
        </div>
      </>
    );
  }
}
