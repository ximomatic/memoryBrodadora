'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getTopScores, GameScore, formatTime } from '@/lib/game-utils';
import { Trophy, Medal, Award } from 'lucide-react';

export default function RankingTable() {
  const [scores, setScores] = useState<GameScore[]>([]);

  useEffect(() => {
    const topScores = getTopScores(10);
    setScores(topScores);
  }, []);

  const getMedalIcon = (position: number) => {
    if (position === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (position === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (position === 3) return <Award className="w-6 h-6 text-orange-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{position}</span>;
  };

  const getMedalBg = (position: number) => {
    if (position === 1) return 'from-yellow-100 to-yellow-50';
    if (position === 2) return 'from-gray-100 to-gray-50';
    if (position === 3) return 'from-orange-100 to-orange-50';
    return 'from-white to-gray-50';
  };

  if ((scores?.length ?? 0) === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Aún no hay puntuaciones registradas</p>
        <p className="text-gray-400 text-sm mt-2">¡Sé el primero en jugar!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          Ranking
        </h2>
      </div>

      <div className="space-y-3">
        {(scores ?? []).map((score, index) => {
          const position = index + 1;
          return (
            <motion.div
              key={score?.id ?? `score-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-gradient-to-r ${getMedalBg(position)} rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {getMedalIcon(position)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 truncate text-lg">
                      {score?.nickname ?? 'Jugador'}
                    </h3>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 flex-shrink-0">
                      {score?.score ?? 0}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {score?.pairs ?? 0} parejas
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {formatTime(score?.time ?? 0)}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {score?.date ? new Date(score.date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      }) : ''}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
