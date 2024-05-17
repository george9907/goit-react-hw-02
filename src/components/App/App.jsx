import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification"

export default function App() {
  const startFeedback = { good: 0, neutral: 0, bad: 0 };

  const [state, setState] = useState(() => {
    const storageFeedback = window.localStorage.getItem("saveFeedback");
    if (storageFeedback !== null) {
      return JSON.parse(storageFeedback)
    } 
      return startFeedback;
  });

  const resetFeedback = () => {
    setState(startFeedback);
  };
  useEffect(() => {
    window.localStorage.setItem("saveFeedback", JSON.stringify(state));
  }, [state]);

  let totalFeedback = 0;

  const updateFeedback = (feedbackType) => {
    setState({
      ...state,
      [feedbackType]: state[feedbackType] + 1,
    });
  };

  for (let i of Object.values(state)) {
    totalFeedback += i;
  }
  const positiveFeedback = Math.round((state.good / totalFeedback) * 100);

  return (
    <>
      <Description/>
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback feedback={state} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} />
      ) : (
        <Notification/>
      )}
    </>
  );
}