import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style/timer.css';

const ONE_SECOND = 1000;
const CRITICAL_TIME = 10;

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timerCount: 30,
    };
  }

  componentDidMount() {
    this.setTimeCount = setInterval(() => {
      this.setState(
        (previewState) => ({ timerCount: previewState.timerCount - 1 }),
        () => {
          const { timerCount } = this.state;
          const { setTime } = this.props;
          setTime(timerCount);
        },
      );
    }, ONE_SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.setTimeCount);
  }

  timeIsEnd = () => {
    const { handleClickAnswer } = this.props;
    handleClickAnswer({ target: { name: 'Timer' } });
  };

  render() {
    const { timerCount } = this.state;
    if (timerCount === 0) { this.timeIsEnd(); }
    return (
      <h1
        data-testid="timer"
        className={ timerCount > CRITICAL_TIME ? 'time' : 'time time_critical' }
      >
        {timerCount}
      </h1>
    );
  }
}

Timer.propTypes = {
  handleClickAnswer: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
};

export default connect()(Timer);
