import {
  Box,
  InputLabel,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import customInputStyles from "./CustomInputStyles";

const CustomInput = (props) => {
  const classes = customInputStyles;
  const styles = props.sx ?? classes.textField;
  const { error = null } = props;

  return (
    <Box>
      <Box mb={"5px"}>
        <Stack direction="row" spacing={1}>
          {props.required && (
            <Typography sx={classes.commentAsterisk}>*</Typography>
          )}
          <InputLabel sx={classes.nameField}>{props.label}</InputLabel>
        </Stack>
      </Box>
      <TextField
        sx={styles}
        variant="outlined"
        id={props.id}
        placeholder={props.placeHolder}
        type={props.type}
        name={props.name}
        select={props.select}
        value={props.value}
        InputProps={props.InputProps}
        inputProps={props.propsToInputElement}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        required={props.required}
        onClick={props?.onClick}
        {...(error && { error: true, helperText: error })}
        disabled={props.disabled}
        helperText={props.helperText}
      />
    </Box>
  );
};
export default CustomInput;
