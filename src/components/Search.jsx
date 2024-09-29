import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import img from "./github.png";

const Dictionary = () => {
  const [data, setData] = useState(null);
  const [nameData, setNameData] = useState(null); // For name meanings
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchWordData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const notifyError = (message) => {
      toast.error(message, {
        duration: 4000,
        position: "top-center",
        style: {
          background: darkMode ? "#0056b3" : "#ffdd40", // Change toast color based on mode
          color: darkMode ? "#ffffff" : "#1c2628",
          fontSize: "15px",
        },
      });
    };

    const api_key = "na816596073";

    // Fetch word definitions
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        setData(response.data[0]);
        setLoading(false);
      })
      .catch(() => {
        notifyError("Enter the correct word. If it wasn't a name");
        setLoading(false);
      });

    // Fetch name meanings from a name meaning API
    axios
      .get(
        `https://www.behindthename.com/api/lookup.json?name=${word}&key=${api_key}`
      )
      .then((response) => {
        setNameData(response.data); // Handle name data as an array
      })
      .catch(() => {
        setNameData(null); // No name meaning found
      });
    setError("");
  };

  return (
    
    
    
<div
  className={`${darkMode ? "dark bg-[#1c2628]" : "bg-white"} min-h-screen flex items-center justify-center`}
>
  
  <Toaster />

  {/* Main content wrapper */}
  <div className="flex flex-col items-center justify-center p-6 w-full max-w-lg">

    <h1
      className={`text-5xl font-bold mb-3 ${
        darkMode ? "text-white" : "text-[#1c2628]"
      }`}
    >
      <span className={`text-lg font-bold ${
        darkMode ? "text-[#94cf41]" : "text-red-500"
      }`}>Pocket</span> Dictionary
    </h1>

    <form className="mb-6 w-full max-w-lg" onSubmit={fetchWordData}>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word or name"
        className={`w-full border-2 p-2 rounded-md focus:outline-none transition duration-300 ${
          darkMode
            ? "border-white text-white bg-[#1c2628] focus:border-[#94cf41]"
            : "border- text-[#1c2628] bg-white focus:border-[#1c2628]"
        }`}
      />
      <button
        type="submit"
        className={`mt-4 w-full px-4 py-2 rounded-md transition  ${
          darkMode
            ? "bg-white text-[#3a4d1f]"
            : "bg-[#1c2628] text-white"
        }`}
      >
        Search
      </button>
    </form>
    <div className=" mx-auto right-4 mb-3">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 shadow-lg rounded-full focus:outline-none transition-transform transform hover:scale-11 ${
          darkMode
          ? "border-white text-[#1c2628] bg-white"
          : "border-[#94cf41] text-[#94cf41] bg-[#1c2628] focus:border-[#1c2628]"
        }`}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>

    {loading && (
      <p className="text-sm text-gray-700 dark:text-gray-200">Loading...</p>
    )}
    {error && <p className="text-red-500">{error}</p>}

    {data && (
      <div
        className={`p-6 rounded-lg shadow-lg w-full max-w-2xl transition duration-500 ${
          darkMode ? "bg-[#1c2628] text-white" : "bg-white text-[#1c2628]"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-2">Word: {data.word}</h2>
        {data.phonetic && (
          <p className="text-lg mb-2">Phonetic: {data.phonetic}</p>
        )}

        {data.phonetics[1]?.audio && (
          <audio controls className="mb-4">
            <source src={data.phonetics[1].audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}

        {data.meanings.map((meaning, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-medium">
              Part of Speech: {meaning.partOfSpeech}
            </h3>
            {meaning.definitions.slice(0, 3).map((definition, defIndex) => (
              <div key={defIndex} className="pl-4 my-2">
                <p>Definition: {definition.definition}</p>
                {definition.example && (
                  <p className="text-sm italic">
                    Example: {definition.example}
                  </p>
                )}
              </div>
            ))}
            {meaning.synonyms.length > 0 && (
              <div className="pl-4">
                <p className="text-lg font-semibold">Synonyms:</p>
                <ul className="list-disc list-inside">
                  {meaning.synonyms.slice(0, 3).map((synonym, synIndex) => (
                    <li key={synIndex}>{synonym}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    )}

    {nameData &&
      nameData.length > 0 &&
      nameData.map((nameInfo, idx) => (
        <div
          key={idx}
          className={`p-6 mt-6 rounded-lg shadow-lg w-full max-w-2xl transition duration-500 ${
            darkMode ? "bg-[#1c2628] text-white" : "bg-white text-[#1c2628]"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-2">
            Name: {nameInfo.name}
          </h2>
          <p className="text-lg">
            Gender: {nameInfo.gender === "m" ? "Masculine" : "Feminine"}
          </p>
          {nameInfo.usages && nameInfo.usages.length > 0 && (
            <p className="text-lg">
              Usage:{" "}
              {nameInfo.usages.map((usage) => usage.usage_full).join(", ")}
            </p>
          )}
          {nameInfo.scripts && (
            <p className="text-lg">Scripts: {nameInfo.scripts}</p>
          )}
          {nameInfo.pronunciation && (
            <p className="text-lg">Pronounced: {nameInfo.pronunciation}</p>
          )}
          {nameInfo.notes && (
            <p className="text-sm italic mt-2">Note: {nameInfo.notes}</p>
          )}
        </div>
      ))}

    <pre className={` text-center text-sm flex flex-col font-mono mt-5 ${
        darkMode ? "text-white" : "text-[#1c2628]"
      }`}>
      {" "}
      All Rights Reserved{" "}
      <a
        className={` flex m-2 mx-auto mb-6 ${
          darkMode
          ? "text-[#94cf41]" 
          : "text-red-600"
        }`}
        href="https://github.com/NP5555"
      >
        {" "}
        GitHub <img src={img} className="h-5" alt="" />
      </a>{" "}

    </pre>

  </div>
</div>

  );
};

export default Dictionary;
