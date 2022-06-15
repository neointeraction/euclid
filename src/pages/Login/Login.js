import { Typography } from '@mui/material';
import { FullPageContainer } from 'assets/styles/login.styles';
import { Box } from 'assets/styles/main.styles';
import { Button, Input } from 'components';

const Login = () => {
  return (
    <FullPageContainer>
      <Box>
        <div
          style={{
            width: '450px',
            height: '340px',
            display: 'flex',
            gap: 22,
            flexDirection: 'column',
            padding: '0px 73px',
          }}
        >
          <Typography
            variant="h4"
            style={{
              color: '#005585',
              fontWeight: 'bolder',
              textAlign: 'center',
            }}
          >
            EUCLID
          </Typography>
          <Typography
            variant="h6"
            style={{ marginTop: '', marginBottom: '6px' }}
          >
            Welcome to Euclid
          </Typography>
          <Input label="username" />
          <Input label="password" />
          <Button
            style={{ width: '100%', marginTop: '10px' }}
            variant="contained"
            btnText="Submit"
          />
        </div>
      </Box>
    </FullPageContainer>
  );
};

export default Login;
