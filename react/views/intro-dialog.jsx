const React = require('react')
const { Sdk } = require('laundree-sdk')
const config = require('../../config/default.json')

class IntroDialog extends React.Component {

  constructor (props) {
    super(props)
    this.sdk = new Sdk(config.laundree.address)
    this.state = {}
  }

  get step () {
    if (this.state.user) return 3
    if (this.props.cardId) return 2
    return 1
  }

  componentWillReceiveProps ({ cardId }) {
    if (this.props.cardId) return
    const email = config.users[ cardId ]
    if (!email) return
    this.sdk.user
      .fromEmail(email)
      .then(({ id }) => this.sdk.user(id).get())
      .then(user => this.setState({ user, photo: user.photo }))
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
      case 3:
        return <div className='step3'>
          <h1>Hi {this.state.user.name.givenName}!</h1>
        </div>
    }
  }

  render () {
    return <main id='IntroDialog'>
      {this.state.photo
        ? <img src={this.state.photo}/>
        : <svg>
        <use xlinkHref='#IdCard'/>
      </svg> }
      {this.renderStep()}
    </main>
  }
}

IntroDialog.propTypes = {
  cardId: React.PropTypes.string
}

module.exports = IntroDialog
