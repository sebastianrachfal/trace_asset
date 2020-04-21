import React from 'react';
import './AssetPieceInfo.scss';
import TriangleIcon from '../../Components/TriangleIcon/TriangleIcon';

const AssetColor = ['#18e51d', '#ffa701', '#a85400', '#1b6fe5', '#33b8f9'];

const ChainLink = (props) => (
  <svg
    key={props.k}
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    enableBackground="new 0 0 511.997 511.997"
    version="1.1"
    viewBox="0 0 511.997 511.997"
    xmlSpace="preserve"
    style={{ transform: 'rotate(45deg)', width: '55px', fill: '#3c89ff' }}
  >
    <path
      d="M211.26 389.24l-60.331 60.331c-25.012 25.012-65.517 25.012-90.508.005-24.996-24.996-24.996-65.505-.005-90.496l120.683-120.683c24.991-24.992 65.5-24.992 90.491 0 8.331 8.331 21.839 8.331 30.17 0 8.331-8.331 8.331-21.839 0-30.17-41.654-41.654-109.177-41.654-150.831 0L30.247 328.909c-41.654 41.654-41.654 109.177 0 150.831 41.649 41.676 109.177 41.676 150.853 0l60.331-60.331c8.331-8.331 8.331-21.839 0-30.17s-21.84-8.33-30.171.001z"
      transform="translate(1 1)"
    ></path>
    <path
      d="M479.751 30.24c-41.654-41.654-109.199-41.654-150.853 0l-72.384 72.384c-8.331 8.331-8.331 21.839 0 30.17 8.331 8.331 21.839 8.331 30.17 0l72.384-72.384c24.991-24.992 65.521-24.992 90.513 0 24.991 24.991 24.991 65.5 0 90.491L316.845 283.638c-24.992 24.992-65.5 24.992-90.491 0-8.331-8.331-21.839-8.331-30.17 0s-8.331 21.839 0 30.17c41.654 41.654 109.177 41.654 150.831 0l132.736-132.736c41.654-41.654 41.654-109.178 0-150.832z"
      transform="translate(1 1)"
    ></path>
  </svg>
);

const ChainData = {
  'Inbound transports': [
    {
      id: 0,
      con_to: 2,
      name: 'Inbound transport',
      assetType: 'Eieren',
      uniqueID: '2cx00asf',
      timestamp: '2020-03-02 07:42:02',
      createdBy: '21awdasfcxzcvza',
      eventID: 'azsdfsdg34e1q12',
      packagingID: 'Pallet',
      Quantity: 2000,
    },
    {
      id: 1,
      con_to: 2,
      name: 'Inbound transport',
      assetType: 'Bloem',
      uniqueID: '2cx00asf',
      timestamp: '2020-03-02 07:42:02',
      createdBy: '21awdasfcxzcvza',
      eventID: 'azsdfsdg34e1q12',
      packagingID: 'Pallet',
      Quantity: 2000,
    },
  ],
  Transformation: [
    {
      id: 2,
      con_to: 3,
      name: 'Transformation',
      assetType: 'Bloem',
      uniqueID: '2cx00asf',
      timestamp: '2020-03-02 07:42:02',
      createdBy: '21awdasfcxzcvza',
      eventID: 'azsdfsdg34e1q12',
      packagingID: 'Pallet',
      Quantity: 2000,
    },
  ],
  'Quality control': [
    {
      id: 3,
      name: 'Quality control',
      eventType: 'Bloem',
      uniqueID: '2cx00asf',
      timestamp: '2020-03-02 07:42:02',
      createdBy: '21awdasfcxzcvza',
      eventID: 'azsdfsdg34e1q12',
      packagingID: 'Pallet',
      Quantity: 2000,
    },
  ],
};

const AssetPieceEntry = (props) => (
  <div className="asset-piece-info__entry">
    <div className="asset-piece-info__entry-name">{props.name}</div>
    <div className="asset-piece-info__entry-data">{props.data}</div>
  </div>
);
const ItemEntry = (props) => (
  <div className="chain-view__item__entry">
    <div className="chain-view__item__entry-name">{props.name}</div>
    <div className="chain-view__item__entry-data">{props.data}</div>
  </div>
);

class Traceability extends React.Component {
  constructor() {
    super();
    this.cnvRef = React.createRef();
    this.redraw = this.redraw.bind(this);
  }
  redraw() {
    let percent = this.props.percent / 100;
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.restore();
    const draw = (from, to, color) => {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 55, Math.PI * 2 * from, Math.PI * 2 * to, false);
      this.ctx.strokeStyle = color;
      this.ctx.lineCap = 'square';
      this.ctx.lineWidth = 10;
      this.ctx.stroke();
    };
    draw(percent, 1, '#f0f0f0');
    draw(0, Math.min(0.5, percent), '#05c155');
    if (percent > 0.5) draw(0.5, Math.min(0.8, percent), '#7bdba4');
    if (percent > 0.8) draw(0.8, Math.min(0.965, percent), '#adf3cb');
  }
  componentDidMount() {
    this.ctx = this.cnvRef.current.getContext('2d');
    this.ctx.translate(60, 60);
    this.ctx.rotate(-0.2 * Math.PI);
    this.redraw();
  }
  componentDidUpdate() {
    this.redraw();
  }
  render() {
    return (
      <div className="traceability">
        <div className="traceability__percent">{(this.props.percent || 0).toFixed()}%</div>
        <canvas ref={this.cnvRef} width="120" height="120"></canvas>
      </div>
    );
  }
}

