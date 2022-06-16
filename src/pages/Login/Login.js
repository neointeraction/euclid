import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import { FullPageContainer } from 'assets/styles/main.styles';
import { Box } from 'assets/styles/main.styles';
import { Button, Input } from 'components';

const Login = () => {
  // using formik for form handling
  const { handleChange, handleSubmit, values, errors, handleBlur } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Please enter your username'),
      password: Yup.string().required('Please enter your password'),
    }),
    onSubmit: (values) => {
      // TODO: Implement login logic here
      console.log('Trying to login with --- ', values);
    },
  });
  return (
    <FullPageContainer>
      <Box noPadding>
        <form
          style={{
            width: '450px',
            height: '340px',
            display: 'flex',
            gap: 22,
            flexDirection: 'column',
            padding: '40px 40px',
          }}
          onSubmit={handleSubmit}
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
          <Input
            value={values.username}
            name="username"
            placeholder="Enter your username"
            label="Username"
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.username}
          />
          <Input
            value={values.password}
            name="password"
            placeholder="Enter your password"
            label="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            errorText={errors.password}
          />
          <Button
            style={{ width: '100%', marginTop: '10px' }}
            variant="contained"
            btnText="Submit"
            type="submit"
          />
        </form>
      </Box>
    </FullPageContainer>
  );
};

export default Login;
