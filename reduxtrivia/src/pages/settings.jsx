import React, { Component } from 'react';
import './style/settings.css';

class Settings extends Component {
  render() {
    return (
      <form className="sett_ings">
        <h1 data-testid="settings-title">Configurações</h1>

        <div className="control has-icons-left marg">
          <div className="select is-link ">
            <select className="mor">
              <option value="a">Categoria</option>
              <option value="a">A</option>
            </select>
          </div>
          <span className="icon is-left">
            <i className="fa-solid fa-clipboard" />
          </span>
        </div>

        <div className="control has-icons-left marg">
          <div className="select is-link">
            <select className="mor">
              <option value="1">Dificuldade</option>
              <option value="2">2</option>
            </select>
          </div>
          <span className="icon is-left">
            <i className="fa-solid fa-bomb" />
          </span>
        </div>

        <div className="control has-icons-left marg">
          <div className="select is-link">
            <select className="mor">
              <option value="a">Tipo</option>
              <option value="a">A</option>
            </select>
          </div>
          <span className="icon is-left">
            <i className="fas fa-globe" />
          </span>
        </div>

        <button
          type="submit"
          className="button is-link
             is-responsive is-outlined has-tooltip-arrow has-tooltip-bottom"
          data-tooltip="Incia o jogo"
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
    );
  }
}

export default Settings;
