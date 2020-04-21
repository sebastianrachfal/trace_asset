import React from 'react';
import InfoBox from '../../Components/InfoBox/InfoBox';
import Calendar from 'react-calendar';
import './Searchboxes.scss';
import 'react-calendar/dist/Calendar.css';
import TriangleIcon from '../../Components/TriangleIcon/TriangleIcon';

const PackingName = ['Lot', 'Pallet', 'Serial'];
const ContStyle = { zIndex: 5, position: 'absolute', top: '100%', outline: 'none' };
const SearchIcon = (props) => (
  <svg onClick={() => props.onClick()} style={{ height: '20px', cursor: 'pointer' }} viewBox="0 0 511.999 511.999">
    <path
      style={{ fill: '#aaaaaa' }}
      d="M508.874,478.708L360.142,329.976c28.21-34.827,45.191-79.103,45.191-127.309c0-111.75-90.917-202.667-202.667-202.667
S0,90.917,0,202.667s90.917,202.667,202.667,202.667c48.206,0,92.482-16.982,127.309-45.191l148.732,148.732
c4.167,4.165,10.919,4.165,15.086,0l15.081-15.082C513.04,489.627,513.04,482.873,508.874,478.708z M202.667,362.667
c-88.229,0-160-71.771-160-160s71.771-160,160-160s160,71.771,160,160S290.896,362.667,202.667,362.667z"
    />
  </svg>
);
const CalendarIcon = () => (
  <svg className="searchbox__date__text__icon" xmlns="http://www.w3.org/2000/svg" x="0" y="0" enableBackground="new 0 0 512 512" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve">
    <path d="M452 40h-24V0h-40v40H124V0H84v40H60C26.916 40 0 66.916 0 100v352c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60V100c0-33.084-26.916-60-60-60zm20 412c0 11.028-8.972 20-20 20H60c-11.028 0-20-8.972-20-20V188h432v264zm0-304H40v-48c0-11.028 8.972-20 20-20h24v40h40V80h264v40h40V80h24c11.028 0 20 8.972 20 20v48z"></path>
    <path d="M76 230H116V270H76z"></path>
    <path d="M156 230H196V270H156z"></path>
    <path d="M236 230H276V270H236z"></path>
    <path d="M316 230H356V270H316z"></path>
    <path d="M396 230H436V270H396z"></path>
    <path d="M76 310H116V350H76z"></path>
    <path d="M156 310H196V350H156z"></path>
    <path d="M236 310H276V350H236z"></path>
    <path d="M316 310H356V350H316z"></path>
    <path d="M76 390H116V430H76z"></path>
    <path d="M156 390H196V430H156z"></path>
    <path d="M236 390H276V430H236z"></path>
    <path d="M316 390H356V430H316z"></path>
    <path d="M396 310H436V350H396z"></path>
  </svg>
);

