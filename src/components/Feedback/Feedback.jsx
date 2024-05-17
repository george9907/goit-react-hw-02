import css from "./Feedback.module.css"

export default function Feedback({ feedback: { good, neutral, bad }, totalFeedback, positiveFeedback }) {
  return <ul className={css.container}>
      <li>good: {good}</li>
      <li>neutral: {neutral}</li>
      <li>bad: {bad}</li>
      <li>total: {totalFeedback}</li>
      <li>positive: {positiveFeedback} %</li>
    </ul>
}