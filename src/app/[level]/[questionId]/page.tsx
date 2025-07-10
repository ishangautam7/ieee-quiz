// app/[level]/[questionId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { quizLevels } from '../../quiz-data';
import { ChevronRight, Home, MessageCircle, Target, CheckCircle, XCircle } from 'lucide-react';

export default function QuestionPage() {
  const router = useRouter();
  const params = useParams();
  const levelId = params.level as string;
  const questionId = parseInt(params.questionId as string);
  const selectedLevel = quizLevels.find((level) => level.id === levelId);
  const currentQuestion = selectedLevel?.questions.find((q) => q.id === questionId);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Mark the question as viewed immediately when the page loads
    const markQuestionAsViewed = () => {
      const saved = localStorage.getItem('viewedQuestions');
      let viewedQuestions: Record<string, number[]> = {};
      
      if (saved) {
        try {
          viewedQuestions = JSON.parse(saved);
        } catch (error) {
          console.error('Error loading viewed questions:', error);
        }
      }

      if (!viewedQuestions[levelId]) {
        viewedQuestions[levelId] = [];
      }

      if (!viewedQuestions[levelId].includes(questionId)) {
        viewedQuestions[levelId].push(questionId);
        localStorage.setItem('viewedQuestions', JSON.stringify(viewedQuestions));
      }
    };

    markQuestionAsViewed();
  }, [levelId, questionId]);

  const handleOptionSelect = (optionId: string) => {
    if (!showResult) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption) {
      setShowResult(true);
    }
  };

  const handleBackToLevel = () => {
    router.push(`/${levelId}`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleNextQuestion = () => {
    const nextQuestionId = questionId < 20 ? questionId + 1 : 1;
    router.push(`/${levelId}/${nextQuestionId}`);
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  if (!selectedLevel || !currentQuestion) {
    return <div className="text-white text-center mt-20">Question not found</div>;
  }

  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBackToLevel}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <ChevronRight className="w-5 h-5 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Questions
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{selectedLevel.title}</h2>
            <p className="text-gray-300">Question {questionId} of 20</p>
          </div>
          <button
            onClick={handleBackToHome}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <Home className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Home
          </button>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedLevel.color} flex items-center justify-center text-2xl font-bold text-white mr-4`}
                >
                  Q{questionId}
                </div>
                <div>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${selectedLevel.color} text-white mb-2`}
                  >
                    Multiple Choice
                  </span>
                  <h3 className="text-xl font-semibold text-gray-300">Select the correct answer</h3>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Question
              </h4>
              <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
                <p className="text-xl text-white leading-relaxed">{currentQuestion.question}</p>
              </div>
            </div>

            {/* Options */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-purple-400 mb-4">Options</h4>
              <div className="space-y-4">
                {currentQuestion.options.map((option) => {
                  let optionClass = "bg-slate-700 hover:bg-slate-600 border-slate-600";
                  
                  if (showResult) {
                    if (option.id === currentQuestion.correctAnswer) {
                      optionClass = "bg-green-600 border-green-500";
                    } else if (option.id === selectedOption && option.id !== currentQuestion.correctAnswer) {
                      optionClass = "bg-red-600 border-red-500";
                    } else {
                      optionClass = "bg-slate-700 border-slate-600";
                    }
                  } else if (selectedOption === option.id) {
                    optionClass = "bg-blue-600 border-blue-500";
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${optionClass}`}
                      disabled={showResult}
                    >
                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold mr-4">
                          {option.id.toUpperCase()}
                        </span>
                        <span className="text-white text-lg">{option.text}</span>
                        {showResult && option.id === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-6 h-6 text-white ml-auto" />
                        )}
                        {showResult && option.id === selectedOption && option.id !== currentQuestion.correctAnswer && (
                          <XCircle className="w-6 h-6 text-white ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button or Result */}
            {!showResult ? (
              <div className="mb-8 text-center">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOption}
                  className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    selectedOption
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="mb-8">
                {/* Result */}
                <div className={`p-6 rounded-2xl mb-6 ${isCorrect ? 'bg-green-600' : 'bg-red-600'}`}>
                  <div className="flex items-center mb-4">
                    {isCorrect ? (
                      <CheckCircle className="w-8 h-8 text-white mr-3" />
                    ) : (
                      <XCircle className="w-8 h-8 text-white mr-3" />
                    )}
                    <h4 className="text-2xl font-bold text-white">
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h4>
                  </div>
                  {!isCorrect && (
                    <p className="text-white text-lg">
                      The correct answer is: <strong>{currentQuestion.options.find(opt => opt.id === currentQuestion.correctAnswer)?.text}</strong>
                    </p>
                  )}
                </div>

                {/* Explanation */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Explanation
                  </h4>
                  <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl p-6 border border-slate-500">
                    <p className="text-lg text-gray-100 leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-center space-x-4">
              {showResult ? (
                <>
                  <button
                    onClick={handleTryAgain}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Next Question
                  </button>
                </>
              ) : (
                <button
                  onClick={handleBackToLevel}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Back to Questions
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}