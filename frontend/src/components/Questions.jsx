import React, { useState, useEffect } from 'react';
import { getQuestions } from '../grpcClient';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [pageSize] = useState(10); 

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

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">

        <input
          type="text"
          placeholder="Search questions..."
          value={query}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 mb-6"
        />
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="border p-4 rounded-lg shadow-md bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{question.title}</h3>
              {question.solution && (
                <p className="text-gray-600 mb-2">
                  <strong>Solution:</strong> {question.solution}
                </p>
              )}

              {question.blocks?.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold">Blocks:</p>
                  <ul className="list-disc pl-5">
                    {question.blocks.map((block, index) => (
                      <li key={index} className="text-gray-700">
                        {block.text} {block.isAnswer && <span className="text-green-600">(Answer)</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {question.options?.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold">Options:</p>
                  <ul className="list-disc pl-5">
                    {question.options.map((option, index) => (
                      <li key={index} className={`text-gray-700 ${option.isCorrectAnswer ? 'font-bold text-green-600' : ''}`}>
                        {option.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => handlePageChange(page > 1 ? page - 1 : page)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg text-white ${page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {Math.ceil(totalQuestions / pageSize)}
          </span>
          <button
            onClick={() => handlePageChange(page < Math.ceil(totalQuestions / pageSize) ? page + 1 : page)}
            disabled={page === Math.ceil(totalQuestions / pageSize)}
            className={`px-4 py-2 rounded-lg text-white ${page === Math.ceil(totalQuestions / pageSize) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
