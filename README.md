# AWS ML Secrets Animated Video

An interactive animated video showcasing AWS services that ML engineers should know, built with React, Framer Motion, and TailwindCSS.

## Features

- 🤖 Animated bot with floating animation
- 💬 Speech bubbles with text-to-speech functionality
- 🎴 Animated flash cards with smooth transitions
- 🎨 Beautiful gradient backgrounds and particle effects
- 🔊 Built-in browser TTS support

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How it works

1. Bot appears in center with intro speech bubble
2. After TTS completes, bot moves to top-left
3. Flash cards appear one by one with TTS narration
4. Each card stays for 1 second after TTS completes, then fades
5. Bot returns to center for outro message

## Browser Compatibility

The TTS feature works in modern browsers that support the Web Speech API. If TTS is not available, the timing will be simulated based on text length.

## Customization

You can modify the flash card content in the `flashCards` array within `VideoComponent.js`.