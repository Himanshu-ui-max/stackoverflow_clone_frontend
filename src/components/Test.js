import React from 'react';

const questions = [
  { id: 1, title: 'What is React?', content: 'React is a JavaScript library for building user interfaces.' },
  { id: 2, title: 'How to use hooks in React?', content: 'Hooks are functions that let you use state and other React features.' },
  { id: 3, title: 'What is Tailwind CSS?', content: 'Tailwind CSS is a utility-first CSS framework.' },
];

const Test = () => {
  return (
    <>
    <div className="container mx-auto my-6">
      <h2 className="text-xl font-bold mb-4">Recent Questions</h2>
      <div className="space-y-4">
        {questions.map(question => (
          <div key={question.id} className="p-4 border rounded shadow-sm hover:bg-gray-50">
            <h3 className="text-lg font-semibold">{question.title}</h3>
            <p>{question.content}</p>
          </div>
        ))}
      </div>
    </div>
    <footer className="bg-blue-600 text-white p-4 mt-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Q&A Website. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}

export default Test;
