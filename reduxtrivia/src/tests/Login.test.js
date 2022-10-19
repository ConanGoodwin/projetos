import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockedTokenResponse from './helpers/mockedTokenResponse';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'


describe('login page tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockReturnValue({
      json: jest.fn().mockReturnValue(mockedTokenResponse), 
    }); 
    renderWithRouterAndRedux(<App />);
  });

  const [validEmail, validName] = ['joaozinhoDoMinecraft@gmail.com', 'adimin4002'];

  it('verify if the play button is enabled and disabled as expected', ()=>{
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput.value).toBe('');
    expect(nameInput.value).toBe('');
    expect(playBtn).toBeDisabled();

    userEvent.type(emailInput, validEmail);
    expect(emailInput.value).toBe(validEmail);
    expect(playBtn).toBeDisabled();

    userEvent.type(nameInput, validName);
    expect(nameInput.value).toBe(validName);
    expect(playBtn).toBeEnabled();

    userEvent.clear(emailInput);
    expect(playBtn).toBeDisabled();
    userEvent.clear(nameInput);
    expect(playBtn).toBeDisabled();
  });

  it('verify if the play button works as expected', async () => {
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(emailInput, validEmail);
    userEvent.type(nameInput, validName);
    userEvent.click(playBtn);

    expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(window.localStorage.getItem('token')).toBe(mockedTokenResponse.token))
  });

  it('verify if the settings button works as expected',()=>{
    const settingsBtn = screen.getByTestId('btn-settings');
    userEvent.click(settingsBtn);
    expect(screen.getByTestId('settings-title')).toBeInTheDocument();
  });
});