
function Navbar() {
  return (
    <header className="navbar">
      <a href="/" className="navbar-brand">
        Talk-A-What<span>!</span>
      </a>

      <nav className="navbar-links">
        <a href="#home">Home</a>
        <a href="#lessons">Lessons</a>
        <a href="#progress">My Progress</a>
      </nav>

      <a href="#lessons" className="navbar-button">
        Start Learning
      </a>
    </header>
  )
}

export default Navbar
