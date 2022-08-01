import React, { useContext } from 'react';
import { Col, Row, CardColumns, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Redirect, useHistory} from 'react-router-dom';
import '../App.css';
import { UserContext } from '../UserContext';
import Images from './Images';

function MyPage(props) {

    const context = useContext(UserContext);

    let history = useHistory();

    const MemeCard = (meme, key) => {
        const index = meme.imgID;
        const visibility = meme.visibility;

        const HandleCopy = (ev) => {
            ev.preventDefault();
            history.push('/CopyMeme/' + index + '/' + visibility);
        }

        const HandleDelete = (ev) => {
            ev.preventDefault();
            props.deleteMeme(meme.key);
        }

        return (
            <div className="col-md-4 cardPadding" key={key} >
                <Card bg='dark' key={key}>

                    <Card.Header className='App'>
                        <span style={{ color: '#4267B2', fontSize: 28 }}>Meme Title: </span>
                        <span style={{ color: '#DB4437', fontSize: 28 }}>{meme.title}</span>
                    </Card.Header>

                    <div style={{ position: 'relative' }} className='smallPadding'>
                        {index < 3 ?
                            Images.AllimageCards[index](meme.text1, meme.text2, meme.fontFamily, meme.fontSize, meme.fontColor) :
                            Images.AllimageCards[index](meme.text1, meme.fontFamily, meme.fontSize, meme.fontColor)}
                    </div>

                    <Card.Footer>
                        <Row className='App'>
                            {context.loggedIn &&
                                <Col style={{}}>
                                    <Button size="lg" variant="dark" onClick={ev => HandleCopy(ev)}>Copy</Button>
                                </Col>
                            }
                            {context.loggedIn && context.username === meme.user &&
                                <Col style={{}}>
                                    <Button size="lg" variant="dark" onClick={ev => HandleDelete(ev)}>Delete</Button>
                                </Col>
                            }

                            <Col>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">
                                    <p>Font Family: {meme.fontFamily}</p>
                                    <p>Font Size: {meme.fontSize}</p>
                                    <p>Font Color: {meme.fontColor}</p>
                                    <p>Creator: {meme.user}</p>
                                    <p>Visibility: {visibility}</p>
                                </Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button disabled size='lg' variant='dark' style={{ pointerEvents: 'none' }}>
                                            info
                                        </Button>
                                    </span>
                                </OverlayTrigger>
                            </Col>
                        </Row>

                    </Card.Footer>

                </Card>
            </div>
        );
    };


    return (
        <div className="row container-fluid changePos3 ">
            {(context.loggedIn && (props.Memes.length !== 0))?
            <Row>
                <CardColumns className="row container-fluid">
                    {props.Memes.map((meme, index) => MemeCard(meme, index))}
                </CardColumns>
            </Row> :
            <Redirect to='/Home'/>
        }
            
        </div>
    );
}

export default MyPage;