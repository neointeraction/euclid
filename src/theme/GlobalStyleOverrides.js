import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export default function GlobalStyleOverrides() {
  const theme = createTheme({
    typography: {
      fontFamily: ['"Nunito Sans"', "sans-serif"].join(","),
      body1: {
        fontFamily: "'Nunito Sans', sans-serif",
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "contained" },
            style: {
              textTransform: "none",
              backgroundColor: "#005585",
              "&:hover": {
                backgroundColor: "#013654",
              },
              "&:disabled": {
                backgroundColor: "#005585",
                color: "rgba(255, 255, 255, 0.5)",
                opacity: 0.8,
              },
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              textTransform: "none",
              backgroundColor: "#DAEAF3",
              color: "#005585",
              border: "1px solid #005585",
              "&:hover": {
                backgroundColor: "#DAEAF3",
                border: "1px solid #005585",
              },
              "&:disabled": {
                color: "#005585",
                opacity: 0.6,
              },
            },
          },
          {
            props: { variant: "secondary" },
            style: {
              textTransform: "none",
              backgroundColor: "#E3E6E8",
              color: "#262626",
              border: "none",
              "&:hover": {
                backgroundColor: "#DAEAF3",
                border: "none",
              },
              "&:disabled": {
                color: "#005585",
                opacity: 0.6,
              },
            },
          },
          {
            props: { variant: "text" },
            style: {
              textTransform: "none",
              color: "#005585",
              "&:hover": {
                color: "#013654",
              },
              "&:disabled": {
                color: "#005585",
                opacity: 0.6,
              },
            },
          },
        ],
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            "& label": {
              fontSize: 12,
            },
          },
          input: {
            fontSize: 14,
          },
          listbox: {
            fontSize: 14,
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
}
