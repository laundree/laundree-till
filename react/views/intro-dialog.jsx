const React = require('react')

class IntroDialog extends React.Component {

  get step () {
    if (this.props.user) return 3
    if (this.props.cardId) return 2
    return 1
  }

  renderStep () {
    switch (this.step) {
      case 1:
        return <div className='step1'>
          <h1>Please swipe your laundree card!</h1>
        </div>
      case 2:
        return <div className='step2'>
          <h1>Got it... Signing you in!</h1>
        </div>
    }
  }

  render () {
    return <main id='IntroDialog'>
      <svg>
        <use xlinkHref='#IdCard'/>
      </svg>
      {this.renderStep()}
    </main>
  }
}

IntroDialog.propTypes = {
  cardId: React.PropTypes.string,
  user: React.PropTypes.object
}

module.exports = IntroDialog
