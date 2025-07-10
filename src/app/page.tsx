// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { quizLevels } from './quiz-data';
import { Trophy } from 'lucide-react';

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
          </p>
        </div>

        {/* Main Quiz Card */}
        <button>
        </button>

        {/* Features Section */}
        {/* Question Numbers Grid */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Choose a Question (1-20)</h3>
          <div className="grid grid-cols-5 gap-6">
            {quizLevels[0].questions.map((question) => {
              const isViewed = viewedCount > 0 && localStorage.getItem('viewedQuestions') && 
                JSON.parse(localStorage.getItem('viewedQuestions') || '{}')?.cybersecurity?.includes(question.id);
              return (
                <button
                  key={question.id}
                  onClick={() => router.push(`/cybersecurity/${question.id}`)}
                  className={`aspect-square rounded-3xl text-3xl font-bold transition-all duration-300 transform hover:scale-110 shadow-2xl ${
                    isViewed
                      ? 'bg-red-600 text-white border-4 border-red-400 shadow-red-500/50'
                      : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-lg'
                  }`}
                >
                  {question.id}
                </button>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-400">
              <span className="inline-block w-4 h-4 bg-red-600 rounded mr-2"></span>
              Red indicates questions that have been attempted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}