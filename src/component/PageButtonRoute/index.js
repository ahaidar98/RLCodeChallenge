import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import './styles.css';

function pageName(arrOfNames, activePage) {
  // Even though there is only two pages, I still wanted it to my dynamic as possible for future changes.
  return arrOfNames.map((pgName, i) => {
    const active = activePage === pgName ? 'activeLi' : null;

    return (
      <li key={i} className={`${active} pgLi`}><Link to={`/${pgName}`} className="pgLink">{pgName}</Link></li>
    )
  })
};

const PageButtonRoute = ({ pageNames, activePage, key }) => {
  return (
    <div id={key} className="fullWidth">
      <ul className="pgUl">
        {pageName(pageNames, activePage)}
      </ul>
    </div>
  );
};

PageButtonRoute.propTypes = {
  pageNames: PropTypes.array.isRequired,
  key: PropTypes.string,
  activePage: PropTypes.string,
};

PageButtonRoute.defaultProps = {
  activePage: 'devices',
  key: '',
};

export default PageButtonRoute;
