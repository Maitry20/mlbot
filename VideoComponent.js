import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoComponent = () => {
  const [currentPhase, setCurrentPhase] = useState('intro');
  const [currentCard, setCurrentCard] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const flashCards = [
    {
      title: "🔥 1. Amazon SageMaker Pipelines = CI/CD for ML",
      content: "Why retrain manually when SageMaker Pipelines can automate your entire ML workflow — from preprocessing to deployment — just like a DevOps pipeline? Bonus: full model lineage tracking too."
    },
    {
      title: "🤖 2. Amazon Q Can Write & Fix ML Code",
      content: "Yes, write. Amazon Q Developer understands your PyTorch or TensorFlow code, helps debug training loops, and even writes preprocessing code for SageMaker. It's like ChatGPT with an ML PhD in your IDE."
    },
    {
      title: "📦 3. AWS Feature Store Isn't Just a Buzzword",
      content: "Tired of mismatched training and serving features? AWS SageMaker Feature Store lets you store, reuse, and version your features — making reproducibility and model updates way easier."
    },
    {
      title: "📊 4. Amazon QuickSight + ML Insights",
      content: "Not just for dashboards. QuickSight can use built-in ML-powered anomaly detection to alert you when your model predictions go rogue in real time."
    },
    {
      title: "🌍 5. Amazon Athena + S3 = Query Anything, Anytime",
      content: "Still downloading datasets locally? With Athena, you can directly query massive CSV/Parquet datasets stored in S3 using SQL — no ETL or servers required."
    }
  ];

  const speak = (text) => {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        // Remove emojis and clean text for TTS
        const cleanText = text.replace(/[\u{1F000}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').replace(/\s+/g, ' ').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Zira') || voice.name.includes('Samantha'));
        if (femaleVoice) utterance.voice = femaleVoice;
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 1;
        utterance.onend = resolve;
        speechSynthesis.speak(utterance);
      } else {
        setTimeout(resolve, text.length * 50);
      }
    });
  };

  const startVideo = async () => {
    setIsPlaying(true);
    
    // Intro phase
    await speak("Game-Changing AWS Secrets Most ML Engineers Miss!");
    
    // Move bot to top left
    setCurrentPhase('cards');
    
    // Show each flash card
    for (let i = 0; i < flashCards.length; i++) {
      setCurrentCard(i);
      await speak(flashCards[i].title + ". " + flashCards[i].content);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Outro phase
    setCurrentPhase('outro');
    await speak("Are you using any of these in your current ML workflow? Drop a comment — I'd love to learn how others are scaling ML in the cloud!");
    
    setIsPlaying(false);
  };

  const Bot = ({ position = 'center' }) => (
    <motion.div
      className={`absolute ${position === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-8 left-8'}`}
      initial={position === 'center' ? { scale: 0 } : { x: -200, y: -200 }}
      animate={position === 'center' ? { scale: 1 } : { x: 0, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-float shadow-lg">
          <span className="text-3xl">🤖</span>
        </div>
        {(currentPhase === 'intro' || currentPhase === 'outro') && (
          <motion.div
            className="absolute -top-20 left-20 bg-white rounded-2xl p-4 shadow-lg max-w-md w-80"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-sm font-medium text-gray-800">
              {currentPhase === 'intro' ? "Game-Changing AWS Secrets Most ML Engineers Miss!" : "💡 Are you using any of these in your current ML workflow? Drop a comment — I'd love to learn how others are scaling ML in the cloud!"}
            </div>
            <div className="absolute bottom-0 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  const FlashCard = ({ card, index }) => (
    <motion.div
      key={index}
      className="absolute inset-0 flex items-center justify-center p-8"
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 max-w-4xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">{card.title}</h2>
        <p className="text-xl text-white leading-relaxed">{card.content}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Bot */}
      <Bot position={currentPhase === 'intro' || currentPhase === 'outro' ? 'center' : 'topLeft'} />

      {/* Flash Cards */}
      <AnimatePresence mode="wait">
        {currentPhase === 'cards' && (
          <FlashCard card={flashCards[currentCard]} index={currentCard} />
        )}
      </AnimatePresence>

      {/* Start Button */}
      {!isPlaying && currentPhase === 'intro' && (
        <motion.button
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
          onClick={startVideo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          ▶ Start Video
        </motion.button>
      )}

      {/* Restart Button */}
      {!isPlaying && currentPhase === 'outro' && (
        <motion.button
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => {
            setCurrentPhase('intro');
            setCurrentCard(0);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          🔄 Watch Again
        </motion.button>
      )}
    </div>
  );
};

export default VideoComponent;