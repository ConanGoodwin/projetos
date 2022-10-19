import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayerScore } from '../redux/actions';
import PlayerCard from '../components/PlayerCard';
import { getFromLocalStorage } from '../services/localStorage';
import './style/ranking.css';

const INITIAL_TIME = 30;
class Ranking extends Component {
  state = {
    ranking: getFromLocalStorage('ranking'),
  };

  handleClickGoHome = () => {
    const { history, dispatch } = this.props;

    dispatch(addPlayerScore(INITIAL_TIME, 0, 0));
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          className="button is-link is-outlined"
          onClick={ this.handleClickGoHome }
        >
          Play Again
        </button>
        {ranking.length > 0 && ranking
          .sort((a, b) => b.score - a.score).map((player, i) => (
            <PlayerCard key={ i } player={ player } />
          ))}
      </section>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
