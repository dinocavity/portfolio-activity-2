import { useState } from "react";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";

function App() {
  const [showHero, setShowHero] = useState(true);
  const [showSections, setShowSections] = useState(false);

  return (
    <div>
      {showHero && (
        <Hero
          setShowHero={setShowHero}
          setShowSections={setShowSections}
        />
      )}

      {showSections && (
        <>
          <AboutMe setShowHero={setShowHero} setShowSections={setShowSections} />
          {/* Future Sections Can Be Added Here */}
        </>
      )}
    </div>
  );
}

export default App;
