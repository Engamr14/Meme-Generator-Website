import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { UserContext } from '../UserContext';
import '../App.css';
import { useHistory } from 'react-router';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const iconLock = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-lock2-fill" viewBox="0 0 16 16" >
    <path d="M7 6a1 1 0 0 1 2 0v1H7V6z" />
    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z" />
  </svg>;

  const iconPerson = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-person-fill" viewBox="0 0 16 16">
    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z" />
  </svg>;
  const BigIcon = <svg className="bi bi-person-circle" width="400" height="150" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
    <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd" />
  </svg>;

  const context = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    context.setMessage('');

    if (username.trim() === '' || password.trim() === '' || password.length < 6)
      context.setMessage('Invalid Username or Password')
    else {
      const credentials = { username, password };
      props.login(credentials).then((done) => {
        if(done){
          history.push('/MyPage');
        }
      })
    }
  }
  return (
    <>
      <Form className=''>

        <div className=" Padding1 formHeader">
          <span className='TitleFontSize' style={{ color: '#000000' }}>Login to </span>
          <span className='TitleFontSize' style={{ color: '#4267B2' }}>Meme</span>
          <span className='TitleFontSize' style={{ color: '#DB4437' }}>Generator</span>
        </div>
        <div className='bigIcon Padding1'>

          {BigIcon}
        </div>

        <div className='form'>
          <Form.Group className='Padding1 ' controlId='username' style={{ width: '500px' }}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>{iconPerson}</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control size="lg" type='email' value={username} placeholder="email" onChange={ev => setUsername(ev.target.value)} />
            </InputGroup>
          </Form.Group>

          <Form.Group className='Padding1' controlId='password' style={{ width: '500px' }}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>{iconLock}</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control size="lg" type='password' value={password} placeholder="password" onChange={ev => setPassword(ev.target.value)} />
            </InputGroup>
          </Form.Group>

          <Row>
            <Col className='Padding1 '> <Button size="lg" variant="dark" type="submit" onClick={handleSubmit}>Login</Button></Col>
          </Row>
          <Row className='cardPadding'>
            {context.message && <Alert variant='danger' onClose={() => context.setMessage('')}> {context.message} </Alert>}
          </Row>
        </div>



      </Form>

    </>);
}



export default LoginForm;