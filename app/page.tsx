'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, Play, Trophy } from 'lucide-react';
import Image from 'next/image';
import RankingTable from './components/ranking-table';

export default function HomePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [numPairs, setNumPairs] = useState(6);
  const [showRanking, setShowRanking] = useState(false);
  const [error, setError] = useState('');

  const handleStartGame = () => {
    const trimmedNickname = nickname?.trim() ?? '';
    if (!trimmedNickname || trimmedNickname.length === 0) {
      setError('Por favor, ingresa tu nombre');
      return;
    }

    const pairs = numPairs ?? 2;
    if (pairs < 2 || pairs > 20) {
      setError('El número de parejas debe estar entre 2 y 20');
      return;
    }

    // Guardar en sessionStorage para pasar a la siguiente página
    if (typeof window !== 'undefined') {
      sessionStorage?.setItem('playerNickname', trimmedNickname);
      sessionStorage?.setItem('numPairs', String(pairs));
    }

    router.push('/game');
  };

  if (showRanking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full"
        >
          <button
            onClick={() => setShowRanking(false)}
            className="mb-6 text-pink-600 hover:text-pink-700 font-semibold"
          >
            ← Volver
          </button>
          <RankingTable />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-32 h-32 mx-auto mb-6 relative"
        >
          <Image
            src="/images/logo.png"
            alt="La Brodadora Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-2">
            Memory Game
          </h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            La Brodadora
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Input de nickname */}
          <div>
            <label htmlFor="nickname" className="block text-sm font-semibold text-gray-700 mb-2">
              Tu nombre
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e?.target?.value ?? '');
                setError('');
              }}
              placeholder="Ingresa tu nombre"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors text-gray-800"
              maxLength={20}
            />
          </div>

          {/* Selector de parejas */}
          <div>
            <label htmlFor="pairs" className="block text-sm font-semibold text-gray-700 mb-2">
              Número de parejas: {numPairs}
            </label>
            <input
              id="pairs"
              type="range"
              min="2"
              max="20"
              value={numPairs}
              onChange={(e) => {
                const value = parseInt(e?.target?.value ?? '6', 10);
                setNumPairs(value);
                setError('');
              }}
              className="w-full h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2 (Fácil)</span>
              <span>11 (Medio)</span>
              <span>20 (Difícil)</span>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          {/* Botones */}
          <div className="space-y-3">
            <motion.button
              onClick={handleStartGame}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-6 h-6" />
              Comenzar a jugar
            </motion.button>

            <motion.button
              onClick={() => setShowRanking(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Ver Ranking
            </motion.button>
          </div>
        </motion.div>

        {/* Instrucciones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl"
        >
          <h3 className="font-semibold text-gray-800 mb-2 text-center">¿Cómo jugar?</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Voltea dos cartas para encontrar parejas</li>
            <li>• Completa todas las parejas en el menor tiempo</li>
            <li>• ¡Tu puntuación depende del tiempo!</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
