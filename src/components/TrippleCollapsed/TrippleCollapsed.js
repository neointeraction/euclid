import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import IconButton from 'components/IconButton';
import Chip from 'components/Chip';
import { CollapseIconWrap } from './trippledCollapsed.styles';

const TrippleCollapsed = ({ chipContent, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid #E5E5E5',
        marginBottom: 2,
        borderRadius: 2,
        backgroundColor: '#fff'
      }}
    >
      <CollapseIconWrap>
        <IconButton
          onClick={() => setOpen((prevState) => !prevState)}
          style={{ marginRight: '6px' }}
          icon={
            !open ? (
              <ChevronRightOutlinedIcon fontSize="medium" />
            ) : (
              <KeyboardArrowUpIcon fontSize="medium" />
            )
          }
        />
        {!open && <Chip content={chipContent} />}
      </CollapseIconWrap>
      <Collapse in={open}>{children}</Collapse>
    </Box>
  );
};

TrippleCollapsed.propTypes = {
  children: PropTypes.node,
};

export default TrippleCollapsed;
