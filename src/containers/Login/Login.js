import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form , withFormik } from 'formik';
import { object, string } from 'yup';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Login extends Component {
    render() {
        const {classes} = this.props;
        const {values, errors, touched,handleChange,handleBlur,handleSubmit, isSubmitting, isValid} = this.props;

        return (
            <div className={classes.container}>
                <Form>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            id="username"
                            type="input"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        {touched.username && errors.username &&
                        <FormHelperText id="username-text">{errors.username}</FormHelperText>
                        }

                    </FormControl>

                    <FormControl className={classes.formControl} error={touched.password && errors.password? true: false} aria-describedby="password-text">
                        <InputLabel htmlFor="password">Password</InputLabel>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {touched.password && errors.password &&
                        <FormHelperText id="password-text">{errors.password}</FormHelperText>
                        }
                    </FormControl>
                    <br/>
                     <Button variant="outlined" color="primary"  type="submit" disabled={isSubmitting|| !isValid } className={classes.button}>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

const LoginForm = withFormik({
    // we can passe the default values props from the parent component - useful for edit
    mapPropsToValues({username, password}) {
        return {
            username: username || '',
            password: password || ''
        };
    },
    handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
        // let's suppose that we do a server validtion call
        console.log(values);

    },
    validationSchema: object().shape({
        username: string().required('username is required ..'),
        password: string()
            .min(5, 'passowrd must be 5 or longer')
            .required('Password is required ...')
    })
})(Login);

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LoginForm);
