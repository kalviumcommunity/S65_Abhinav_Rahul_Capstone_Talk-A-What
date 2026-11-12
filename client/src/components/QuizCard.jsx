
function QuizCard({ title, questions, difficulty, category }) {
  return (
    <article className="quiz-card">
      <div className="quiz-icon">🧠</div>

      <span className="quiz-category">{category}</span>

      <h3>{title}</h3>

      <p>
        Test your English knowledge with this interactive quiz.
      </p>

      <div className="quiz-details">
        <span>📝 {questions} Questions</span>
        <span>⭐ {difficulty}</span>
      </div>

      <button type="button" className="quiz-button">
        Take Quiz →
      </button>
    </article>
  )
}

export default QuizCard
