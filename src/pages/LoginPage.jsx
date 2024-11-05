import React, { useContext, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserValidator from '../validators/user.validator';
import { ToastContext } from '../context/toast.context';
import UserService from '../services/user.service';
import { UserContext } from '../context/user.context';
import LocalStorageHelper from '../helpers/localstorage.helper';

function LoginPage(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(UserContext);
    const { showToast } = useContext(ToastContext)

    const onSubmitLogin = async (e) => { 
        e.preventDefault();
        console.log("Login form submitted");
        setIsLoading(true);
        if (UserValidator.validateRegister(inputs) === false) {
            showToast("Invalid inputs. Please check your inputs again.", "error");
            return;
        }

        setIsLoading(true);
        try {
            const response = await UserService.loginUser(inputs);
            if (response && response.data) {
                setUser({
                    id: response.data?.user?.id,
                    accessToken: response.data?.accessToken
                });
                LocalStorageHelper.setItem("user", {
                    id: response.data?.user?.id,
                    accessToken: response.data?.accessToken
                });

                showToast(response.message);
                navigate("/");
            } else {
                showToast(response?.message ?? "Error registering user, please try again!", "error");
            }
        } catch (error) {
            console.error("Error registering user: ", error);
            showToast(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='w-100 text-bg-light d-flex flex-column align-items-center justify-content-center'
            style={{ height: "80vh" }}
        >
            <Form className='bg-primary-subtle p-5' onSubmit={(e) => onSubmitLogin(e)} style={{ width: "35%" }}>
                <h1 className='w-100 text-center mb-4'>Login Form</h1>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <InputGroup size="lg" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">👤</InputGroup.Text>
                        <Form.Control
                            placeholder='Enter email'
                            value={inputs.email}
                            type='email'
                            required
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmailPassword">
                    <InputGroup size="lg" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">🔒</InputGroup.Text>
                        <Form.Control
                            placeholder='Enter password'
                            value={inputs.password}
                            type='password'
                            required
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </InputGroup>
                </Form.Group>

                <hr />
                <div className='w-100 d-flex flex-column justify-content-center gap-3 align-items-center'>
                    <Button variant="success" type="submit" style={{ width: "200px", height: "60px", fontSize: "24px" }}
                    >
                        { isLoading === true ? "Loading ..." : "Submit"}
                    </Button>

                    <div className='d-flex justify-content-center gap-4'>
                        <Button variant='secondary' type="button" onClick={() => navigate("/register")}>Go to Register</Button>
                        <Button variant='primary' type="button" onClick={() => navigate("/")}>Go to Home</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default LoginPage;