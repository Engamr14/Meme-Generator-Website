//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import { UserContext } from './UserContext';
import CreateAccount from './Components/CreateAccount';
import AppTitle from './Components/AppTitle.js';
import HomeBody from './Components/HomeBody';
import LoginForm from './Components/LoginForm';
import CopyMeme from './Components/CopyMeme';
import CreateMeme from './Components/CreateMeme';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import API from './API';
import ScrollToTop from './Components/ScrollToTop';
import MyPage from './Components/MyPage';

function App() {

  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // should be (true)
  const [username, setUsername] = useState('User');

  const [Memes, setMemes] = useState([]);
  const [userMemes, setUserMemes] = useState([]);

  // param for custom context
  const context = {
    loggedIn: loggedIn,
    loading: loading,
    message: message,
    username: username,
    setMessage: setMessage
  }

  /* __________________________________________________________*/


  //const [UserMemes, setUserMemes] = useState([]);
  const [Refresh, setRefresh] = useState(false);

  // Rehydrate AllMemes when loggedIn or username or refresh are updated    // !!!!!!! check here if there is a problem here!!!!!!!
  useEffect(() => {
    if (loggedIn === true) {
      API.getAllMemes().then(memes => {
        setMemes(memes);
        setLoading(false);
      });
      try {
        API.getMemesByUser(username).then(memes => {
          setUserMemes(memes);
          setLoading(false);
        });
      } catch (err) {
        setUserMemes([]);
      }
    }
    else {
      API.getPublicMemes().then(memes => {
        setMemes(memes);
        setLoading(false);
      });
    }
  }, [loggedIn, username, Refresh]);


  // auth after first mount 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userInfo = await API.getUserInfo();
        setUsername(userInfo.name);
        setLoggedIn(true);
      } catch (err) {
        setLoading(false); // not logged but loaded
      }
    };
    checkAuth();
  }, [Refresh]);

  const addMeme = (meme) => {
    API.addMeme(meme).then(() => {
      setRefresh(!Refresh);
    })
  }

  const deleteMeme = (key) => {
    API.deleteMeme(key).then(() => {
      setRefresh(!Refresh);
    })
  }

  const addUser = (user) => {
    API.addUser(user);
  }

  const checkUserName = (name) => {
    const state = API.checkUserName(name).then((unique) => {
      if (unique === 'true') {
        return true;
      }
      else {
        return false;
      }
    })
    return state;
  }

  // logs user in and sets proper states
  const login = async (credentials) => {
    try {
      const user = await API.login(credentials);
      setLoggedIn(true);
      setUsername(user);
      setMessage('');
      setRefresh(!Refresh);
      return true;
    } catch (err) {
      setMessage(err);
      return false;
    }
  }

  // logs user out and clears states
  const logout = async () => {
    await API.logout();
    setLoggedIn(false);
    setMessage('');
    setUsername('');
    setUserMemes([]);
  }

  return (
    <UserContext.Provider value={context}>
      <Router>
        <ScrollToTop />
        <div className='background'>
          <Container className="container-fluid">
            <Row className="Setvheight">
              <AppTitle logout={logout} />
            </Row>

            <Switch>
              <Route path="/Home" render={() =>
                <Row>
                  {loading ? <h1 className='App' style={{ position: 'absolute', top: 250 }}>Please Wait !!</h1> :
                    <HomeBody Memes={Memes} deleteMeme={deleteMeme} />
                  }
                </Row>
              } />

              <Route path="/MyPage" render={() =>
                <Row>
                  {loading ? <h1 className='App' style={{ position: 'absolute', top: 250 }}>Please Wait !!</h1> :
                    <MyPage Memes={userMemes} deleteMeme={deleteMeme} />
                  }
                </Row>
              } />

              <Route path="/CopyMeme/:imgID/:visibility" render={({ match }) => {
                return <CopyMeme imgID={match.params.imgID} visibility={match.params.visibility} addMeme={addMeme} username={username} />
              }
              } />

              <Route path="/CreateMeme" render={() =>

                <CreateMeme addMeme={addMeme} username={username} />

              } />

              <Route path="/login" render={() =>

                <LoginForm login={login} />


              } />

              <Route path="/createAccount" render={() =>

                <CreateAccount addUser={addUser} checkUserName={checkUserName} />


              } />

              <Route>
                <Redirect to='/Home' />
              </Route>

            </Switch>
          </Container>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
