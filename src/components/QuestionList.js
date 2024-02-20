import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        return response.json();
      })
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []); 

  const handleUpdateCorrectIndex = (id, correctIndex) =>{
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: correctIndex,
      }),
    })
    const updatedQuestions = questions.map((question) =>
        question.id === id ? { ...question, correctIndex: correctIndex } : question
      );
      setQuestions(updatedQuestions);
  }
  const handleDeleteQuestion = (id)=>{
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* Display QuestionItem components here after fetching */}
        {questions.map((question, index) => (
          <QuestionItem key={index} question={question} handleUpdateCorrectIndex={handleUpdateCorrectIndex} handleDeleteQuestion={handleDeleteQuestion} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
