import { SearchOutlined } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Input } from "components";
import { SearchWithIconContainer } from "./searchWithIcon.styles";

const SearchWithIcon = ({ placeholder = "Search", type = "text", ...rest }) => {
  return (
    <SearchWithIconContainer>
      <Input placeholder="Search" {...rest} />
      <button type="submit">
        <SearchOutlined fontSize="12px" />
      </button>
    </SearchWithIconContainer>
  );
};

SearchWithIcon.propTypes = {
  placeholder: PropTypes.string,
};

export default SearchWithIcon;
