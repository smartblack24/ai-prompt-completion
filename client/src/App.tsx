import { Box, Container, Stack, TextField, Typography } from "@mui/material";
import Prompt from "./components/Prompt";
import theme from "./theme";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState('')

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: theme.palette.background.default }}>
      <Container maxWidth="md" sx={{ p: 2}}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" mb={2} color="white">
            Rytr AI Prompt
          </Typography>
          <TextField
            placeholder="Enter your username"
            required
            variant="standard"
            value={username}
            onChange={e => setUsername(e.target.value)}
            sx={{
              input: {
                color: "white",
              },
              '& .MuiInput-root:before': {
                borderBottomColor: 'white !important'
              },
            }}
          />
        </Stack>
        <Prompt user={username} />
      </Container>
    </Box>
  )
}

export default App;
