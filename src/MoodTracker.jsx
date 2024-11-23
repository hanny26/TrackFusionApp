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
  "https://i.pinimg.com/control2/736x/00/a3/4b/00a34ba47602db06a50bc6dd12be696f.jpg", // Example meme URLs
  "https://i.pinimg.com/control2/736x/ef/c8/d2/efc8d2985378b3f8ff53722f04aee16f.jpg",
  "https://i.pinimg.com/control2/736x/7b/17/f9/7b17f98bd3bc84909cb9997a02a778c3.jpg",
];

const genericMessages = {
  sad: "Don't worry, here's something to cheer you up! 😊",
  happy: "Keep shining! Here's something to inspire you!",
  default: "Hope you have an amazing day!",
};

const MoodTracker = ({ selectedDate }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [content, setContent] = useState("");

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    localStorage.setItem(`${selectedDate}-mood`, mood);

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
    const savedMood = localStorage.getItem(`${selectedDate}-mood`);
    if (savedMood) {
      setSelectedMood(savedMood);
    }
  }, [selectedDate]);

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
