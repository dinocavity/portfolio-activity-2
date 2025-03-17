const ScrollToTopButton = ({ setShowHero, setShowSections }) => {
    return (
      <button
        onClick={() => {
          setShowHero(true);
          setShowSections(false);
        }}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg"
      >
        Go Back to Top
      </button>
    );
  };
  
  export default ScrollToTopButton;
  