import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import IconButton from 'components/IconButton';
import Chip from 'components/Chip';

const TrippleCollapsed = ({ chipContent }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid #E5E5E5',
        marginBottom: 2,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <IconButton
          onClick={() => console.log('Expande tripple')}
          icon={<ChevronRightOutlinedIcon fontSize="medium" />}
        />

        <Chip content={chipContent} />
      </div>
    </Box>
  );
};

TrippleCollapsed.propTypes = {
  children: PropTypes.node,
};

export default TrippleCollapsed;
