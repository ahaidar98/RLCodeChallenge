import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';

import './styles.css';


const InfoTile = ({ icon, model, name, id, onTileBtnClick, key, activeTile, pillStatus, pillColor, deviceLock, deviceLockColor }) => {
  const active = (id === activeTile) ? 'active' : null;

  return (
    <button id={id} className={`${active} tileWrapper`} onClick={onTileBtnClick}>
      <div><FontAwesomeIcon size="lg" icon={icon} /></div>
      <div>
        {deviceLock ? <FontAwesomeIcon className="tileLock" icon={deviceLock} color={deviceLockColor} /> : null}
        <h3 className="tileText">{name}</h3>
      </div>
      {model ? <div><h5 className="tileText">{model}</h5></div> : null}
      {pillStatus ? <div><h5 className={`${pillColor} tileText pill`}>{pillStatus}</h5></div> : null}
    </button>
  );
};

InfoTile.propTypes = {
  icon: PropTypes.object.isRequired,
  model: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onTileBtnClick: PropTypes.func.isRequired,
  key: PropTypes.string,
  activeTile: PropTypes.string.isRequired,
  pillStatus: PropTypes.string,
  pillColor: PropTypes.string,
  deviceLock: PropTypes.object,
  deviceLockColor: PropTypes.string,
};

InfoTile.defaultProps = {
  key: '',
  model: '',
  pillStatus: '',
  pillColor: '',
  deviceLock: '',
  deviceLockColor: '',
};

export default InfoTile;