export default function AssetPieceInfo(props) {
  let asset = props.assetPiece;
  let entries = Object.entries(ChainData);
  let chains = [];
  let temp = 0; //tochange
  let svg = React.createRef();
  let refs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];
  const [lines, setLines] = React.useState();
  const calculate = () => {
    let b = refs;
    let a = b.map((e) => (!!e.current ? e.current.getClientRects()[0] : undefined));
    if (!!a[0]) {
      let s = svg.current.getClientRects()[0];
      let linesx = [];
      linesx.push({
        x1: a[0].left - s.left + 420,
        y1: a[0].top - s.top + 127,
        x2: a[2].left - s.left,
        y2: a[2].top - s.top + 254 / 3,
      });
      linesx.push({
        x1: a[1].left - s.left + 420,
        y1: a[1].top - s.top + 127,
        x2: a[2].left - s.left,
        y2: a[2].top - s.top + (254 / 3) * 2,
      });
      linesx.push({
        x1: a[2].left - s.left + 420,
        y1: a[2].top - s.top + 127,
        x2: a[3].left - s.left,
        y2: a[3].top - s.top + 127,
      });
      console.log(linesx);
      setLines(linesx);
    }
  };
  const [shown, setShown] = React.useState();
  for (let i = 0; i < entries.length; i++) {
    let e = entries[i];
    chains.push(
      <div className="chain-view__section" key={e[0]}>
        <span className="chain-view__section__text chain-view__section__text--num">{e[1].length}</span>
        <span className="chain-view__section__text">{e[0]}</span>
      </div>
    );
    if (i !== entries.length - 1) chains.push(<ChainLink key={'chain_' + e[0]} />);
  }
  // eslint-disable-next-line
  React.useEffect(() => calculate(), [shown]);
  return !!asset ? (
    <>
      <section className="asset-piece-info">
        <div className="asset-piece-info__container" style={{ borderTopColor: AssetColor[asset.type] }}>
          <div className="asset-piece-info__heading">
            {asset.title}
            <button className="asset-piece-info__heading__button">
              <svg xmlns="http://www.w3.org/2000/svg" width="448pt" height="448pt" viewBox="0 0 448 448">
                <path d="M408 184H272a8 8 0 01-8-8V40c0-22.09-17.91-40-40-40s-40 17.91-40 40v136a8 8 0 01-8 8H40c-22.09 0-40 17.91-40 40s17.91 40 40 40h136a8 8 0 018 8v136c0 22.09 17.91 40 40 40s40-17.91 40-40V272a8 8 0 018-8h136c22.09 0 40-17.91 40-40s-17.91-40-40-40zm0 0"></path>
              </svg>
              Add partner
            </button>
          </div>
          <div className="asset-piece-info__content">
            <div className="asset-piece-info__data">
              <AssetPieceEntry name="Public key" data={asset.pkey} />
              <AssetPieceEntry name="Address" data={asset.address} />
              <AssetPieceEntry name="Phone number" data={asset.phone} />
              <AssetPieceEntry name="Vat number" data={asset.vat} />
              <AssetPieceEntry name="Country" data={asset.country} />
              <AssetPieceEntry name="Email address" data={asset.email} />
            </div>
            <div className="traceability__container">
              <div className="traceability__container-inner">
                <div className="asset-piece-info__entry-name" style={{ textAlign: 'center' }}>
                  Traceability score
                </div>
                <Traceability percent={asset.percent} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="chain-view">
        <div className="chain-view__container">
          <div className="chain-view__section-container">{chains}</div>
          <div className="chain-view__chart">
            <svg ref={svg} className="chain-view__line-container">
              {(!!lines
                ? lines
                : [
                    { x1: 420, y1: 157, x2: 532.5, y2: 241.66 },
                    { x1: 420, y1: 441, x2: 532.5, y2: 326.33 },
                    { x1: 952.5, y1: 284, x2: 1065, y2: 284 },
                  ]
              ).map((e) => (
                <line key={e.x1 + '_' + e.y1} className="product-info__asset__line" x1={e.x1 + 'px'} y1={e.y1 + 'px'} x2={e.x2 + 'px'} y2={e.y2 + 'px'} />
              ))}
            </svg>
            {entries.map((e) => (
              <div key={e[0]} className="chain-view__column">
                {e[1].map((f) => (
                  <div key={f.id} className="chain-view__item" style={++temp === 3 || temp === 4 ? { marginTop: '157px' } : {}} ref={refs[temp - 1]}>
                    <div className="asset-piece-info__heading chain-view__item__heading">{f.name}</div>
                    <div className="chain-view__item__container">
                      {!!f.assetType ? <ItemEntry name="assetType" data={f.assetType} /> : null}
                      {!!f.eventType ? <ItemEntry name="eventType" data={f.eventType} /> : null}
                      <ItemEntry name="uniqueID" data={f.uniqueID} />
                      <ItemEntry name="timestamp" data={f.timestamp} />
                    </div>
                    <div
                      className="chain-view__item__triangle-container"
                      onClick={() => {
                        setShown(shown === f.id ? undefined : f.id);
                      }}
                    >
                      <TriangleIcon rotated={f.id === shown} className="asset-info__more-info__triangle chain-view__item__triangle" />
                    </div>
                    {f.id === shown ? (
                      <div className="chain-view__item__container" style={{ backgroundColor: '#f8f8f8', paddingBottom: '10px', paddingTop: '10px' }}>
                        <ItemEntry name="createdBy" data={f.createdBy} />
                        <ItemEntry name="eventID" data={f.eventID} />
                        <div className="chain-view__item__spacer"></div>
                        <ItemEntry name="packagingID" data={f.packagingID} />
                        <ItemEntry name="Quantity" data={f.Quantity} />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  ) : null;
}
