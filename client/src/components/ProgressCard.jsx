
function ProgressCard({ completedLessons, totalLessons, streak }) {
  const progress =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0

  return (
    <section className="progress-card" id="progress">
      <div className="progress-header">
        <div>
          <p className="section-label">YOUR LEARNING JOURNEY</p>
          <h2>Learning Progress</h2>
        </div>

        <span className="streak-badge">🔥 {streak} Day Streak</span>
      </div>

      <div className="progress-stats">
        <div>
          <h3>{completedLessons}/{totalLessons}</h3>
          <p>Lessons Completed</p>
        </div>

        <div>
          <h3>{progress}%</h3>
          <p>Overall Progress</p>
        </div>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Learning progress"
      >
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </section>
  )
}

export default ProgressCard
