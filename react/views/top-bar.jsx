const React = require('react')

const TopBar = ({ error, user }) => <div id='TopBar'>
  <svg>
    <use xlinkHref='#LogoText'/>
  </svg>
  { user
    ? <div className='avatar'>
    <span className='name'>{user.displayName}</span>
    <img src={user.photo}/>
  </div>
    : null}
  <div className='error'>{error}</div>
</div>

TopBar.propTypes = {
  error: React.PropTypes.string,
  user: React.PropTypes.object
}
module.exports = TopBar
