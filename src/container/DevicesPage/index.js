import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { faNetworkWired, faSpinner, faLock, faUnlock, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './styles.css';
import { getDevices, onDeviceStateChange } from './actions';
import InfoTile from '../../component/InfoTile/index';
import ErrorMessage from '../../component/ErrorMessage/index';

class DevicesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getDevices();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.devices.data === nextProps.devices.data) {
      this.props.devices.data && this.props.devices.data.map((device, i) => {
        if(i === 0) { this.setState({ activeTile: device.id }); }
        return null;
      });
    }
  }

  onTileBtnClick = (e) => {
    e.preventDefault();
    this.setState({ activeTile: e.currentTarget.id });
  }

  onLockToggle = (e) => {
    e.preventDefault();
    this.props.onDeviceStateChange(e.currentTarget.id);
  }

  getErrorMessages = () => {
    if(this.props.deviceStatus === 'Failed') {
      return this.props.deviceErrorMessage.map((error) => { return error });
    } return null;
  }

  getDevices = () => {
    if(this.props.deviceStatus === 'Done') {
      return this.props.devices.data && this.props.devices.data.map((device, i) => {
        const lockIcon = (device.attributes.state === 'locked') ? faLock : faUnlock;
        const lockColor = (device.attributes.state === 'locked') ? '#ff1a1a' : '#00b300';

        return (
          <InfoTile
            key={i}
            id={device.id}
            icon={faNetworkWired}
            model={device.attributes.model_number}
            name={device.attributes.name}
            onTileBtnClick={this.onTileBtnClick}
            activeTile={this.state.activeTile}
            deviceLock={lockIcon}
            deviceLockColor={lockColor}
          />
        );
      });
    } return <FontAwesomeIcon icon={faSpinner} size="4x" spin />;
  }

  deviceInfo = () => {
    const { activeTile } = this.state;
    const { deviceStatus, devices } = this.props;

    if(activeTile && (deviceStatus === 'Done')) {
      const activeDevice = devices.data && devices.data.find(obj => obj.id === activeTile);
      const attributes = activeDevice.attributes;
      const lockIcon = (attributes.state === 'locked') ? faLock : faUnlock;
      const lockToggleIcon = (attributes.state === 'locked') ? faToggleOn : faToggleOff;
      const lockColor = (attributes.state === 'locked') ? '#ff1a1a' : '#00b300';
      const lockColorClass = (attributes.state === 'locked') ? 'red' : 'green';

      return (
        <div>
          <FontAwesomeIcon icon={faNetworkWired} size="2x" />
          <h2 className="infoText">{attributes.name}</h2>
          <h4 className="infoText">{attributes.model_number}</h4>
          <div className="lockStateWrapper">
            <FontAwesomeIcon
              className="lockPosition"
              icon={lockIcon}
              size="lg"
              color={lockColor}
            />
            <h3 className={`${lockColorClass} lockState noBold`}>{attributes.state}</h3>
          </div>
          <div className="line" />
          <div className="deviceInfo">
            <div>
              <h4 className="infoText headerinfo">Serial Number: </h4>
              <h4 className="infoText headerinfo noBold">{attributes.serial_number}</h4>
            </div>
            <div>
              <h4 className="infoText headerinfo">Firmware Version: </h4>
              <h4 className="infoText headerinfo noBold">{attributes.firmware_version}</h4>
            </div>
          </div>
          <div className="line" />
          <div className="deviceInfo">
            <h4 className="infoText headerinfo">Device Lock: </h4>
            <FontAwesomeIcon
              id={activeDevice.id}
              onClick={(e) => this.onLockToggle(e)}
              className="togglePosition"
              icon={lockToggleIcon}
              size="3x"
              color={lockColor}
            />
          </div>
        </div>
      );
    } return null;
  }

  render() {
    const centerSpinner = this.props.deviceStatus !== 'Done' ? 'centerSpinner' : null;

    return(
      <div>
        <ErrorMessage key="deviceErrorMsg" isError={this.props.deviceStatus === 'Failed'} message={this.getErrorMessages()} />
        <div className={`${centerSpinner} deviceWrapper`}>
          {this.getDevices()}
        </div>
        <div className="line" />
        <div className="infoContainer">
          {this.deviceInfo()}
        </div>
      </div>
    );
  }
}

DevicesPage.propTypes = {
  getDevices: PropTypes.func.isRequired,
  onDeviceStateChange: PropTypes.func.isRequired,
  deviceStatus: PropTypes.string.isRequired,
  deviceErrorMessage: PropTypes.array,
};

DevicesPage.defaultProps = {
  deviceErrorMessage: [],
};

function mapStateToProps(state) {
  return {
    devices: state.DevicesPage.devices,
    deviceStatus: state.DevicesPage.deviceStatus,
    deviceErrorMessage: state.DevicesPage.deviceErrorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDevices, onDeviceStateChange }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DevicesPage);
