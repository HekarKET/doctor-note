import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
// import { purple } from "@material-ui/core/colors";
// import { useState } from "react";
// import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {},
  selectEmpty: {},
  select: {},
  root: {},
  dropdownStyle: {
    maxHeight: "200px",
    overflow: "scroll",
  },
}));

const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        "&$focused $notchedOutline": {
          borderColor: "#4DC289",
        },
        "MuiFormLabel-root": {
          color: "red",
        },
      },
    },
  },
});

export default function SelectCustom({
  menuitem,
  placeholder,
  variable,
  setVariable,
  error,
  disabled,
  top,
  small,
  variant
}) {
  const classes = useStyles();
  let MenuProps;
  if (top) {
    MenuProps = {
      classes: { paper: classes.dropdownStyle },
      anchorOrigin: {
        vertical: "top",
        horizontal: "left",
      },
      transformOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      getContentAnchorEl: null,
    };
  } else {
    MenuProps = {
      classes: { paper: classes.dropdownStyle },
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "left",
      },
      getContentAnchorEl: null,
    };
  }
  return (
    <MuiThemeProvider theme={theme}>
      <FormControl
        fullWidth
        variant={variant? variant : 'outlined'}
        className={classes.formControl}
        error={error}
        size={small ? "small" : "medium"}
      >
        <InputLabel id='demo-simple-select-filled-label'>
          {placeholder}
        </InputLabel>
        <Select
          className={classes.select}
          labelId='demo-simple-select-filled-label'
          // id='demo-simple-select-filled'
          value={variable}
          disabled={disabled}
          onChange={(e) => setVariable(e.target.value)}
          // ref={ref}
          // defaultValue={"Monday"}
          label={placeholder}
          MenuProps={MenuProps}
        >
          {menuitem
            ? menuitem.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))
            : null}
        </Select>
        {error ? <FormHelperText>This field is required</FormHelperText> : null}
      </FormControl>
    </MuiThemeProvider>
  );
}
