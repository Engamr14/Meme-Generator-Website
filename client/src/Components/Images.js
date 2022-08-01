import React from 'react';
import {Card} from 'react-bootstrap';
import '../App.css';
import img1 from '../imgs/img1.jpg'
import img2 from '../imgs/img2.jpg'
import img3 from '../imgs/img3.jpg'
import img4 from '../imgs/img4.PNG'
import img5 from '../imgs/img5.jpg'

const Img1 = (text1, text2, FontFamily, FontSize, FontColor) => {

    return (
    <>
        <Card.Img
            variant="bottom"
            src={img1}
        />

        <Card.ImgOverlay className='container' style={{ position: 'absolute', width: 425, fontFamily: FontFamily,color: FontColor }}>
            <div className='App' style={{ position: 'absolute', top: 5, left: 220 }}>
                <span className='cardFontSize' style={{fontSize: FontSize}}>{text1}</span>
            </div>
            <div className='App' style={{ position: 'absolute', top: 230, left: 220 }}>
                <span className='cardFontSize' style={{fontSize: FontSize}}>{text2}</span>
            </div>
        </Card.ImgOverlay>
    </>
    );
};

const Img2 = (text1, text2, FontFamily, FontSize, FontColor) => {

    return (
    <>
        <Card.Img
            variant="bottom"
            src={img2}
        />

        <Card.ImgOverlay className='container' style={{ position: 'absolute', width: 425, fontFamily: FontFamily, color: FontColor }}>
            <div className='App' style={{ position: 'absolute', top: 5, left: 230 }}>
                <span className='cardFontSize' style={{fontSize: FontSize}}>{text1}</span>
            </div>
            <div className='App' style={{ position: 'absolute', top: 195, left: 230 }}>
                <span className='cardFontSize' style={{fontSize: FontSize}}>{text2}</span>
            </div>
        </Card.ImgOverlay>
    </>
    );
};

const Img3 = (text1, text2, FontFamily, FontSize, FontColor) => {

    return (
    <>
        <Card.Img
            variant="bottom"
            src={img3}
        />

        <Card.ImgOverlay style={{ position: 'absolute', fontFamily: FontFamily, color: FontColor }}>
            <div className='App' style={{ position: 'absolute', top: 0, left: 40, width: 150}}>
                <span className='cardFontSize' style={{fontSize: FontSize}}>{text1}</span>
            </div>
            <div className='App' style={{ position: 'relative', bottom: 18, left:190, width: 120 }}>
                <span className='cardFontSize' style={{fontSize: FontSize}}>{text2}</span>
            </div>
        </Card.ImgOverlay>
    </>
    );
};

const Img4 = (text, FontFamily, FontSize, FontColor) => {

    return (
    <>
        <Card.Img
            variant="bottom"
            src={img4}
        />

        <Card.ImgOverlay className='container' style={{ position: 'absolute', fontFamily: FontFamily, color: FontColor }}>
            <div className='App' style={{ position: 'absolute', top: 280, left: 230, width: 100}}>
                <span className='cardFontSize' style={{fontSize: FontSize}}>{text}</span>
            </div>
        </Card.ImgOverlay>
    </>
    );
};

const Img5 = (text, FontFamily, FontSize, FontColor) => {

    return (
    <>
        <Card.Img
            variant="bottom"
            src={img5}
        />

        <Card.ImgOverlay className='container' style={{ position: 'absolute',fontFamily: FontFamily, color: FontColor }}>
            <div className='App' style={{ position: 'absolute', top: 5, left: 21, width: 145 }}>
                <span className='cardFontSize' style={{fontSize: FontSize}}>{text}</span>
            </div>
        </Card.ImgOverlay>
    </>
    );
};

const Allimages = [img1, img2, img3, img4, img5];

const getImage = (index) => {
    return Allimages[index];
}

const AllimageCards = [Img1, Img2, Img3, Img4, Img5];

const Images = { Allimages, AllimageCards, getImage, Img1, Img2, Img3, Img4, Img5 };

export default Images;