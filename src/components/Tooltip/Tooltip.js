import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import { CustomTooltipContainer } from "./tooltip.styles";

const CustomTooltip = ({ message, children, position = "top", ...rest }) => {
  return (
    <CustomTooltipContainer>
      <Tooltip
        title={message}
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "#435055",
              "& .MuiTooltip-arrow": {
                color: "#435055",
              },
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "19px",
              padding: "8px 10px",
              borderRadius: "4px",
            },
          },
        }}
        placement={position}
        {...rest}
      >
        <div>{children}</div>
      </Tooltip>
    </CustomTooltipContainer>
  );
};

CustomTooltip.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
  position: PropTypes.oneOf([
    "bottom-end",
    "bottom-start",
    "bottom",
    "left-end",
    "left-start",
    "left",
    "right-end",
    "right-start",
    "right",
    "top-end",
    "top-start",
    "top",
  ]),
};

export default CustomTooltip;
