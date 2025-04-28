import { useState, useEffect } from 'react';

// Konami Code: up, up, down, down, left, right, left, right, b, a
const konamiCode = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA'
];

export function useKonamiCode() {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [konamiActivated, setKonamiActivated] = useState(false);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      // Add the current key code to the end of the array
      const updatedKeys = [...keysPressed, e.code];
      
      // Only keep the last X keys pressed (where X is the length of the code)
      if (updatedKeys.length > konamiCode.length) {
        updatedKeys.shift();
      }
      
      setKeysPressed(updatedKeys);
      
      // Check if the keys pressed match the Konami code
      const konamiMatch = updatedKeys.join(',') === konamiCode.join(',');
      
      if (konamiMatch) {
        setKonamiActivated(true);
        
        // Play a retro sound if available
        try {
          const audio = new Audio('/arcade-powerup.mp3');
          audio.play();
        } catch (error) {
          console.log('Sound effect not available');
        }
        
        // Log a retro-style message to the console
        console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'color: #00ff00; font-family: "Press Start 2P"; font-size: 14px; text-shadow: 2px 2px #000;');
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [keysPressed]);

  return konamiActivated;
}