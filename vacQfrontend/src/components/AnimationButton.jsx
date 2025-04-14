import { useState } from 'react';
import './AnimationButton.css';

export default function AnimatedButton() {
  const [hovered, setHovered] = useState(false);

  const rotations = ['90deg', '-30deg', '45deg'];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '200px',
          height: '80px',
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: 'blue',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '2px solid black',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Hover me
      </button>

      {/* 3 floating triangles */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        zIndex: 10,
      }}>
        {rotations.map((rotation, i) => (
          <div
            key={i}
            className={`triangle ${hovered ? 'animate-triangle' : ''}`}
            style={{
              '--rotation': rotation,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
