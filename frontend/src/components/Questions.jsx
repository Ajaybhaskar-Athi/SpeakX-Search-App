import React, { useState, useEffect } from 'react';
import { getQuestions } from '../grpcClient';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [pageSize] = useState(10);  // Number of questions per page

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions(query, page, pageSize);
        setQuestions(response.getQuestionsList());
        setTotalQuestions(response.getTotalQuestions());
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, [query, page, pageSize]);
  console.log(questions);

  return (
    <div>
      <input
        type="text"
        placeholder="Search questions..."
        value={query}
        onChange={handleSearchChange}
      />
      <div>
        {questions.map((question) => (
          <div key={question.id}>
            <h3>{question.title}</h3>
            <p>{question.solution}</p>
            {/* Display blocks or options depending on question type */}
          </div>
        ))}
      </div>
      <div>
        {/* Pagination Controls */}
        <button
          onClick={() => handlePageChange(page > 1 ? page - 1 : page)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {Math.ceil(totalQuestions / pageSize)}</span>
        <button
          onClick={() => handlePageChange(page < Math.ceil(totalQuestions / pageSize) ? page + 1 : page)}
          disabled={page === Math.ceil(totalQuestions / pageSize)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Questions;
