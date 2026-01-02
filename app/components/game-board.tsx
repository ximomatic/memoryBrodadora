'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryCard from './memory-card';
import RankingTable from './ranking-table';
import {
  Card,
  generateCards,
  calculateScore,
  formatTime,
  saveScore,
  generateId,
} from '@/lib/game-utils';
import { Clock, Trophy, Home, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GameBoardProps {
  nickname: string;
  numPairs: number;
}

export default function GameBoard({ nickname, numPairs }: GameBoardProps) {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showRanking, setShowRanking] = useState(false);

  // Inicializar cartas
  useEffect(() => {
    const initialCards = generateCards(numPairs ?? 2);
    setCards(initialCards);
  }, [numPairs]);

  // Temporizador
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && !gameCompleted) {
      interval = setInterval(() => {
        setTime((prev) => (prev ?? 0) + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, gameCompleted]);

  // Verificar si el juego ha terminado
  useEffect(() => {
    const allMatched = cards?.every((card) => card?.isMatched ?? false) ?? false;
    const hasCards = (cards?.length ?? 0) > 0;

    if (allMatched && hasCards && !gameCompleted) {
      setGameCompleted(true);
      setIsPlaying(false);

      const score = calculateScore(numPairs ?? 0, time ?? 0);
      setFinalScore(score);

      saveScore({
        id: generateId(),
        nickname: nickname ?? 'Jugador',
        pairs: numPairs ?? 0,
        time: time ?? 0,
        score,
        date: new Date().toISOString(),
      });
    }
  }, [cards, gameCompleted, numPairs, time, nickname]);

  // Lógica de volteo de cartas
  useEffect(() => {
    const flipped = flippedCards ?? [];
    if ((flipped?.length ?? 0) === 2) {
      const [first, second] = flipped;
      const firstImage = first?.imageIndex ?? 0;
      const secondImage = second?.imageIndex ?? 0;

      if (firstImage === secondImage) {
        // Pareja encontrada
        setCards((prev) =>
          (prev ?? []).map((card) =>
            (card?.id === first?.id || card?.id === second?.id)
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);
      } else {
        // No coinciden, voltear de nuevo después de 1 segundo
        setTimeout(() => {
          setCards((prev) =>
            (prev ?? []).map((card) =>
              (card?.id === first?.id || card?.id === second?.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  const handleCardClick = useCallback(
    (card: Card) => {
      const flipped = flippedCards ?? [];
      if ((flipped?.length ?? 0) >= 2) return;

      setCards((prev) =>
        (prev ?? []).map((c) =>
          c?.id === card?.id ? { ...c, isFlipped: true } : c
        )
      );

      const newFlipped = [...flipped, card];
      setFlippedCards(newFlipped);

      if ((newFlipped?.length ?? 0) === 2) {
        setMoves((prev) => (prev ?? 0) + 1);
      }
    },
    [flippedCards]
  );

  const handlePlayAgain = () => {
    router.push('/');
  };

  const getGridColumns = () => {
    const pairs = numPairs ?? 2;
    if (pairs <= 4) return 'grid-cols-2 sm:grid-cols-4';
    if (pairs <= 6) return 'grid-cols-3 sm:grid-cols-4';
    if (pairs <= 12) return 'grid-cols-4 sm:grid-cols-6';
    return 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8';
  };

  if (showRanking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
          >
            <button
              onClick={() => setShowRanking(false)}
              className="mb-4 flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Volver
            </button>
            <RankingTable />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Hola, {nickname ?? 'Jugador'}!
                </h1>
                <p className="text-sm text-gray-600">
                  {numPairs ?? 0} parejas | {moves ?? 0} movimientos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-mono text-lg font-semibold text-blue-800">
                  {formatTime(time ?? 0)}
                </span>
              </div>
              <button
                onClick={handlePlayAgain}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Volver al inicio"
              >
                <Home className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Grid de cartas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`grid ${getGridColumns()} gap-3 sm:gap-4 mb-6`}
        >
          {(cards ?? []).map((card) => (
            <MemoryCard
              key={card?.id}
              card={card}
              onClick={() => handleCardClick(card)}
              disabled={(flippedCards?.length ?? 0) >= 2}
            />
          ))}
        </motion.div>

        {/* Pantalla de finalización */}
        <AnimatePresence>
          {gameCompleted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  // Cerrar modal si se hace clic fuera
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    ¡Felicidades!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Has completado el juego
                  </p>

                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tiempo</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatTime(time ?? 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Movimientos</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {moves ?? 0}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Puntuación</p>
                      <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                        {finalScore ?? 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handlePlayAgain}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Jugar de nuevo
                    </button>
                    <button
                      onClick={() => setShowRanking(true)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Trophy className="w-5 h-5" />
                      Ranking
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
