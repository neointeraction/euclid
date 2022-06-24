import { SearchOutlined } from "@mui/icons-material";
//import { Input } from "components";
import { SearchWithIconContainer } from "./searchWithIcon.styles";

const SearchWithIcon = ({ ...rest }) => {
  return (
    <SearchWithIconContainer>
      {/* <Input {...rest} /> */}
      <input
        placeholder="Search"
        type="text"
        className="search-input"
        {...rest}
      />
      <button type="submit">
        <SearchOutlined fontSize="12px" />
      </button>
    </SearchWithIconContainer>
  );
};

export default SearchWithIcon;
