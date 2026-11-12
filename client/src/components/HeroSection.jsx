
function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <p className="hero-label">YOUR ENGLISH LEARNING JOURNEY</p>

        <h1>
          Speak English with
          <span> Confidence!</span>
        </h1>

        <p className="hero-description">
          Learn English through interactive lessons, fun quizzes,
          and daily practice. Take one step closer to fluency every day.
        </p>

        <a href="#lessons" className="hero-button">
          Explore Lessons →
        </a>
      </div>

      <div className="hero-illustration">
        <div className="hero-emoji">🗣️</div>
        <h3>Practice. Learn. Improve.</h3>
        <p>Your journey to better English starts here.</p>
      </div>
    </section>
  )
}

export default HeroSection
