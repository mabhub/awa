import React from 'react';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  inlineWrapper: {
    display: 'inline-flex',
  },
  icon: {
    margin: 0,
    width: '4em',
  },
  label: {
    marginLeft: theme.spacing(1),
  },
}));

const CustomIcon = ({
  src,
  label,
  showLabel,
  className,
  inline = false,
  iconProps = {},
  labelProps = {},
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(
        classes.wrapper,
        className,
        { [classes.inlineWrapper]: inline },
      )}
      {...props}
    >
      <img
        src={src}
        alt={label}
        className={classes.icon}
        {...iconProps}
      />
      {showLabel && (
        <Box
          className={classes.label}
          {...labelProps}
        >
          {label}
        </Box>
      )}
    </Box>
  );
};

export default CustomIcon;