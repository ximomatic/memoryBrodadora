'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/lib/game-utils';

interface MemoryCardProps {
  card: Card;
  onClick: () => void;
  disabled: boolean;
}

export default function MemoryCard({ card, onClick, disabled }: MemoryCardProps) {
  const isFlipped = card?.isFlipped ?? false;
  const isMatched = card?.isMatched ?? false;
  const imageIndex = card?.imageIndex ?? 1;

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={() => {
        if (!disabled && !isFlipped && !isMatched) {
          onClick?.();
        }
      }}
      whileHover={!isFlipped && !isMatched ? { scale: 1.05 } : {}}
      whileTap={!isFlipped && !isMatched ? { scale: 0.95 } : {}}
    >
      <motion.div
        className="relative w-full aspect-square"
        initial={false}
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Reverso - Logo */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-200 via-blue-200 to-purple-200 shadow-lg flex items-center justify-center p-4"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/logo.png"
              alt="La Brodadora Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 25vw, 15vw"
            />
          </div>
        </div>

        {/* Anverso - Producto */}
        <div
          className="absolute inset-0 rounded-xl bg-white shadow-lg overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="relative w-full h-full p-2">
            <Image
              src={`/images/prod${String(imageIndex).padStart(5, '0')}.jpg`}
              alt={`Producto ${imageIndex}`}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 25vw, 15vw"
            />
          </div>
        </div>
      </motion.div>

      {/* Efecto de éxito cuando se encuentra la pareja */}
      {isMatched && (
        <motion.div
          className="absolute inset-0 bg-green-400/30 rounded-xl pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1] }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
}
