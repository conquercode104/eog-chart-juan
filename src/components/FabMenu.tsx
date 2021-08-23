import React, { FunctionComponent, useState } from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';

interface IProps {
  title?: string,
  Icon?: FunctionComponent
  items: string[]
  selectedItems: string[]
  onClick: (value: string) => void
}

const useStyles = makeStyles({
  selected: {
    color: 'gray',
    textDecoration: 'line-through',
  },
});

const FabMenu: FunctionComponent<IProps> = ({
  items, selectedItems, title, Icon, onClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleItemClick(value: string) {
    onClick(value);
    handleClose();
  }

  return (
    <div>
      <Fab aria-controls="simple-menu" color="primary" aria-haspopup="true" onClick={handleClick}>
        {Icon && <Icon />}
        {title || ''}
      </Fab>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          items.map((item, index) => (
            <MenuItem className={classNames({ [classes.selected]: selectedItems.includes(item) })} key={`${index + 1}`} onClick={() => { handleItemClick(item); }}>{item}</MenuItem>
          ))
        }
      </Menu>
    </div>
  );
};

export default FabMenu;