import React, { useState } from 'react';
import { Col, Row, Form, Card, Button, Alert, FormControl } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import Images from './Images';
import context from 'react-bootstrap/esm/AccordionContext';

function CopyMeme(props) {
    const [Title, setTitle] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [FontSize, setFontSize] = useState(16);
    const [FontFamily, setFontFamily] = useState('Arial');
    const [FontColor, setFontColor] = useState('Black');
    const [incompleteAlert, setIncompleteAlert] = useState(false);

    let history = useHistory();
    console.log(props.Meme);
    const index = props.imgID;
    const visibility = props.visibility;

    const HandleSubmit = (ev) => {
        ev.preventDefault();
        if (Title !== '' && text1 !== '') {
            props.addMeme({
                user: props.username, title: Title, imgID: index, text1: text1, text2: text2,
                fontFamily: FontFamily, fontSize: FontSize, fontColor: FontColor, visibility: visibility
            });
            setIncompleteAlert(false);
            history.push('/MyPage');


        }
        else {
            setIncompleteAlert(true);
        }
    };

    return (
        <>
            {!context.loading &&

                <Row className="row container-fluid changePos3 ">

                    <Row className='cardPadding'>
                        <Card style={{ height: 65 }} className='border border-dark'>
                            <div className='App'>
                                <span className='TitleFontSize' style={{ color: '#000000' }}>Copy this Meme by </span>
                                <span className='TitleFontSize' style={{ color: '#4267B2' }}>Meme</span>
                                <span className='TitleFontSize' style={{ color: '#DB4437' }}>Generator</span>
                            </div>

                        </Card>
                    </Row>

                    {incompleteAlert &&
                        <Row className='cardPadding'>
                            <Alert variant='danger'> Incomplete fields! Please fill all required fields </Alert>
                        </Row>
                    }

                    <Row>
                        <Card style={{ width: 1500, height: 610 }}>
                            <Row className='cardPadding'>
                                <Col>
                                    <Row>
                                        <div className='App'>
                                            <span className='TitleFontSize' style={{ color: '#4267B2' }}>Meme Title: </span>
                                            <span className='TitleFontSize' style={{ color: '#DB4437' }}>{Title}</span>
                                        </div>
                                        <hr />
                                    </Row>
                                    <Row className='cardPadding'>
                                        <div style={{ position: 'relative', left: 100 }}>
                                            <Card bg='dark' style={{ width: 450, hight: 550 }} >

                                                {index < 3 ? Images.AllimageCards[index](text1, text2, FontFamily, FontSize, FontColor) : Images.AllimageCards[index](text1, FontFamily, FontSize, FontColor)}

                                            </Card>
                                        </div>

                                    </Row>
                                </Col>

                                <div className='vl' />

                                <Col>
                                    <Row>
                                        <div className='App'>
                                            <span className='TitleFontSize' style={{ color: '#000000' }}>Customize your </span>
                                            <span className='TitleFontSize' style={{ color: '#4267B2' }}>Me</span>
                                            <span className='TitleFontSize' style={{ color: '#DB4437' }}>me</span>
                                        </div>
                                        <hr />
                                    </Row>

                                    <Row className='cardPadding'>
                                        <Col>
                                            <p> Title: </p>
                                        </Col>
                                        <Col>
                                            <FormControl placeholder="Meme Title" style={{ width: 550, position: 'absolute', left: 810 }} onChange={ev => setTitle(ev.target.value)} />
                                        </Col>
                                    </Row>


                                    <Row className='cardPadding'>
                                        <Col>
                                            <p>Text1:</p>
                                        </Col>
                                        <Col>
                                            <Row className="smallPadding">
                                                <FormControl placeholder='text 1' style={{ width: 550, position: 'absolute', left: 810 }}
                                                    onChange={ev => setText1(ev.target.value)} />
                                            </Row>
                                        </Col>
                                    </Row>

                                    {index < 3 && <Row className='cardPadding'>
                                        <Col>
                                            <p>Text2:</p>
                                        </Col>
                                        <Col>
                                            <Row className="smallPadding">
                                                <FormControl placeholder='text 2' style={{ width: 550, position: 'absolute', left: 810 }}
                                                    onChange={ev => setText2(ev.target.value)} />
                                            </Row>
                                        </Col>
                                    </Row>
                                    }



                                    <Row className='cardPadding'>
                                        <Col>
                                            <p> Font: </p>
                                        </Col>
                                        <Col>
                                            <Form.Control as="select" style={{ width: 200, position: 'absolute', left: 810 }} onChange={ev => setFontFamily(ev.target.value)}>
                                                <option> Arial </option>
                                                <option> New Times Roman </option>
                                                <option> Calibri </option>
                                            </Form.Control>
                                        </Col>
                                    </Row>

                                    <Row className='cardPadding'>
                                        <Col>
                                            <p>Size:</p>
                                        </Col>
                                        <Col>
                                            <Form.Control as="select" style={{ width: 70, position: 'absolute', left: 810 }} onChange={ev => { setFontSize(parseInt(ev.target.value)); console.log(ev.target.value) }}>
                                                <option> 16 </option>
                                                <option> 20 </option>
                                                <option> 24 </option>
                                                <option> 28 </option>
                                                <option> 30 </option>
                                                <option> 32 </option>
                                            </Form.Control>
                                        </Col>
                                    </Row>

                                    <Row className='cardPadding'>
                                        <Col>
                                            <p>Color:</p>
                                        </Col>
                                        <Col>
                                            <Form.Control as="select" style={{ width: 70, position: 'absolute', left: 810 }} onChange={ev => setFontColor(ev.target.value)}>
                                                <option className='blackBackground'> Black </option>
                                                <option className='redBackground' style={{ color: 'red' }}> Red </option>
                                                <option className='yellowBackground' style={{ color: 'yellow' }}> Yellow </option>
                                                <option style={{ color: 'white' }}> White </option>
                                            </Form.Control>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col style={{ position: 'absolute', top: 510, left: 1200 }}>
                                            <Button size='lg' variant="dark" onClick={ev => HandleSubmit(ev)}>Create</Button>
                                        </Col>
                                        <Col style={{ position: 'absolute', top: 510, left: 1320 }}>
                                            <Link to='/Home'><Button size='lg' variant="outline-dark"> Cancel </Button></Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>


                        </Card>
                    </Row>


                    {incompleteAlert &&
                        <Row className='cardPadding'>
                            <Alert variant='danger'> Incomplete fields! Please fill all required fields </Alert>
                        </Row>
                    }
                </Row>
            }
        </>
    );
}
export default CopyMeme;