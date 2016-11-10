const React = require('react')
const { ipcRenderer } = require('electron')

const timerMinutes = 90

class Timer extends React.Component {

  constructor (props) {
    super(props)
    this.state = { startTime: null, currentTime: null }
    this.timeToggle = () => this.toggle()
  }

  componentDidMount () {
    this.interval = setInterval(() => this.updateTime(), 1000)
  }

  toggle () {
    if (this.state.startTime) return this.stop()
    this.start()
  }

  stop () {
    ipcRenderer.send('timer-stop')
    this.setState({ startTime: null })
  }

  start () {
    ipcRenderer.send('timer-start')
    const now = Date.now()
    this.setState({ startTime: now, currentTime: now })
  }

  updateTime () {
    this.setState(({ currentTime, startTime }) => {
      if (currentTime - startTime > timerMinutes * 60 * 1000) return { startTime: null, currentTime: Date.now() }
      return { currentTime: Date.now() }
    })
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  get diff () {
    if (!this.state.startTime) return 0
    return Math.floor((this.state.currentTime - this.state.startTime) / 1000)
  }

  calculateTime () {
    let diff = timerMinutes * 60 - this.diff
    const seconds = diff % 60
    diff = Math.floor(diff / 60)
    const minutes = diff % 60
    diff = Math.floor(diff / 60)
    const hours = diff % 24
    return { seconds, hours, minutes }
  }

  renderTime () {
    const { hours, minutes, seconds } = this.calculateTime()
    return <span className='time'>
      {hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
    </span>
  }

  render () {
    return <main id='Timer'>
      {this.renderTime()}
      <div className='buttons'>
        <button
          onClick={this.timeToggle}
          className={this.state.startTime ? 'red' : ''}>{this.state.startTime ? 'Stop' : 'Start'}</button>
      </div>
    </main>
  }
}

Timer.propTypes = {
  cardId: React.PropTypes.string,
  user: React.PropTypes.object
}

module.exports = Timer
