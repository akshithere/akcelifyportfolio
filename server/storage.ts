import { users, type User, type InsertUser, BlogPost, InsertBlogPost, Project, InsertProject } from "@shared/schema";
import { format } from "date-fns";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getAllProjects(): Promise<Project[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  private projects: Map<number, Project>;
  currentUserId: number;
  currentBlogPostId: number;
  currentProjectId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.projects = new Map();
    this.currentUserId = 1;
    this.currentBlogPostId = 1;
    this.currentProjectId = 1;

    // Initialize with sample data
    this.initializeBlogPosts();
    this.initializeProjects();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    // Sort by publish date in descending order
    return Array.from(this.blogPosts.values()).sort((a, b) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  private initializeBlogPosts() {
    const blogPosts: InsertBlogPost[] = [
      {
        title: "Retro Game Development with JavaScript",
        slug: "retro-game-development-javascript",
        excerpt: "Learn how to create classic arcade games using modern JavaScript and HTML5 Canvas.",
        content: `
# Retro Game Development with JavaScript

Remember the golden age of arcade games? Those simple yet addictive pixel masterpieces that consumed our quarters and our time? In this tutorial, I'll walk you through creating your own retro-style game using JavaScript and HTML5 Canvas.

## Setting Up Your Game Canvas

The first step in creating any canvas-based game is setting up your HTML structure and initializing the canvas context:

\`\`\`html
<canvas id="gameCanvas" width="800" height="600"></canvas>

<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  // Game initialization code here
</script>
\`\`\`

## Creating Game Objects

Most retro games use simple shapes or sprites to represent game objects. Here's how you might create a player character:

\`\`\`javascript
class Player {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = 5;
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  update(keys) {
    // Handle player movement based on key input
    if (keys.ArrowRight) this.x += this.speed;
    if (keys.ArrowLeft) this.x -= this.speed;
    // Add bounds checking to keep player on screen
    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
  }
}
\`\`\`

## The Game Loop

The heart of any game is the game loop - a continuous process of updating game state and rendering:

\`\`\`javascript
const keys = {};
const player = new Player(375, 550, 50, 30, '#39ff14');
const enemies = [];

// Handle keyboard input
window.addEventListener('keydown', e => {
  keys[e.key] = true;
});

window.addEventListener('keyup', e => {
  keys[e.key] = false;
});

function gameLoop() {
  // Clear canvas
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Update game objects
  player.update(keys);
  enemies.forEach(enemy => enemy.update());
  
  // Check for collisions
  // ...collision detection code...
  
  // Draw everything
  player.draw();
  enemies.forEach(enemy => enemy.draw());
  
  // Continue the loop
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
\`\`\`

This is just the beginning! From here, you can add enemy spawning logic, collision detection, scoring, power-ups, and much more to create a fully-featured retro game.

## Next Steps

In my next tutorial, I'll cover adding sound effects, implementing sprite-based animations, and creating level progression systems. Stay tuned!

Happy coding, and may your high scores be legendary!
        `,
        publishDate: new Date("2023-10-15"),
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
      },
      {
        title: "Building a Pixel Art Creator with React",
        slug: "pixel-art-creator-react",
        excerpt: "A step-by-step guide to creating a pixel art editor web application using React.",
        content: `
# Building a Pixel Art Creator with React

Pixel art has seen a resurgence in popularity, both in indie games and as a nostalgic art form. In this tutorial, I'll show you how to build your own pixel art editor using React.

## Project Setup

Let's start by creating a new React application:

\`\`\`bash
npx create-react-app pixel-art-creator
cd pixel-art-creator
npm start
\`\`\`

## Creating the Canvas Component

The heart of our pixel art editor will be the Canvas component:

\`\`\`jsx
import React, { useState } from 'react';

const Canvas = ({ width, height, cellSize }) => {
  const [grid, setGrid] = useState(
    Array(height).fill().map(() => Array(width).fill('#FFFFFF'))
  );
  const [currentColor, setCurrentColor] = useState('#000000');
  
  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = currentColor;
    setGrid(newGrid);
  };
  
  return (
    <div className="canvas">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row" style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              style={{
                width: cellSize + 'px',
                height: cellSize + 'px',
                backgroundColor: cell,
                border: '1px solid #ccc'
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
\`\`\`

## Adding a Color Palette

Next, let's create a ColorPalette component to select different colors:

\`\`\`jsx
import React from 'react';

const ColorPalette = ({ currentColor, setCurrentColor }) => {
  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FF9900', '#9900FF'
  ];
  
  return (
    <div className="color-palette">
      {colors.map((color, index) => (
        <div
          key={index}
          className="color-swatch"
          style={{
            backgroundColor: color,
            width: '30px',
            height: '30px',
            margin: '5px',
            border: color === currentColor ? '2px solid #fff' : '1px solid #333',
            cursor: 'pointer'
          }}
          onClick={() => setCurrentColor(color)}
        />
      ))}
      <input
        type="color"
        value={currentColor}
        onChange={(e) => setCurrentColor(e.target.value)}
      />
    </div>
  );
};

export default ColorPalette;
\`\`\`

## Putting It All Together

Now, let's combine these components in our App component:

\`\`\`jsx
import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ColorPalette from './components/ColorPalette';
import './App.css';

function App() {
  const [currentColor, setCurrentColor] = useState('#000000');
  const [canvasSize, setCanvasSize] = useState({ width: 16, height: 16 });
  const [cellSize, setCellSize] = useState(20);
  
  return (
    <div className="App">
      <h1>Pixel Art Creator</h1>
      <div className="editor-container">
        <ColorPalette 
          currentColor={currentColor} 
          setCurrentColor={setCurrentColor} 
        />
        <Canvas 
          width={canvasSize.width}
          height={canvasSize.height}
          cellSize={cellSize}
          currentColor={currentColor}
        />
      </div>
      <div className="controls">
        <button onClick={() => {/* Export as PNG logic */}}>
          Export as PNG
        </button>
      </div>
    </div>
  );
}

export default App;
\`\`\`

## Adding Advanced Features

From here, you can enhance your pixel art editor with features like:

- Export functionality to save your pixel art as PNG
- Undo/redo functionality
- Different tools like fill bucket, eraser, etc.
- Animation frames for creating sprite animations
- Layers for more complex pixel art

Ready to create some awesome pixel art? Let me know what you build with this tutorial!
        `,
        publishDate: new Date("2023-09-22"),
        imageUrl: "https://images.unsplash.com/photo-1586802978403-6406fb3ddfff",
      },
      {
        title: "Creating a Synthwave Audio Visualizer with Web Audio API",
        slug: "synthwave-audio-visualizer",
        excerpt: "Learn how to use the Web Audio API to create a retro-style audio visualizer for your music applications.",
        content: `
# Creating a Synthwave Audio Visualizer with Web Audio API

The synthwave aesthetic, with its neon grids and retro-futuristic vibes, pairs perfectly with audio visualizations. In this tutorial, I'll show you how to create a synthwave-inspired audio visualizer using the Web Audio API.

## Setting Up the Audio Context

First, we need to set up the Web Audio API context and create an analyzer:

\`\`\`javascript
// Initialize audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// Create analyzer node
const analyzer = audioContext.createAnalyser();
analyzer.fftSize = 256;
const bufferLength = analyzer.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Connect audio source to analyzer
let audioSource = null;

function connectAudio(audioElement) {
  audioSource = audioContext.createMediaElementSource(audioElement);
  audioSource.connect(analyzer);
  analyzer.connect(audioContext.destination);
}
\`\`\`

## Creating the Canvas Visualization

Next, we'll set up a canvas element and create our visualization:

\`\`\`javascript
// Set up canvas
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define colors for our synthwave gradient
const colors = [
  '#ff00ff', // Magenta
  '#00ffff', // Cyan
  '#ff00ff'  // Back to magenta for seamless gradient
];

function createGradient(ctx, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });
  return gradient;
}

// Draw the visualization
function visualize() {
  requestAnimationFrame(visualize);
  
  // Get frequency data
  analyzer.getByteFrequencyData(dataArray);
  
  // Clear canvas
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Set up bars
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;
  
  // Create gradient for bars
  const barGradient = createGradient(ctx, canvas.height);
  
  // Draw bars
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 2;
    
    // Draw synthwave "sun" circle
    if (i === Math.floor(bufferLength / 2)) {
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height - 50, 
              100 + dataArray[i] / 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ff00ff';
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ff00ff';
    } else {
      ctx.shadowBlur = 0;
    }
    
    // Draw frequency bars
    ctx.fillStyle = barGradient;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    
    x += barWidth + 1;
  }
  
  // Draw grid
  drawRetroGrid();
}
\`\`\`

## Adding the Synthwave Grid

A key element of the synthwave aesthetic is the grid perspective. Here's how to add it:

\`\`\`javascript
function drawRetroGrid() {
  // Perspective grid settings
  const horizonY = canvas.height * 0.6;
  const gridSize = 40;
  const vanishingPointX = canvas.width / 2;
  
  // Create grid gradient
  const gridGradient = ctx.createLinearGradient(0, horizonY, 0, canvas.height);
  gridGradient.addColorStop(0, '#ff00ff');
  gridGradient.addColorStop(1, 'rgba(255, 0, 255, 0.1)');
  
  ctx.strokeStyle = gridGradient;
  ctx.lineWidth = 2;
  
  // Draw horizontal lines
  for (let y = horizonY; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  
  // Draw vertical lines with perspective
  for (let x = 0; x < canvas.width; x += gridSize) {
    const perspectiveStart = map(x, 0, canvas.width, 0, canvas.width);
    
    ctx.beginPath();
    ctx.moveTo(perspectiveStart, horizonY);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
}

// Helper function to map values
function map(value, in_min, in_max, out_min, out_max) {
  return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
\`\`\`

## Connecting to Audio Input

Finally, let's hook up our visualizer to an audio source:

\`\`\`javascript
// Get audio element
const audio = document.getElementById('audio');
const playButton = document.getElementById('play');

playButton.addEventListener('click', () => {
  // Check if context is in suspended state (autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Play or pause track depending on state
  if (playButton.dataset.playing === 'false') {
    audio.play();
    playButton.dataset.playing = 'true';
    playButton.textContent = 'Pause';
    
    // Connect audio if not already connected
    if (!audioSource) {
      connectAudio(audio);
    }
    
    // Start visualization
    visualize();
  } else {
    audio.pause();
    playButton.dataset.playing = 'false';
    playButton.textContent = 'Play';
  }
}, false);
\`\`\`

With this code, you'll have a synthwave-inspired audio visualizer that reacts to your music. You can customize the colors, grid design, and visualization style to fit your specific aesthetic preferences.

## Going Further

To enhance your visualizer, consider adding:

- 3D effects using Three.js for more immersive visuals
- User controls for adjusting visualization parameters
- Reactive typography that pulses with the beat
- VHS-style glitch effects for added retro feel

Ready to create some awesome retro visualizations? Drop me a message if you build something cool with this tutorial!
        `,
        publishDate: new Date("2023-08-05"),
        imageUrl: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d",
      }
    ];

    blogPosts.forEach(post => {
      const id = this.currentBlogPostId++;
      this.blogPosts.set(id, { id, ...post });
    });
  }

  private initializeProjects() {
    const projects: InsertProject[] = [
      {
        title: "OSDHACK",
        description: "Retro-themed hackathon website featuring pixel icons, arcade-style visuals, and detailed event info.",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
        demoUrl: "https://hack.osdc.dev",
        codeUrl: "https://github.com/akshithere/osdhack",
        borderColor: "arcade-green",
      },
      {
        title: "Better Together",
        description: "AI-powered platform to help users find relevant NGOs based on their queries, built with MERN stack and Gemini API.",
        imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca",
        demoUrl: "https://bettertogether.akcelify.xyz",
        codeUrl: "https://github.com/akshithere/better-together",
        borderColor: "retro-magenta",
      },
      {
        title: "PokeArcadia",
        description: "A fun arcade-style interactive website built to teach 50+ students Git and GitHub in an engaging way. Canvas-based Pokémon interface with keyboard controls.",
        imageUrl: "https://images.unsplash.com/photo-1642229407671-d092716e2489",
        demoUrl: "https://pokedex.osdc.dev",
        codeUrl: "https://github.com/osdc/PokeArcadia",
        borderColor: "crt-cyan",
      },
      {
        title: "Quotomatic",
        description: "A quote aggregator website built to learn and practice web scraping and PostgreSQL integration.",
        imageUrl: "https://images.unsplash.com/photo-1543652437-15ae836b15e3",
        demoUrl: "https://quotomatic.akcelify.xyz",
        codeUrl: "https://github.com/akshithere/quotomatic",
        borderColor: "coin-yellow",
      },
      {
        title: "Akcelify",
        description: "Personal/portfolio site with retro pixel aesthetics and arcade-style animations.",
        imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086",
        demoUrl: "https://akcelify.xyz",
        codeUrl: "https://github.com/akshithere/akcelify",
        borderColor: "arcade-green",
      },
      {
        title: "IdeaNest",
        description: "Platform where investors and founders can meet and share startup ideas.",
        imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
        demoUrl: "#",
        codeUrl: "https://github.com/akshithere/ideanest",
        borderColor: "retro-magenta",
      }
    ];

    projects.forEach(project => {
      const id = this.currentProjectId++;
      // Ensure demoUrl and codeUrl are never undefined
      const processedProject = {
        ...project,
        demoUrl: project.demoUrl || null,
        codeUrl: project.codeUrl || null,
        id
      };
      this.projects.set(id, processedProject);
    });
  }
}

export const storage = new MemStorage();
