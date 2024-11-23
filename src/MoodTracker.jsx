import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./MoodTracker.css";

// Moods and corresponding content
const moods = [
  { icon: "😄", type: "happy" },
  { icon: "😊", type: "content" },
  { icon: "😐", type: "neutral" },
  { icon: "😔", type: "sad" },
  { icon: "😢", type: "verySad" },
];

const motivationalQuotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "Believe in yourself! The world will adjust.",
];

const funnyMemes = [
  "https://i.imgflip.com/1bij.jpg", // Example meme URLs
  "https://i.imgflip.com/30b1gx.jpg",
  "https://i.imgflip.com/26am.jpg",
];

const genericMessages = {
  sad: "Don't worry, here's something to cheer you up! 😊",
  happy: "Keep shining! Here's something to inspire you!",
  default: "Hope you have an amazing day!",
};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(
    localStorage.getItem("mood") || null
  );
  const [content, setContent] = useState("");

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    localStorage.setItem("mood", mood);

    // Dynamically set content based on mood
    if (mood === "😔" || mood === "😢") {
      const randomMeme = funnyMemes[Math.floor(Math.random() * funnyMemes.length)];
      setContent(
        <div className="content">
          <p>{genericMessages.sad}</p>
          <img src={randomMeme} alt="Funny Meme" className="meme" />
        </div>
      );
    } else if (mood === "😄") {
      const randomQuote =
        motivationalQuotes[
          Math.floor(Math.random() * motivationalQuotes.length)
        ];
      setContent(
        <div className="content">
          <p>{genericMessages.happy}</p>
          <blockquote>{randomQuote}</blockquote>
        </div>
      );
    } else {
      setContent(<p>{genericMessages.default}</p>);
    }
  };

  useEffect(() => {
    const savedMood = localStorage.getItem("mood");
    if (savedMood) {
      setSelectedMood(savedMood);
    }
  }, []);

  return (
    <div className="mood-tracker">
      <h2 className="title">How's your mood today?</h2>
      <div className="mood-options">
        {moods.map((mood, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMoodSelect(mood.icon)}
            className={`mood ${
              selectedMood === mood.icon ? "selected-mood" : ""
            }`}
          >
            {mood.icon}
          </motion.div>
        ))}
      </div>
      {selectedMood && (
        <div className="mood-message">
          <p>
            You feel <span className="highlight">{selectedMood}</span> today!
          </p>
          {content}
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
