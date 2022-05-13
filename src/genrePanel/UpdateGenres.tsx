import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface UpdateGenresProps
{
  inputGenres: string[];

  submit: (genres: string[]) => void;
  // cancel: () => void;
}

export default function UpdateGenres(props: UpdateGenresProps) {
  const [value, setValue] = React.useState(props.inputGenres.join("\n"));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const splitGenres = (input: string) : string[] => {
    return  input.split('\n');
  }

  return (
    <Box sx={style}>
      <Stack spacing={2}>
        <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={20}
            defaultValue={value}
            // value={value}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            onClick={() => props.submit(splitGenres(value))}>
              Submit
          </Button>
      </Stack>
    </Box>
  );
}