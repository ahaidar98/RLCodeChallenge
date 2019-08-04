import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { faUser, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './styles.css';
import { getUsers } from './actions';

import InfoTile from '../../component/InfoTile/index';
import ErrorMessage from '../../component/ErrorMessage/index';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUsers();
  }

  componentWillReceiveProps() {
    // first device should always be default device selected
    this.props.users.data && this.props.users.data.map((user, i) => {
      if(i === 0) { this.setState({ activeTile: user.id }); }
      return null;
    });
  }


  onTileBtnClick = (e) => {
    e.preventDefault();
    this.setState({ activeTile: e.currentTarget.id });
  }

  getErrorMessages = () => {
    if(this.props.userStatus === 'Failed') {
      return this.props.usersErrorMessage.map((error) => { return error });
    } return null;
  }

  getTimeNDate = (str) => {
    const date = new Date(str);
    const newDate = date.toDateString().substring(4, (date.toDateString().length - 5));
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = date.toLocaleString('en-US', options);

    return `${newDate} ${time}`;
  }

  dateStatus = (startDate, endDate) => {
    const today = new Date();
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    if(sDate > today ) { return 'Upcoming Access'; }
    else if(today > eDate ) { return 'Expired Access'; }
    else if ((today > sDate) && (today < eDate)) { return 'Active Access'; }
    else { return null }
  }

  pillColor = (str) => {
      switch (str) {
        case 'Upcoming Access':
          return 'yellowPill';
        case 'Active Access':
          return 'greenPill';
        case 'Expired Access':
          return 'redPill';
        default:
          return null;
      }
  }

  userName = () => {
    if(this.props.userStatus === 'Done') {
      return this.props.users.data.map((user, i) => {
        const pill = this.dateStatus(user.attributes.starts_at, user.attributes.ends_at);
        return (
          <InfoTile
            key={i}
            id={user.id}
            icon={faUser}
            name={user.attributes.name}
            onTileBtnClick={this.onTileBtnClick}
            activeTile={this.state.activeTile}
            pillStatus={pill}
            pillColor={this.pillColor(pill)}
          />
        );
     });
    } return (<FontAwesomeIcon icon={faSpinner} size="4x" spin />);
  }

  userInfo = () => {
    const { activeTile } = this.state;
    const { userStatus, users } = this.props;

    if(activeTile && (userStatus === 'Done')) {
      const activeDevice = users.data.find(obj => obj.id === activeTile);
      const attributes = activeDevice.attributes;
      const pill = this.dateStatus(attributes.starts_at, attributes.ends_at);
      const pillColor = this.pillColor(pill);

      return (
        <div>
          <div className="line" />
          <FontAwesomeIcon icon={faUser} size="2x" />
          <h3 className="infoText">{attributes.name}</h3>
          <h4 className="infoText">{attributes.email}</h4>
          <h4 className="infoText">{attributes.phone}</h4>
          <h4 className="infoText">{activeDevice.type.replace('_',' ')}</h4>
          {activeDevice.attributes.starts_at ?
            <div className="infoWrapper">
              <h4 className={`${pillColor} pill headerPill`}>{pill}</h4>
              <div>
                <h4 className="infoText headerinfo">Access Time: </h4>
                <h4 className="infoText headerinfo noBold">{this.getTimeNDate(attributes.starts_at)} - {this.getTimeNDate(attributes.ends_at)}</h4>
              </div>
            </div>
          : null}
        </div>
      );
    } return null;
  }

  render() {
    const centerSpinner = this.props.userStatus !== 'Done' ? 'centerSpinner' : null;
    return(
      <div>
        <ErrorMessage key="userErrorMsg" isError={this.props.userStatus === 'Failed'} message={this.getErrorMessages()} />
        <div className={`${centerSpinner} deviceWrapper`}>
          {this.userName()}
        </div>
        <div className="infoContainer">
          {this.userInfo()}
        </div>
      </div>
    );
  }
}

UsersPage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  userStatus: PropTypes.string.isRequired,
  usersErrorMessage: PropTypes.array,
};

UsersPage.defaultProps = {
  usersErrorMessage: [],
};


function mapStateToProps(state) {
  return {
    users: state.UserPage.users,
    userStatus: state.UserPage.userStatus,
    usersErrorMessage: state.UserPage.usersErrorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUsers }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
