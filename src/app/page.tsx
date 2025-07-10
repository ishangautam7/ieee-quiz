// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { quizLevels } from './quiz-data';
import { Trophy, MessageCircle, RotateCcw, BookOpen, Target, Award } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [viewedCount, setViewedCount] = useState(0);

  useEffect(() => {
    // Count total viewed questions for display
    const saved = localStorage.getItem('viewedQuestions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        let total = 0;
        Object.values(parsed).forEach((questions: any) => {
          total += questions.length;
        });
        setViewedCount(total);
      } catch (error) {
        console.error('Error loading viewed questions:', error);
      }
    }
  }, []);

  const handleStartQuiz = () => {
    router.push('/cybersecurity');
  };

  const handleResetProgress = () => {
    localStorage.removeItem('viewedQuestions');
    setViewedCount(0);
    // Show a brief confirmation
    const button = document.getElementById('reset-button');
    if (button) {
      button.textContent = 'Reset Complete!';
      setTimeout(() => {
        button.textContent = 'Reset Progress';
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl mr-4">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-6xl font-bold text-white mb-2">IEEE MasterClass</h1>
              <p className="text-2xl text-blue-300 font-semibold">Cybersecurity MCQ Quiz</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Test your cybersecurity knowledge with 20 multiple choice questions. 
            Select any question number to start, and track your progress as you go.
          </p>
          
          {/* Progress and Reset Section */}
          <div className="mt-8 flex flex-col items-center space-y-4">
            {viewedCount > 0 && (
              <div className="bg-slate-800 bg-opacity-50 px-6 py-3 rounded-xl">
                <p className="text-blue-300 font-semibold">
                  Questions Attempted: <span className="text-white">{viewedCount}</span> / 20
                </p>
              </div>
            )}
            <button
              id="reset-button"
              onClick={handleResetProgress}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset Progress
            </button>
          </div>
        </div>

        {/* Main Quiz Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-3xl shadow-2xl">
            <div className="bg-slate-800 p-8 rounded-2xl">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Cybersecurity MCQ Quiz</h2>
                <p className="text-gray-300 text-lg mb-8">
                  20 multiple choice questions covering fundamental to advanced cybersecurity concepts
                </p>
                
                {/* Quiz Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-700 p-4 rounded-xl">
                    <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">20 Questions</p>
                    <p className="text-gray-400 text-sm">Multiple Choice</p>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-xl">
                    <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Select Any Question</p>
                    <p className="text-gray-400 text-sm">Non-linear Format</p>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-xl">
                    <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-white font-semibold">Instant Feedback</p>
                    <p className="text-gray-400 text-sm">Detailed Explanations</p>
                  </div>
                </div>

                <button
                  onClick={handleStartQuiz}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl">
              <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Multiple Choice Format</h4>
              <p className="text-gray-400 text-sm">Clear questions with four options each for easy assessment</p>
            </div>
            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Flexible Learning</h4>
              <p className="text-gray-400 text-sm">Choose any question number - no need to follow a sequence</p>
            </div>
            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Expert Content</h4>
              <p className="text-gray-400 text-sm">Comprehensive explanations for each correct answer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}