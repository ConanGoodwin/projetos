import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken, newLogin, resetScore } from '../redux/actions';
import { saveToken } from '../services/saveToken';
import { addToLocalStorage, getFromLocalStorage } from '../services/localStorage';
import store from '../redux/store';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      token: '',
    };
  }

  componentDidMount() {
    if (!getFromLocalStorage('ranking')) addToLocalStorage('ranking', []);
  }

  validateBtnPlay = () => {
    const emailInput = document.getElementById('emailIcon');
    const nameInput = document.getElementById('nameIcon');
    const fullClass = 'fas fa-check';
    const failClass = 'fa-regular fa-circle-xmark';
    const { name, email } = this.state;
    const nameRegex = /^[A-Za-z0-9^ ]{3}/;
    const emailRegex = /^[^@^ ]+@[^@^ ]+\.[a-z]{2,3}(\.[a-z]{2})?$/;

    if (emailRegex.test(email)) {
      emailInput.className = fullClass;
    } else { emailInput.className = failClass; }

    if (nameRegex.test(name)) {
      nameInput.className = fullClass;
    } else { nameInput.className = failClass; }

    this.setState({
      isDisabled: !emailRegex.test(email) || !nameRegex.test(name),
    });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.validateBtnPlay();
    });
  };

  handleClick = async (event) => {
    const { name, email } = this.state;
    const { dispatch, history } = this.props;
    event.preventDefault();

    await dispatch(fetchToken());
    dispatch(newLogin({ name, email }));
    const { tokenObj } = this.props;
    this.setState({ token: tokenObj.token }, () => {
      const { token } = this.state;
      saveToken(token);
    });

    store.dispatch(resetScore(0));
    history.push('/game');
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisabled } = this.state;

    return (
      <form onSubmit={ this.handleClick } className="loginForm">
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              type="text"
              name="name"
              id="name"
              value={ name }
              placeholder="nome"
              data-testid="input-player-name"
              className="input is-primary is-small is-rounded"
              onChange={ this.handleChange }
            />
            <span className="icon is-small is-left">
              <i className="fa-solid fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i id="nameIcon" className="fa-regular fa-circle-xmark" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              placeholder="email"
              data-testid="input-gravatar-email"
              className="input is-primary is-small is-rounded"
              onChange={ this.handleChange }
            />
            <span className="icon is-small is-left">
              <i className="fa-solid fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i id="emailIcon" className="fa-regular fa-circle-xmark" />
            </span>
          </p>
        </div>
        <p className="buttons">
          <button
            type="submit"
            disabled={ isDisabled }
            className="button is-link
             is-responsive is-outlined has-tooltip-arrow has-tooltip-bottom"
            data-tooltip="Incia o jogo"
            data-testid="btn-play"
          >
            Play
          </button>
        </p>

        <div className="settings">
          <button
            type="button"
            data-testid="btn-settings"
            className="button is-ghost has-tooltip-arrow has-tooltip-right"
            data-tooltip="Configurações do jogo"
            onClick={ this.handleClickSettings }
          >
            <span className="icon is-small">
              <i className="fa-solid fa-gear" />
            </span>
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  tokenObj: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ user, token }) => ({
  ...user,
  ...token,
});

export default connect(mapStateToProps)(Login);
