
import "./App.css"
import Navbar from "./components/NavbarTemp"
import HeroSection from "./components/HeroSection"
import LessonCard from "./components/LessonCard"
import ProgressCard from "./components/ProgressCard"
import QuizCard from "./components/QuizCard"
import Footer from "./components/Footer"

function App() {
  const lessons = [
    {
      id: 1,
      title: "Everyday Conversations",
      level: "Beginner",
      duration: "10 min",
      description: "Learn common English phrases used in daily conversations.",
      icon: "💬",
    },
    {
      id: 2,
      title: "English Grammar Basics",
      level: "Beginner",
      duration: "15 min",
      description: "Understand basic grammar rules and sentence formation.",
      icon: "📚",
    },
    {
      id: 3,
      title: "Vocabulary Builder",
      level: "Intermediate",
      duration: "12 min",
      description: "Improve your vocabulary with useful everyday words.",
      icon: "📝",
    },
  ]

  const quizzes = [
    {
      id: 1,
      title: "Grammar Challenge",
      questions: 10,
      difficulty: "Easy",
      category: "Grammar",
    },
    {
      id: 2,
      title: "Vocabulary Test",
      questions: 15,
      difficulty: "Medium",
      category: "Vocabulary",
    },
  ]

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        <section className="lessons-section" id="lessons">
          <div className="section-heading">
            <p className="section-label">START LEARNING</p>
            <h2>Explore Your Lessons</h2>
            <p>Choose a lesson and build your English skills.</p>
          </div>

          <div className="lesson-grid">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} {...lesson} />
            ))}
          </div>
        </section>

        <ProgressCard
          completedLessons={8}
          totalLessons={20}
          streak={5}
        />

        <section className="quizzes-section">
          <div className="section-heading">
            <p className="section-label">TEST YOUR KNOWLEDGE</p>
            <h2>Practice with Quizzes</h2>
            <p>Check what you have learned so far.</p>
          </div>

          <div className="quiz-grid">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} {...quiz} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
