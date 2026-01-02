'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GameBoard from '../components/game-board';

export default function GamePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);
  const [numPairs, setNumPairs] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNickname = sessionStorage?.getItem('playerNickname') ?? null;
      const savedPairs = sessionStorage?.getItem('numPairs') ?? null;

      if (!savedNickname || !savedPairs) {
        router.push('/');
        return;
      }

      setNickname(savedNickname);
      setNumPairs(parseInt(savedPairs, 10));
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading || !nickname || !numPairs) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando juego...</p>
        </div>
      </div>
    );
  }

  return <GameBoard nickname={nickname} numPairs={numPairs} />;
}
