import { SearchOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { SearchWithIconContainer } from './searchWithIcon.styles';

const SearchWithIcon = ({ placeholder = 'Search', type = 'text', ...rest }) => {
  return (
    <SearchWithIconContainer>
      <input type={type} placeholder={placeholder} {...rest} />
      <button type="submit">
        <SearchOutlined />
      </button>
    </SearchWithIconContainer>
  );
};

SearchWithIcon.propTypes = {
  placeholder: PropTypes.string,
};

export default SearchWithIcon;
