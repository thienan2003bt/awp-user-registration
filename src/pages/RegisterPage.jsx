import React, { useContext, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/user.service';
import { UserContext } from '../context/user.context';
import UserValidator from '../validators/user.validator';
import { ToastContext } from '../context/toast.context';

function RegisterPage(props) {
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);
    const { showToast } = useContext(ToastContext);

    const [inputs, setInputs] = useState({ email: "", username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitRegistration = async (e) => {
        e.preventDefault();
        if (UserValidator.validateRegister(inputs) === false) {
            showToast("Invalid inputs. Please check your inputs again.", "error");
            return;
        }

        setIsLoading(true);
        try {
            const response = await UserService.registerUser(inputs);
            if (response && response.data) {
                setUser(response.data);

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
        <div className='w-100 text-bg-light d-flex flex-column align-items-center justify-content-center py-2'
            // style={{ height: "80vh" }}
        >
            <Form className='w-50 bg-primary-subtle p-3' onSubmit={(e) => onSubmitRegistration(e)}>
                <h1 className='w-100 text-center mb-4'>Registration Form</h1>

                <Form.Group className="mb-4" controlId="formBasicUsername">
                    <InputGroup size="lg" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">🪪</InputGroup.Text>
                        <Form.Control
                            placeholder='Enter username'
                            value={inputs.username}
                            type='text'
                            required
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </InputGroup>
                </Form.Group>

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

                <div className='d-flex w-100 justify-content-center align-items-center gap-3 my-2'>
                    <span>We'll never share your email with anyone.</span>
                </div>


                <hr />
                <div className='w-100 d-flex flex-column justify-content-center gap-3 align-items-center'>
                    <Button variant="success" type="submit" style={{ width: "200px", height: "60px", fontSize: "24px" }}
                    >
                        { isLoading === true ? "Loading ..." : "Submit"}
                    </Button>

                    <div className='d-flex justify-content-center gap-4'>
                        <Button variant='primary'  type="button" onClick={() => navigate("/")}>Go to Home</Button>
                        <Button variant='secondary' type="button"  onClick={() => navigate("/login")}>Go to Login</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default RegisterPage;