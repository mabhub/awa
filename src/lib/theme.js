import { createMuiTheme } from '@material-ui/core';

/**
 * https://material-ui.com/customization/default-theme/
 *
 * https://material-ui.com/customization/globals/
 * https://material-ui.com/customization/palette/
 * https://material-ui.com/customization/typography/
 *
 * https://material-ui.com/customization/color/
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8a2542',
    },
    secondary: {
      main: '#dca817',
    },
    tertiary: {
      main: '#acd9e9',
    },
  },
});

export default theme;
