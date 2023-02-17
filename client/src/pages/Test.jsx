import React, {useState} from 'react';
import '../style/test.css'

const Test = () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setCoords({ x: event.clientX, y: event.clientY });
    };

    return (
        <div className="App" onMouseMove={handleMouseMove}>
            <div className="cursor color1" style={{ left: coords.x, top: coords.y }} />
            <div className="cursor color2" style={{ left: coords.x + 10, top: coords.y + 10 }} />
            <div className="cursor color3" style={{ left: coords.x + 20, top: coords.y + 20 }} />
            <div className="cursor color4" style={{ left: coords.x + 30, top: coords.y + 30 }} />
            <h1>Animatie pe fundal interactiva cu cursorul</h1>
            <p>Mută cursorul pentru a interacționa cu fundalul.</p>
        </div>
    );
};

export default Test;