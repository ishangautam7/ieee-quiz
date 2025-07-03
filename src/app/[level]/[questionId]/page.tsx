// app/[level]/[questionId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { quizLevels } from '../../quiz-data';
import { ChevronRight, Home, MessageCircle, Target, Eye } from 'lucide-react';

export default function QuestionPage() {
  const router = useRouter();
  const params = useParams();
  const levelId = params.level as string;
  const questionId = parseInt(params.questionId as string);
  const selectedLevel = quizLevels.find((level) => level.id === levelId);
  const currentQuestion = selectedLevel?.questions.find((q) => q.id === questionId);

  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, Set<number>>>({});

  useEffect(() => {
    const saved = localStorage.getItem('answeredQuestions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const converted: Record<string, Set<number>> = {};
        Object.keys(parsed).forEach((key) => {
          converted[key] = new Set(parsed[key]);
        });
        setAnsweredQuestions(converted);
      } catch (error) {
        console.error('Error loading answered questions:', error);
      }
    }

    // Mark the current question as answered
    setAnsweredQuestions((prev) => ({
      ...prev,
      [levelId]: new Set([...(prev[levelId] || []), questionId]),
    }));
  }, [levelId, questionId]);

  useEffect(() => {
    const toSave: Record<string, number[]> = {};
    Object.keys(answeredQuestions).forEach((key) => {
      toSave[key] = Array.from(answeredQuestions[key]);
    });
    localStorage.setItem('answeredQuestions', JSON.stringify(toSave));
  }, [answeredQuestions]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleBackToLevel = () => {
    router.push(`/${levelId}`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (!selectedLevel || !currentQuestion) {
    return <div className="text-white text-center mt-20">Question not found</div>;
  }

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
            <p className="text-gray-300">Question {questionId}</p>
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
        <div className="max-w-5xl mx-auto">
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
                    {selectedLevel.difficulty} Level
                  </span>
                  <h3 className="text-xl font-semibold text-gray-300">Question & Answer</h3>
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

            {/* Show Answer Button or Answer */}
            {!showAnswer ? (
              <div className="mb-8 text-center">
                <button
                  onClick={handleShowAnswer}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Show Answer
                </button>
              </div>
            ) : (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Answer
                </h4>
                <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl p-6 border border-slate-500">
                  <p className="text-lg text-gray-100 leading-relaxed">{currentQuestion.answer}</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleBackToLevel}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Select Another Question
              </button>
              <button
                onClick={handleBackToHome}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}