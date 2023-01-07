import React, { useState, useEffect } from "react";
import background from './Assets/images/background.png'

export default function App() {
    const [move, setMove] = useState(false);
    const [isSpacePressed, setIsSpacePressed] = useState(false);
    const [birdY, setBirdY] = useState(0);
    const [birdRotation, setBirdRotation] = useState(0);
    const [animationstart, setanimationstart] = useState(false)



    const handleKeyDown = (event) => {
        if (event.code === 'Space') {
            setMove(true);
            setIsSpacePressed(true);
            setanimationstart(true)
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (animationstart) {
            let currentY = birdY;
            let currentRotation = birdRotation;
            let frameId;

            const animate = () => {
                if (isSpacePressed) {
                    currentY -= 5;
                    currentRotation = Math.min(currentRotation + 5, 45);
                } else {
                    currentY += 5;
                    currentRotation = Math.max(currentRotation - 5, -45);
                }
                setBirdY(currentY);
                setBirdRotation(currentRotation);

                frameId = requestAnimationFrame(animate);
            };

            frameId = requestAnimationFrame(animate);

            return () => {
                cancelAnimationFrame(frameId);
            };
        }
    }, [isSpacePressed, birdY, animationstart, birdRotation]);

    useEffect(() => {
        console.log(birdY);
        if (birdY > 300 || birdY < -300) {
            // alert('You lost');
            window.location.reload();
        }
    }, [birdY]);


    return <>
        <div className={`road ${move ? 'Active' : ''}`} style={{ backgroundImage: `url(${background})` }}>
            <div className={`bird`} style={{ transform: `translateY(${birdY}px) rotate(${birdRotation}deg)`, }}></div>
        </div>
    </>
}