// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { quizLevels } from './quiz-data';
import { Trophy, Star, User, Target, MessageCircle, RotateCcw } from 'lucide-react';

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

  const handleLevelSelect = (levelId: string) => {
    router.push(`/${levelId}`);
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
              <p className="text-2xl text-blue-300 font-semibold">Cybersecurity Excellence</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Interactive Q&A platform for cybersecurity education. Select a difficulty level and choose specific 
            questions for targeted learning and assessment.
          </p>
          
          {/* Progress and Reset Section */}
          <div className="mt-8 flex flex-col items-center space-y-4">
            {viewedCount > 0 && (
              <div className="bg-slate-800 bg-opacity-50 px-6 py-3 rounded-xl">
                <p className="text-blue-300 font-semibold">
                  Questions Viewed: <span className="text-white">{viewedCount}</span> / 15
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

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {quizLevels.map((level, index) => {
            const IconComponent = level.icon;
            const difficultyColors = {
              Easy: 'text-green-400',
              Medium: 'text-yellow-400',
              Hard: 'text-red-400',
            };

            return (
              <div
                key={level.id}
                onClick={() => handleLevelSelect(level.id)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${level.color} p-1 rounded-3xl shadow-2xl`}>
                  <div className="bg-slate-800 p-8 rounded-2xl h-full relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-4 right-4 text-6xl font-bold text-white">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <IconComponent className="w-12 h-12 text-white" />
                        <div className="flex items-center space-x-2">
                          {[...Array(index + 1)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2">{level.title}</h3>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            difficultyColors[level.difficulty as keyof typeof difficultyColors]
                          } bg-gray-700`}
                        >
                          {level.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">{level.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-blue-400">
                          <span className="font-semibold text-lg">5 Questions</span>
                          <p className="text-xs text-gray-400">Q&A Format</p>
                        </div>
                        <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                          <span className="mr-2">Select Level</span>
                          <level.icon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl">
              <User className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Interactive Q&A</h4>
              <p className="text-gray-400 text-sm">Perfect for classroom discussions and interviews</p>
            </div>
            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl">
              <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Targeted Learning</h4>
              <p className="text-gray-400 text-sm">Select specific questions for focused assessment</p>
            </div>
            <div className="bg-slate-800 bg-opacity-50 p-6 rounded-xl">
              <MessageCircle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Expert Content</h4>
              <p className="text-gray-400 text-sm">Comprehensive answers from cybersecurity professionals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}