export default class Searchboxes extends React.Component {
  constructor() {
    super();
    this.state = {
      hideInfo: false,
      startDate: undefined,
      endDate: undefined,
      startDateN: undefined,
      endDateN: undefined,
      cal1visible: false,
      cal2visible: false,
      cal3visible: false,
      cal4visible: false,
      packingID: 0,
      lots: [
        {
          id: '4444',
          pallets: [
            {
              id: '0000001',
              serials: [
                '1fsadvxcva234',
                '1fsadvxcva235',
                '1fsadvxcva236',
                '1fsadvxcva237',
                '1fsadvxcva238',
                '1fsadvxcva239',
                '1fsadvxcva2310',
                '1fsadvxcva2311',
                '1fsadvxcva2312',
                '1fsadvxcva2313',
                '1fsadvxcva2314',
              ],
            },
            {
              id: '0000002',
              serials: [
                '11fsadvxcva23',
                '12fsadvxcva23',
                '13fsadvxcva23',
                '14fsadvxcva23',
                '15fsadvxcva23',
                '16fsadvxcva23',
                '17fsadvxcva23',
                '18fsadvxcva23',
                '19fsadvxcva23',
                '110fsadvxcva23',
                '111fsadvxcva23',
              ],
            },
            {
              id: '0000003',
              serials: [
                '1f1sadvxcva23',
                '1f2sadvxcva23',
                '1f3sadvxcva23',
                '1f4sadvxcva23',
                '1f5sadvxcva23',
                '1f6sadvxcva23',
                '1f7sadvxcva23',
                '1f8sadvxcva23',
                '1f9sadvxcva23',
                '1f10sadvxcva23',
                '1f11sadvxcva23',
              ],
            },
            {
              id: '0000004',
              serials: [
                '1fs1advxcva23',
                '1fs2advxcva23',
                '1fs3advxcva23',
                '1fs4advxcva23',
                '1fs5advxcva23',
                '1fs6advxcva23',
                '1fs7advxcva23',
                '1fs8advxcva23',
                '1fs9advxcva23',
                '1fs10advxcva23',
                '1fs11advxcva23',
              ],
            },
          ],
        },
      ],
      palletSearch: undefined,
      lotSearch: undefined,
      palletSearchInfo: undefined,
      lotSearchInfo: undefined,
      serialSearch: '',
      serialID: '',
      typedLabel: false,
      showDateType: false,
      currentDateType: '',
      dateItems: ['Inbound date', 'Outbound date', 'Expiration date', 'Creation date', 'Transformation date', 'Other date'],
    };
    this.search = this.search.bind(this);
    this.calendar1 = React.createRef();
    this.calendar2 = React.createRef();
    this.calendar3 = React.createRef();
    this.calendar4 = React.createRef();
    this.uniqueIDRef = React.createRef();
    this.labelRef = React.createRef();
    this.packingRef = React.createRef();
    this.serialRef = React.createRef();
    this.dateDropdownRef = React.createRef();
    this.dispatchSearch = this.dispatchSearch.bind(this);
  }
  dispatchSearch(id) {
    //lot pallet serial search
    if (this.state.packingID === 0) {
      let choosen = undefined;
      for (let lot of this.state.lots)
        if (lot.id === id) {
          choosen = lot;
          break;
        }
      if (choosen === undefined) {
        console.error('lot not found');
      } else this.setState({ lotSearch: id, lotSearchInfo: choosen });
    } else if (this.state.packingID === 1) {
      let choosen = undefined;
      for (let lot of this.state.lots)
        for (let pallet of lot.pallets)
          if (pallet.id === id) {
            choosen = pallet;
            break;
          }
      if (choosen === undefined) {
        console.error('pallet not found');
      } else this.setState({ palletSearch: id, palletSearchInfo: choosen });
    } else this.search('serial', id);

    this.setState({});
  }
  packingChange(id) {
    this.setState({ packingID: id });
  }
  search(searchbox, key) {
    this.props.search(searchbox, key);
    this.setState({ hideInfo: true });
  }
  getItems(packType) {
    let ret = [];
    if (packType === 0) {
      ret = this.state.lots.map((e) => e.id);
    } else if (packType === 1) {
      for (let x of this.state.lots) {
        if (!!!this.state.lotID || (!!this.state.lotID && this.state.lotID === x.id))
          for (let y of x.pallets) {
            ret.push(y.id);
          }
      }
    } else {
      for (let x of this.state.lots) {
        if (!!!this.state.lotID || (!!this.state.lotID && this.state.lotID === x.id))
          for (let y of x.pallets) {
            if (!!!this.state.palletID || (!!this.state.palletID && this.state.palletID === y.id))
              for (let z of y.serials) {
                if (z.includes(this.state.serialSearch)) ret.push(z);
              }
          }
      }
    }
    return ret;
  }
  render() {
    const compDates = (d1, d2) => {
      if (!!d1 && !!d2) if (d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getYear() === d2.getYear()) return true;
      return false;
    };
    let items1 = this.getItems(0);
    let items2 = this.getItems(1);
    let items3 = this.getItems(2);
    return (
      <>
        <section className="searchbox-container">
          <div className="searchbox">
            <div className="searchbox__heading">Asset uniqueID</div>
            <div className="searchbox__search">
              <input ref={this.uniqueIDRef} className="searchbox__search__input" type="text" placeholder="Enter uniqueID here" />
              <SearchIcon onClick={() => this.search('uniqueID', this.uniqueIDRef.current.value)} />
            </div>
            {this.state.hideInfo ? null : <InfoBox text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel magna porttitor, ornare sem a, porttitor tortor. Nulla facilisi." />}
          </div>
          <div className="searchbox">
            <div className="searchbox__heading">Product label</div>
            <div className="searchbox__search">
              <input ref={this.labelRef} className="searchbox__search__input" type="text" placeholder="Enter uniqueID here" />
              <SearchIcon
                onClick={() => {
                  this.setState({ typedLabel: this.labelRef.current.value.length > 0 });
                  // this.search('label', this.labelRef.current.value);
                }}
              />
            </div>
            {this.state.hideInfo ? null : <InfoBox text="Start typing to narrow down the options" />}
          </div>
          <div className="searchbox">
            <div className="searchbox__heading">
              <div className="searchbox__heading_split">Start date</div>
              <div className="searchbox__heading_split">End date</div>
            </div>
            <div className="searchbox__date__container">
              <div className="searchbox__date">
                <div
                  onClick={() =>
                    this.setState({ cal1visible: !this.state.cal1visible, cal2visible: false }, () => {
                      if (this.state.cal1visible) this.calendar1.current.focus();
                    })
                  }
                  className="searchbox__date__text"
                >
                  <div className={'searchbox__date__inner ' + (!!this.state.startDate ? '' : 'searchbox__search__input--placeholder')}>
                    {!!this.state.startDate
                      ? `${(this.state.startDate.getMonth() + 1 + '').padStart(2, '0')} / ${(this.state.startDate.getDate() + '').padStart(2, '0')} / ${1900 + this.state.startDate.getYear()}`
                      : 'mm / dd / yyyy'}
                  </div>
                  <CalendarIcon />
                </div>
                <div
                  tabIndex={0}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      this.setState({ cal1visible: false });
                    }
                  }}
                  ref={this.calendar1}
                  style={{ ...ContStyle, left: 0, display: this.state.cal1visible ? 'block' : 'none' }}
                >
                  <Calendar
                    onBlur={() => this.setState({ cal1visible: false, cal2visible: false })}
                    locale="en-EN"
                    onChange={(date) => this.setState({ startDate: date, cal1visible: false })}
                    tileClassName={({ activeStartDate, date, view }) =>
                      date > this.state.startDate && date < this.state.endDate
                        ? 'searchbox__date__selected'
                        : compDates(date, this.state.startDate)
                        ? 'searchbox__date__selected--start'
                        : compDates(date, this.state.endDate)
                        ? 'searchbox__date__selected--end'
                        : null
                    }
                  />
                </div>
              </div>
              <div className="searchbox__date">
                <div
                  className="searchbox__date__text"
                  onClick={() =>
                    this.setState({ cal2visible: !this.state.cal2visible, cal1visible: false }, () => {
                      if (this.state.cal2visible) {
                        this.calendar2.current.focus();
                      }
                    })
                  }
                >
                  <div className={'searchbox__date__inner ' + (!!this.state.endDate ? '' : 'searchbox__search__input--placeholder')}>
                    {!!this.state.endDate
                      ? `${(this.state.endDate.getMonth() + 1 + '').padStart(2, '0')} / ${(this.state.endDate.getDate() + '').padStart(2, '0')} / ${1900 + this.state.endDate.getYear()}`
                      : 'mm / dd / yyyy'}
                  </div>

