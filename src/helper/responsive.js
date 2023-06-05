import { css } from 'styled-components';

export const mobile = props => {
  return css`
    @media only screen and (max-width: 480px) {
      ${props}
    }
  `;
};
export const tablet = props => {
  return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `;
};

export const laptop = props => {
  return css`
    @media only screen and (max-width: 1024px) {
      ${props}
    }
  `;
};
export const laptopL = props => {
  return css`
    @media only screen and (max-width: 1440px) {
      ${props}
    }
  `;
};

export const laptopXL = props => {
  return css`
    @media only screen and (max-width: 1960px) {
      ${props}
    }
  `;
};

export const wideScreen = props => {
  return css`
    @media only screen and (min-width: 1961px) {
      ${props}
    }
  `;
};
