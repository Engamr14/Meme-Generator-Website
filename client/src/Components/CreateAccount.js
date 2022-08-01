import React, { useState, useContext } from 'react';
import { Col, Row, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { UserContext } from '../UserContext';
import { Link, useHistory} from 'react-router-dom';
import '../App.css';

function CreateAccount(props) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [congratsMsg, setCongratsMsg] = useState('');

    const context = useContext(UserContext);
    let history = useHistory();

    const HandleCreate = (ev) => {
        ev.preventDefault();
        context.setMessage('');

        if (name.trim() === '' || password.trim() === '' || password.length < 6)
            context.setMessage('Invalid Username or Password');
        else {
            const user = { email: email, name: name, password: password, phoneNumber: phoneNumber };
            props.checkUserName(user.name).then((unique) => {
                if (unique) {
                    props.addUser(user);
                    setCongratsMsg('Congratulations!! you have an account now in MemeGenerator ^_^');
                    context.setMessage('');
                    setTimeout(() => {
                        setCongratsMsg('');
                        history.push('/login');
                    }, 1100);
                }
                else {
                    context.setMessage('The username is used, please use other username');
                }
            })
        }
    }
    return (
        <div className="container-fluid ">
            <Row className="row container-fluid changePos3 ">
                <Form>
                    <div className='cardPadding'>
                        <span className='TitleFontSize' style={{ color: '#000000' }}>Create your account NOW to enjoy </span>
                        <span className='TitleFontSize' style={{ color: '#4267B2' }}>Meme</span>
                        <span className='TitleFontSize' style={{ color: '#DB4437' }}>Generator</span>
                        <span className='TitleFontSize' style={{ color: '#000000' }}> capabilities</span>
                    </div>



                    <Form.Group className='login-form Padding1' controlId='name' style={{ width: '500px' }}>
                        <InputGroup>
                            <Form.Control size="lg" type='name' value={name} placeholder="name" onChange={ev => setName(ev.target.value)} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='login-form Padding1' controlId='username' style={{ width: '500px' }}>
                        <InputGroup>
                            <Form.Control size="lg" type='email' value={email} placeholder="email" onChange={ev => setEmail(ev.target.value)} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='login-form Padding1' controlId='phoneNumber' style={{ width: '500px' }}>
                        <InputGroup>
                            <Form.Control size="lg" type='phoneNumber' value={phoneNumber} placeholder="phone number" onChange={ev => setPhoneNumber(ev.target.value)} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='login-form Padding1' controlId='password' style={{ width: '500px' }}>
                        <InputGroup>
                            <Form.Control size="lg" type='password' value={password} placeholder="password" onChange={ev => setPassword(ev.target.value)} />
                        </InputGroup>
                    </Form.Group>

                </Form>

                <Row>
                    <Col> <Button size="lg" variant="dark" type="submit" onClick={ev => HandleCreate(ev)}>Create</Button> </Col>
                    <Col> <Link to='/Home'> <Button size="lg" variant="light" type="submit" className='cancelButton' >Cancel</Button> </Link> </Col>
                </Row>

                <Row className='cardPadding'>
                    {context.message && <Alert variant='danger' onClose={() => context.setMessage('')}> {context.message} </Alert>}
                </Row>

                <Row className='cardPadding'>
                    {congratsMsg && <Alert variant='success' onClose={() => context.setCongratsMsg('')}> {congratsMsg} </Alert>}
                </Row>

            </Row>
        </div>


    );
}

export default CreateAccount;