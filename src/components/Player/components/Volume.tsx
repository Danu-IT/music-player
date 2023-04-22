import { FC } from "react";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { VolumeIcons } from "../../../utils";

interface VolumeProps {
  value: number;
  setValue: (event: Event, newValue: number | number[]) => void;
}

const Volume: FC<VolumeProps> = ({ setValue, value }) => {
  return (
    <ValueCustom>
      <Stack
        spacing={2}
        direction="row"
        sx={{ mb: 1 }}
        alignItems="center">
        <span>
          {VolumeIcons.map((el, i) => {
            if (el.range[0] <= value && el.range[1] >= value) {
              return <el.icon size={30}></el.icon>;
            }
          })}
        </span>
        <Slider
          value={value}
          onChange={setValue}
          aria-label="Volume"
        />
      </Stack>
    </ValueCustom>
  );
};

const ValueCustom = styled.div`
  width: 200px;
  margin-right: 20px;
`;

export default Volume;
