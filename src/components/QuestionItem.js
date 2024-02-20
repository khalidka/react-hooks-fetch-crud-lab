import React from "react";

function QuestionItem({ question, handleUpdateCorrectIndex, handleDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleUpdate = (event) => {

    const newCorrectIndex = parseInt(event.target.value);
    handleUpdateCorrectIndex(id, newCorrectIndex);
    console.log(handleUpdateCorrectIndex)
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>{options}</select>
      </label>
      <button onClick={() =>handleDeleteQuestion(question.id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