                  <CalendarIcon />
                </div>
                <div
                  tabIndex={1}
                  ref={this.calendar2}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      this.setState({ cal2visible: false });
                    }
                  }}
                  style={{ ...ContStyle, right: 0, display: this.state.cal2visible ? 'block' : 'none' }}
                >
                  <Calendar
                    locale="en-EN"
                    onChange={(date) => this.setState({ endDate: date, cal2visible: false })}
                    tileClassName={({ activeStartDate, date, view }) =>
                      date > this.state.startDate && date < this.state.endDate
                        ? 'searchbox__date__selected'
                        : compDates(date, this.state.startDate)
                        ? 'searchbox__date__selected--start'
                        : compDates(date, this.state.endDate)
                        ? 'searchbox__date__selected--end'
                        : null
                    }
                  />
                </div>
              </div>
            </div>
            {this.state.hideInfo ? null : (
              <>
                <InfoBox text="Find all your assets created between selected dates" />
                <button className="searchbox__find" onClick={() => this.search('from_date', [this.state.startDate, this.state.endDate])}>
                  Find asset
                </button>
              </>
            )}
          </div>
        </section>
        {this.state.hideInfo || !this.state.typedLabel ? null : (
          <>
            <h3 style={{ marginTop: '20px' }} className="trace__heading">
              Narrow trace option
            </h3>
            <section style={{ marginTop: '10px' }} className="searchbox-container">
              <div className="searchbox">
                <div className="searchbox__heading">Data type</div>
                <div
                  className="searchbox__search"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    this.setState({ showDateType: !this.state.showDateType }, () => {
                      if (this.state.showDateType) this.dateDropdownRef.current.focus();
                    });
                  }}
                >
                  {/* <input ref={this.uniqueIDRef} className="searchbox__search__input"type="text" placeholder="Enter uniqueID here"  /> */}
                  {/* <select defaultValue="-1" className="searchbox__date-type" onChange={(e) => this.setState({ dateType: e.target.value })}>
                    <option value="-1" disabled>
                      Select date type
                    </option>
                    <option value="0">date1</option>
                    <option value="1">date2</option>
                  </select> */}
                  <div className={'searchbox__search__input ' + (this.state.currentDateType.length > 0 ? '' : 'searchbox__search__input--placeholder')}>
                    {this.state.currentDateType.length > 0 ? this.state.currentDateType : 'Select date type'}
                  </div>
                  {this.state.showDateType ? (
                    <div tabIndex={5} ref={this.dateDropdownRef} className="searchbox__search__input__dropdown" onBlur={() => this.setState({ showDateType: false })}>
                      {this.state.dateItems.map((e) => (
                        <div onClick={() => this.setState({ currentDateType: e })} key={'drop_' + e} className="searchbox__search__input__dropdown__item">
                          {e}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <TriangleIcon className="asset-info__more-info__triangle" />
                </div>
                <div className="searchbox__heading" style={{ marginTop: '15px' }}>
                  <div className="searchbox__heading_split">Start date</div>
                  <div className="searchbox__heading_split">End date</div>
                </div>
                <div className="searchbox__date__container">
                  <div className="searchbox__date">
                    <div
                      onClick={() =>
                        this.setState({ cal3visible: !this.state.cal3visible, cal4visible: false }, () => {
                          if (this.state.cal3visible) this.calendar3.current.focus();
                        })
                      }
                      className="searchbox__date__text"
                    >
                      <div className={'searchbox__date__inner ' + (!!this.state.startDateN ? '' : 'searchbox__search__input--placeholder')}>
                        {!!this.state.startDateN
                          ? `${(this.state.startDateN.getMonth() + 1 + '').padStart(2, '0')} / ${(this.state.startDateN.getDate() + '').padStart(2, '0')} / ${1900 + this.state.startDateN.getYear()}`
                          : 'mm / dd / yyyy'}
                      </div>
                      <CalendarIcon />
                    </div>
                    <div
                      tabIndex={0}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          this.setState({ cal3visible: false });
                        }
                      }}
                      ref={this.calendar3}
                      style={{ ...ContStyle, left: 0, display: this.state.cal3visible ? 'block' : 'none' }}
                    >
                      <Calendar
                        onBlur={() => this.setState({ cal3visible: false, cal4visible: false })}
                        locale="en-EN"
                        onChange={(date) => this.setState({ startDateN: date, cal3visible: false })}
                        tileClassName={({ activeStartDate, date, view }) =>
                          date > this.state.startDateN && date < this.state.endDateN
                            ? 'searchbox__date__selected'
                            : compDates(date, this.state.startDateN)
                            ? 'searchbox__date__selected--start'
                            : compDates(date, this.state.endDateN)
                            ? 'searchbox__date__selected--end'
                            : null
                        }
                      />
                    </div>
                  </div>
                  <div className="searchbox__date">
                    <div
                      className="searchbox__date__text"
                      onClick={() =>
                        this.setState({ cal4visible: !this.state.cal4visible, cal3visible: false }, () => {
                          if (this.state.cal4visible) {
                            this.calendar4.current.focus();
                          }
                        })
                      }
                    >
                      <div className={'searchbox__date__inner ' + (!!this.state.endDateN ? '' : 'searchbox__search__input--placeholder')}>
                        {!!this.state.endDateN
                          ? `${(this.state.endDateN.getMonth() + 1 + '').padStart(2, '0')} / ${(this.state.endDateN.getDate() + '').padStart(2, '0')} / ${1900 + this.state.endDateN.getYear()}`
                          : 'mm / dd / yyyy'}
                      </div>

                      <CalendarIcon />
                    </div>
                    <div
                      tabIndex={1}
                      ref={this.calendar4}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          this.setState({ cal4visible: false });
                        }
                      }}
                      style={{ ...ContStyle, right: 0, display: this.state.cal4visible ? 'block' : 'none' }}
                    >
                      <Calendar
                        locale="en-EN"
                        onChange={(date) => this.setState({ endDateN: date, cal4visible: false })}
                        tileClassName={({ activeStartDate, date, view }) =>
                          date > this.state.startDateN && date < this.state.endDateN
                            ? 'searchbox__date__selected'
                            : compDates(date, this.state.startDateN)
                            ? 'searchbox__date__selected--start'
                            : compDates(date, this.state.endDateN)
                            ? 'searchbox__date__selected--end'
                            : null
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {this.state.currentDateType.length > 0 && !!this.state.endDateN ? (
                <div className="searchbox__wide__container">
                  <div className="searchbox__wide__box searchbox__wide__lot">
                    <div className="searchbox__heading">{`${items1.length} lot found`}</div>
                    <div className="searchbox__entry__lot__container">
                      <div className="searchbox__entry__lot-id searchbox__entry__lot-id--main">Number</div>
                      <div className="searchbox__entry__lot-date searchbox__entry__lot-date--main">Expiration date</div>
                    </div>{' '}
                    <div className="searchbox__entry-container">
                      {items1.map((e) => (
                        <div onClick={() => this.setState({ lotID: e })} className="searchbox__entry" key={e}>
                          <div className="searchbox__entry__lot-id">
                            <div className={'searchbox__entry__circle ' + (this.state.lotID === e ? 'searchbox__entry__circle--selected' : '')}></div>
                            {e}
                          </div>
                          <div className="searchbox__entry__lot-date">04/01/2020</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="searchbox__wide__box searchbox__wide__pallet">
                    <div className="searchbox__heading">{`${items2.length} pallets found`}</div>
                    <div className="searchbox__entry-container">
                      {items2.map((e) => (
                        <div onClick={() => this.setState({ palletID: e })} className="searchbox__entry" key={e}>
                          <div className={'searchbox__entry__circle ' + (this.state.palletID === e ? 'searchbox__entry__circle--selected' : '')}></div>
                          {e}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="searchbox__wide__box searchbox__wide__serial" style={{ maxHeight: '400px' }}>
                    <div className="searchbox__heading">{`${items3.length} serial numbers found`}</div>
                    <div className="searchbox__search">
                      <input ref={this.serialRef} className="searchbox__search__input" type="text" placeholder="Type in serial number" />
                      <SearchIcon onClick={() => this.setState({ serialSearch: this.serialRef.current.value, serialID: '' })} />
                    </div>
                    <div className="searchbox__entry-container">
                      {items3.map((e) => (
                        <div onClick={() => this.setState({ serialID: e })} className="searchbox__entry" key={e}>
                          <div className={'searchbox__entry__circle ' + (this.state.serialID === e ? 'searchbox__entry__circle--selected' : '')}></div>
                          {e}
                        </div>
                      ))}
                    </div>
                    {this.state.serialID.length > 0 ? (
                      <button className="searchbox__find" onClick={() => this.search('serial', this.state.serialID)}>
                        Find asset
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {!!this.state.lotSearch || !!this.state.palletSearch || (this.state.currentDateType.length > 0 && !!this.state.endDateN) ? null : (
                <div className="searchbox">
                  <div className="searchbox__heading">Packaging ID number</div>
                  <div className="searchbox__button-container">
                    <button onClick={() => this.packingChange(0)} className={'searchbox__button ' + (this.state.packingID === 0 ? 'searchbox__button--selected' : '')}>
                      Lot#
                    </button>
                    <button onClick={() => this.packingChange(1)} className={'searchbox__button ' + (this.state.packingID === 1 ? 'searchbox__button--selected' : '')}>
                      Pallet#
                    </button>
                    <button onClick={() => this.packingChange(2)} className={'searchbox__button ' + (this.state.packingID === 2 ? 'searchbox__button--selected' : '')}>
                      Serial#
                    </button>
                  </div>
                  <div className="searchbox__heading" style={{ marginTop: '15px' }}>
                    {PackingName[this.state.packingID]} Number
                  </div>
                  <div className="searchbox__search">
                    <input ref={this.packingRef} className="searchbox__search__input" type="text" placeholder={`Enter ${PackingName[this.state.packingID]} ID here`} />
                    <SearchIcon onClick={() => this.dispatchSearch(this.packingRef.current.value)} />
                  </div>
                </div>
              )}
              {!!this.state.lotSearch ? (
                <div className="searchbox">
                  <div className="searchbox__heading">{`${this.state.lotSearchInfo.pallets.length} pallets in lot #${this.state.lotSearch}`}</div>
                  <div className="searchbox__entry-container">
                    {this.state.lotSearchInfo.pallets.map((e) => (
                      <div onClick={() => this.setState({ palletSearch: e.id, palletSearchInfo: e })} className="searchbox__entry" key={e.id}>
                        <div className={'searchbox__entry__circle ' + (this.state.palletSearch === e.id ? 'searchbox__entry__circle--selected' : '')}></div>
                        {e.id}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {!!this.state.palletSearch ? (
                <div className="searchbox" style={{ maxHeight: '400px' }}>
                  <div className="searchbox__heading">{`${this.state.palletSearchInfo.serials.length} serial numbers in pallet #${this.state.palletSearch}`}</div>
                  <div className="searchbox__search">
                    <input ref={this.serialRef} className="searchbox__search__input" type="text" placeholder="Type in serial number" />
                    <SearchIcon onClick={() => this.setState({ serialSearch: this.serialRef.current.value, serialID: '' })} />
                  </div>
                  <div className="searchbox__entry-container">
                    {this.state.palletSearchInfo.serials.map((e) =>
                      e.includes(this.state.serialSearch) ? (
                        <div onClick={() => this.setState({ serialID: e })} className="searchbox__entry" key={e}>
                          <div className={'searchbox__entry__circle ' + (this.state.serialID === e ? 'searchbox__entry__circle--selected' : '')}></div>
                          {e}
                        </div>
                      ) : null
                    )}
                  </div>
                  {this.state.serialID.length > 0 ? (
                    <button className="searchbox__find" onClick={() => this.search('serial', this.state.serialID)}>
                      Find asset
                    </button>
                  ) : null}
                </div>
              ) : null}
            </section>
          </>
        )}
      </>
    );
  }
}
