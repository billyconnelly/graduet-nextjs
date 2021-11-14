import { Prisma } from ".prisma/client";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const ProfileType = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  async function updateUserType(isGrad: boolean) {
    const isGraduateData = {
      isGraduate: isGrad,
    };
    console.log(isGraduateData);
    const response = await fetch("/api/profile-type", {
      method: "PATCH",
      body: JSON.stringify(isGraduateData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }

  return (
    <Box component="form" noValidate onSubmit={console.log(value)}>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          Are you a graduate looking for a job or an employer looking to list
          jobs?
        </FormLabel>
        <RadioGroup
          row
          aria-label="isGraduate"
          name="row-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value={true} control={<Radio />} label="Graduate" />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label="Employer"
          />
        </RadioGroup>
      </FormControl>
      <Button type="submit">SUBMIT</Button>
    </Box>
  );
};

export default ProfileType;
