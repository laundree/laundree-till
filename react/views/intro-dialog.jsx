const React = require('react')

class IntroDialog extends React.Component {

  get step () {
    if (this.props.cardId) return 2
    return 1
  }

  render () {
    return <main id='IntroDialog' className={`step${this.step}`}>
      <svg>
        <use xlinkHref='#IdCard'/>
      </svg>
      <div className='step1'>
        <h1>Please swipe your laundree card!</h1>
      </div>
      <div className='step2'>
        <h1>Got it... Signing you in!</h1>
      </div>
    </main>
  }
}

IntroDialog.propTypes = {
  cardId: React.PropTypes.string
}

module.exports = IntroDialog
