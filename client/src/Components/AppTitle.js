import React, { useContext } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link, useHistory, useLocation } from 'react-router-dom';
import '../App.css';
import { UserContext } from '../UserContext';

function AppTitle(props) {
    const context = useContext(UserContext);
    let history = useHistory();
    const location = useLocation();

    const HandleLogout = (ev) => {
        ev.preventDefault();
        props.logout();
        history.push('/Home');
    }

    return (
        <Navbar className="DarkPurple" expand="sm" fixed="top" style={{ height: 80 }}>

            <Navbar.Brand>
                <Link to='Home' style={{ textDecoration: "none" }}>
                    {/*<h1 style={{color:'#FFFFFF'}}>MemeGenerator</h1>*/}
                    <span className='TitleFontSize' style={{ color: '#4267B2' }}>Meme</span>
                    <span className='TitleFontSize' style={{ color: '#DB4437' }}>Generator</span>
                </Link>

            </Navbar.Brand>

            <Navbar.Brand className="my-2 my-lg-0 mx-auto d-none d-sm-block">
                <h3 style={{ color: '#adadad' }}>The Art of Meme Creation</h3>
            </Navbar.Brand>

            <Nav>
                {context.loggedIn && location.pathname !== '/MyPage' &&
                    <Link to="/MyPage">
                        <Button size='md' variant="outline-dark" type='Create Account' style={{ height: 42, border: 'none' }}>
                            <h5 style={{ color: '#4267B2' }}>My Page</h5>
                        </Button>
                    </Link>
                }
            </Nav>

            <Nav>
                {context.loggedIn && location.pathname === '/MyPage' &&
                    <Link to="/Home">
                        <Button size='md' variant="outline-dark" type='Create Account' style={{ height: 42, border: 'none' }}>
                            <h5 style={{ color: '#4267B2' }}>Home</h5>
                        </Button>
                    </Link>
                }
            </Nav>


            <Nav>
                {!context.loggedIn ?
                    <Link to="/CreateAccount">
                        <Button size='md' variant="outline-dark" type='Create Account' style={{ height: 42, border: 'none' }}>
                            <h5 style={{ color: '#4267B2' }}>Create Account</h5>
                        </Button>
                    </Link> :
                    <Link to="/CreateMeme">
                        <Button size='md' variant="outline-dark" type='Create Account' style={{ height: 42, border: 'none' }}>
                            <h5 style={{ color: '#DB4437' }}>Create Meme</h5>
                        </Button>
                    </Link>
                }
            </Nav>

            <Nav>
                {!context.loggedIn ?
                    <Link to='/login' style={{ textDecoration: "none" }} >
                        <Button size='md' variant="outline-dark" style={{ height: 42, border: 'none' }} >
                            <h5 style={{color: '#DB4437'}}>Login</h5>
                        </Button>
                    </Link> :
                    <Button size='md' variant="outline-dark" style={{ height: 42, border: 'none' }} onClick={ev => HandleLogout(ev)} >
                        <h5 style={{ color: '#adadad' }}>Logout</h5>
                    </Button>
                }
            </Nav>
        </Navbar >
    );
}

export default AppTitle;