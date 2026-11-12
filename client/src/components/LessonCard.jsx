
function LessonCard({ title, level, duration, description, icon }) {
  return (
    <article className="lesson-card">
      <div className="lesson-icon">{icon}</div>

      <span className="lesson-level">{level}</span>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="lesson-footer">
        <span>⏱ {duration}</span>
        <button type="button" className="lesson-button">
          Start Lesson →
        </button>
      </div>
    </article>
  )
}

export default LessonCard
