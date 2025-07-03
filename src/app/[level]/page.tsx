// app/[level]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { quizLevels } from '../quiz-data';
import { Home } from 'lucide-react';

export default function LevelPage() {
  const router = useRouter();
  const params = useParams();
  const levelId = params.level as string;
  const selectedLevel = quizLevels.find((level) => level.id === levelId);

  const [viewedQuestions, setViewedQuestions] = useState<Record<string, Set<number>>>({});

  useEffect(() => {
    // Load existing viewed questions from localStorage
    const loadViewedQuestions = () => {
      const saved = localStorage.getItem('viewedQuestions');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const converted: Record<string, Set<number>> = {};
          Object.keys(parsed).forEach((key) => {
            converted[key] = new Set(parsed[key]);
          });
          setViewedQuestions(converted);
        } catch (error) {
          console.error('Error loading viewed questions:', error);
        }
      }
    };

    loadViewedQuestions();

    // Listen for storage changes to update when returning from question pages
    const handleStorageChange = () => {
      loadViewedQuestions();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for focus events to catch localStorage changes from same tab
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  // Reload viewed questions when returning to this page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const saved = localStorage.getItem('viewedQuestions');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const converted: Record<string, Set<number>> = {};
            Object.keys(parsed).forEach((key) => {
              converted[key] = new Set(parsed[key]);
            });
            setViewedQuestions(converted);
          } catch (error) {
            console.error('Error loading viewed questions:', error);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleQuestionSelect = (questionId: number) => {
    router.push(`/${levelId}/${questionId}`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (!selectedLevel) {
    return <div className="text-white text-center mt-20">Level not found</div>;
  }

  const levelViewedQuestions = viewedQuestions[selectedLevel.id] || new Set();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBackToHome}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <Home className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">{selectedLevel.title}</h2>
            <p className="text-gray-300 text-lg">Select a question number to view</p>
          </div>
          <div className="w-24"></div>
        </div>

        {/* Level Info */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className={`bg-gradient-to-r ${selectedLevel.color} p-1 rounded-3xl shadow-2xl`}>
            <div className="bg-slate-800 p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <selectedLevel.icon className="w-12 h-12 text-white mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedLevel.title}</h3>
                    <p className="text-gray-300">{selectedLevel.description}</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-slate-700 rounded-full text-white font-semibold">
                  {selectedLevel.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Numbers Grid */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Choose a Question</h3>
          <div className="grid grid-cols-5 gap-6">
            {selectedLevel.questions.map((question) => {
              const isViewed = levelViewedQuestions.has(question.id);
              return (
                <button
                  key={question.id}
                  onClick={() => handleQuestionSelect(question.id)}
                  className={`aspect-square rounded-3xl text-3xl font-bold transition-all duration-300 transform hover:scale-110 shadow-2xl ${
                    isViewed
                      ? 'bg-red-600 text-white border-4 border-red-400 shadow-red-500/50'
                      : `bg-gradient-to-br ${selectedLevel.color} text-white hover:shadow-lg`
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
              Red indicates questions that have been viewed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}