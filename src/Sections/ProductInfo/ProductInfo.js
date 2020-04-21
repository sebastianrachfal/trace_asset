import React from 'react';
import './ProductInfo.scss';
import FarmToStore from '../../Components/FarmToStore/FarmToStore';
import Ingredients from '../../Components/Ingredients/Ingredients';
import TriangleIcon from '../../Components/TriangleIcon/TriangleIcon';
import InfoBox from '../../Components/InfoBox/InfoBox';

const AssetInfoEntry = (props) => (
  <div className="asset-info__entry">
    <div className="asset-info__entry-name">{props.name}</div>
    <div className="asset-info__entry-data">{props.data}</div>
  </div>
);

const ActionButton = (props) => (
  <button className={'asset-info__actions__button ' + props.className} onClick={() => props.onClick()}>
    {props.text}
    {!!props.print ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          style={{ fill: 'white' }}
          d="M16 18h-8v-1h8v1zm-2 1h-6v1h6v-1zm10-14v13h-4v6h-16v-6h-4v-13h4v-5h16v5h4zm-18 0h12v-3h-12v3zm12 10h-12v7h12v-7zm4-8h-20v9h2v-3h16v3h2v-9zm-1.5 1c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z"
        />
      </svg>
    ) : null}
  </button>
);

export default class ProductInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      assetInfo: {},
      selectedAssetPiece: undefined,
      assetData: [],
      ingredientData: [],
      viewChanged: false,
      showDocuments: false,
    };
    this.assetAction = this.assetAction.bind(this);
  }
  assetAction(action) {
    console.log('run ' + action);
  }
  componentDidMount() {
    this.setState({ ingredientData: this.props.ingredientData, assetData: this.props.assetData, assetInfo: this.props.assetInfo });
  }
  getOrgByID(id) {
    for (let asset of this.state.assetData) if (asset.id === id) return asset.title;

    return '';
  }
  render() {
    return this.state.assetData.length > 0 ? (
      <section className="product-info">
        <div
          onClick={() => this.setState({ showDocuments: false })}
          style={this.state.showDocuments ? { height: window.document.body.offsetHeight + 'px' } : { display: 'none' }}
          className="product-info__document-background"
        ></div>
        <div className="product-chart">
          <div className="product-info__popup" style={this.state.showDocuments ? {} : { display: 'none' }}>
            <svg
              onClick={() => this.setState({ showDocuments: false })}
              className="product-info__popup__close"
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              enableBackground="new 0 0 492 492"
              version="1.1"
              viewBox="0 0 492 492"
              xmlSpace="preserve"
            >
              <path d="M300.188 246L484.14 62.04c5.06-5.064 7.852-11.82 7.86-19.024 0-7.208-2.792-13.972-7.86-19.028L468.02 7.872C462.952 2.796 456.196.016 448.984.016c-7.2 0-13.956 2.78-19.024 7.856L246.008 191.82 62.048 7.872C56.988 2.796 50.228.016 43.02.016c-7.2 0-13.96 2.78-19.02 7.856L7.872 23.988c-10.496 10.496-10.496 27.568 0 38.052L191.828 246 7.872 429.952C2.808 435.024.02 441.78.02 448.984c0 7.204 2.788 13.96 7.852 19.028l16.124 16.116c5.06 5.072 11.824 7.856 19.02 7.856 7.208 0 13.968-2.784 19.028-7.856l183.96-183.952 183.952 183.952c5.068 5.072 11.824 7.856 19.024 7.856h.008c7.204 0 13.96-2.784 19.028-7.856l16.12-16.116c5.06-5.064 7.852-11.824 7.852-19.028 0-7.204-2.792-13.96-7.852-19.028L300.188 246z"></path>
            </svg>
            <div style={{ overflowY: 'auto', maxHeight: '700px' }}>
              <table className="product-info__popup__table">
                <thead>
                  <tr>
                    <th>Asset type</th>
                    <th>uniqueID</th>
                    <th>eventType</th>
                    <th>eventID</th>
                    <th>organisationName</th>
                    <th>timeStamp</th>
                    <th>documentName</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ingredientData.map((e) => (
                    <tr key={e.uniqueID + e.document}>
                      <td>{e.title}</td>
                      <td>{e.uniqueID}</td>
                      <td>{e.eventType}</td>
                      <td>{e.eventID}</td>
                      <td>{this.getOrgByID(e.organisationID)}</td>
                      <td>{e.timeStamp}</td>
                      <td onClick={() => console.log('document ' + e.document)} className="product-info__popup__table__link">
                        {e.document}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="product-info__heading">
            <button
              onClick={() => {
                this.props.assetPiece(undefined);
                this.setState({ viewChanged: false, selectedAssetPiece: undefined });
              }}
              className={'product-info__heading__button product-info__heading__text ' + (this.state.viewChanged ? 'product-info__heading__button--inactive' : '')}
            >
              Farm to store view
            </button>
            <button
              onClick={() => {
                this.props.assetPiece(undefined);
                this.setState({ viewChanged: true, selectedAssetPiece: undefined });
              }}
              className={'product-info__heading__button product-info__heading__text ' + (this.state.viewChanged ? '' : 'product-info__heading__button--inactive')}
            >
              Ingredient view
            </button>
          </div>
          <div></div>
          <div className="product-info__timeline-container">
            <div className="product-info__timeline">
              <div style={{ display: 'inline-flex', height: '100%', alignItems: 'center' }}>
                <div className="product-info__timeline__name">Timeline</div>

                <div className="product-info__timeline__month">
                  <div className="product-info__timeline__month__name">February</div>
                  <div className="product-info__timeline__month__timestamp">
                    Begin
                    <br />4 february 2020
                  </div>
                  <div className="product-info__timeline__month__time-line"></div>

                  <div className="product-info__timeline__month__line">
                    <div className="product-info__timeline__month__line__asset" style={{ width: '100%' }}></div>
                  </div>
                  <div className="product-info__timeline__month__line">
                    <div className="product-info__timeline__month__line__asset" style={{ width: '65%', marginLeft: '35%' }}></div>
                  </div>
                  <div className="product-info__timeline__month__line">
                    <div className="product-info__timeline__month__line__asset" style={{ width: '40%' }}></div>
                  </div>
                  <div className="product-info__timeline__month__line">
                    <div className="product-info__timeline__month__line__asset" style={{ width: '20%', marginLeft: '80%' }}></div>
                  </div>
                </div>
                <div className="product-info__timeline__month">
                  <div className="product-info__timeline__month__name">March</div>
                  <div className="product-info__timeline__month__line">
                    <div className="product-info__timeline__month__line__asset" style={{ width: '25%', marginLeft: '25%', backgroundColor: '#ffa700' }}></div>
                  </div>
                  <div className="product-info__timeline__month__line">
                    <div className="product-info__timeline__month__line__asset" style={{ width: '50%', backgroundColor: '#ffa700' }}></div>
                    <div className="product-info__timeline__month__line__asset" style={{ marginLeft: '5%', width: '20%', backgroundColor: '#ffa700' }}></div>
                    <div className="product-info__timeline__month__line__asset" style={{ marginLeft: '5%', width: '20%', backgroundColor: '#1b6fe5' }}></div>
                  </div>
                  <div className="product-info__timeline__month__line">
                    <div className="product-info__timeline__month__line__asset" style={{ width: '50%', backgroundColor: '#a85400' }}></div>
                  </div>
                </div>
                <div style={{ width: '328px' }} className="product-info__timeline__month">
                  <div className="product-info__timeline__month__name">April</div>
                  <div className="product-info__timeline__month__timestamp" style={{ left: '98.5%' }}>
                    End
                    <br />
                    23 april 2020
                  </div>
                  <div className="product-info__timeline__month__time-line" style={{ left: '95%' }}></div>

                  <div className="product-info__timeline__month__line">
                    <div className="product-info__timeline__month__line__asset" style={{ width: '15%', backgroundColor: '#a85400' }}></div>
                    <div className="product-info__timeline__month__line__asset" style={{ marginLeft: '5%', width: '80%', backgroundColor: '#33b8f9' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-info__flowchart">
            {this.state.viewChanged ? (
              <Ingredients ingredientData={this.state.ingredientData} selectAsset={(asset) => this.props.assetPiece(asset)} />
            ) : (
              <FarmToStore assetData={this.state.assetData} selectAsset={(asset) => this.props.assetPiece(asset)} />
            )}
          </div>
        </div>
        <div className="asset-info">
          <div className="asset-info__tab">
            <div className="asset-info__heading">
              <span className="asset-info__heading__text">Asset selected</span>
            </div>
            <div className="asset-info__entry-container">
              <AssetInfoEntry name="Unique id" data={this.state.assetInfo.uniqueId} />
              <AssetInfoEntry name="assetType" data={this.state.assetInfo.assetType} />
              <AssetInfoEntry name="assetID" data={this.state.assetInfo.assetID} />
              <AssetInfoEntry name="timeStamp" data={this.state.assetInfo.timeStamp} />
            </div>
            <div style={this.state.viewMoreInfo ? {} : { display: 'none' }} className="asset-info__more-info-container">
              <AssetInfoEntry name="createdBy" data={this.state.assetInfo.createdBy} />
              <AssetInfoEntry name="organisationName" data={this.state.assetInfo.organisationName} />
              <AssetInfoEntry name="packagingID" data={this.state.assetInfo.packagingID} />
              <AssetInfoEntry name="Quantity" data={this.state.assetInfo.quantity} />

              <div className="asset-info__entry">
                <div className="asset-info__entry-name">Documents assigned</div>
                <div className="asset-info__entry-data asset-info__entry-data__link" onClick={() => this.setState({ showDocuments: true })}>
                  view all
                </div>
              </div>
            </div>
            <div className="asset-info__more-info" onClick={() => this.setState({ viewMoreInfo: !this.state.viewMoreInfo })}>
              <div style={this.state.viewMoreInfo ? { display: 'none' } : {}} className="asset-info__more-info__text">
                view more info
              </div>
              <TriangleIcon rotated={this.state.viewMoreInfo} className="asset-info__more-info__triangle" />
            </div>
          </div>
          <div className="asset-info__tab asset-info__actions">
            <div
              style={this.state.viewMoreInfo ? { cursor: 'pointer' } : {}}
              onClick={() => {
                if (this.state.viewMoreInfo) this.setState({ viewMoreInfo: !this.state.viewMoreInfo });
              }}
              className="asset-info__heading"
            >
              <span className="asset-info__heading__text">Actions</span>
              {this.state.viewMoreInfo ? <TriangleIcon rotated={this.state.viewMoreInfo} className="asset-info__more-info__triangle" /> : null}
            </div>
            <div style={this.state.viewMoreInfo ? { display: 'none' } : {}}>
              <div className="asset-info__entry-container">
                <InfoBox style={{ padding: '10px' }} text="Assign assignments to selected asset" />
              </div>
              <div className="asset-info__actions__button-container">
                <ActionButton onClick={() => this.assetAction('add_doc')} text={'Add documents'} className="asset-info__actions__button--add-documents" />
                <ActionButton onClick={() => this.assetAction('init_recall')} text={'Initiate recall'} className="asset-info__actions__button--initiate" />
                <ActionButton onClick={() => this.assetAction('print')} text={'Print path'} print={true} className="asset-info__actions__button--print" />
              </div>
            </div>
          </div>
        </div>
      </section>
    ) : null;
  }
}
