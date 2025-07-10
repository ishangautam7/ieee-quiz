// app/[level]/[questionId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { quizLevels } from '../../quiz-data';
import { ChevronRight, Home, MessageCircle, Target, CheckCircle, XCircle, Edit3 } from 'lucide-react';

export default function QuestionPage() {
  const router = useRouter();
  const params = useParams();
  const levelId = params.level as string;
  const questionId = parseInt(params.questionId as string);
  const selectedLevel = quizLevels.find((level) => level.id === levelId);
  const currentQuestion = selectedLevel?.questions.find((q) => q.id === questionId);

  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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

  const checkAnswer = (answer: string): boolean => {
    if (!currentQuestion) return false;
    
    const normalizedAnswer = answer.toLowerCase().trim();
    const normalizedCorrect = currentQuestion.correctAnswer.toLowerCase().trim();
    
    // Check exact match first
    if (normalizedAnswer === normalizedCorrect) {
      return true;
    }
    
    // Check acceptable answers
    if (currentQuestion.acceptableAnswers) {
      return currentQuestion.acceptableAnswers.some(acceptable => 
        normalizedAnswer === acceptable.toLowerCase().trim() ||
        normalizedAnswer.includes(acceptable.toLowerCase().trim()) ||
        acceptable.toLowerCase().trim().includes(normalizedAnswer)
      );
    }
    
    // Check if the answer contains key words from the correct answer
    const correctWords = normalizedCorrect.split(/[\s,]+/).filter(word => word.length > 2);
    const answerWords = normalizedAnswer.split(/[\s,]+/).filter(word => word.length > 2);
    
    const matchingWords = correctWords.filter(word => 
      answerWords.some(answerWord => 
        answerWord.includes(word) || word.includes(answerWord)
      )
    );
    
    // Consider it correct if at least 60% of key words match
    return matchingWords.length >= Math.ceil(correctWords.length * 0.6);
  };

  const handleSubmitAnswer = () => {
    if (userAnswer.trim()) {
      const correct = checkAnswer(userAnswer);
      setIsCorrect(correct);
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
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  };

  if (!selectedLevel || !currentQuestion) {
    return <div className="text-white text-center mt-20">Question not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-24"></div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{selectedLevel.title}</h2>
            <p className="text-gray-300">Question {questionId} of 20</p>
          </div>
          <button
            onClick={handleBackToLevel}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <ChevronRight className="w-5 h-5 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back
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
                    Short Answer
                  </span>
                  <h3 className="text-xl font-semibold text-gray-300">Type your answer below</h3>
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

            {/* Answer Input */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                <Edit3 className="w-5 h-5 mr-2" />
                Your Answer
              </h4>
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-white text-lg min-h-[120px] resize-none ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-600 border-green-500'
                        : 'bg-red-600 border-red-500'
                      : 'bg-slate-700 border-slate-600 hover:border-slate-500 focus:border-blue-500 focus:outline-none'
                  }`}
                  rows={4}
                />
                {showResult && (
                  <div className="flex items-center">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400 mr-2" />
                    )}
                    <span className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button or Result */}
            {!showResult ? (
              <div className="mb-8 text-center">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim()}
                  className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    userAnswer.trim()
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="mb-8">
                {/* Correct Answer Display */}
                {!isCorrect && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-yellow-400 mb-4">Correct Answer:</h4>
                    <div className="bg-green-600 rounded-2xl p-6 border border-green-500">
                      <p className="text-white text-lg font-semibold">{currentQuestion.correctAnswer}</p>
                    </div>
                  </div>
                )}

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
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Next Question
                  </button>
                </>
              ) : (
                <button
                  onClick={handleBackToHome}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Back to Home
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}