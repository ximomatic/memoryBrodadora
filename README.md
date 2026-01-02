# 🎮 Memory Game - La Brodadora

Juego de memoria interactivo creado para La Brodadora, tienda de productos personalizados para bebés y niños.

## 🌟 Características

- 🎯 Selección de dificultad: 2 a 20 parejas
- ⏱️ Temporizador en tiempo real
- 🏆 Sistema de puntuación basado en tiempo y dificultad
- 📊 Ranking de mejores puntuaciones (guardado localmente)
- 🎨 Animaciones fluidas con Framer Motion
- 📱 Diseño totalmente responsive
- 🎨 Estética infantil con colores pasteles

## 🚀 Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **LocalStorage** - Persistencia de datos

## 📦 Instalación

```bash
# Instalar dependencias
yarn install

# Ejecutar en desarrollo
yarn dev

# Construir para producción
yarn build

# Iniciar en producción
yarn start
```

## 🎯 Cómo Jugar

1. Ingresa tu nickname
2. Selecciona el número de parejas (2-20)
3. Encuentra todas las parejas volteando las cartas
4. ¡Compite por el mejor puntaje!

## 📊 Sistema de Puntuación

- **Fórmula:** (Número de parejas × 100) - Segundos transcurridos
- **Puntuación mínima:** 0 puntos

## 🏗️ Estructura del Proyecto

```
├── app/
│   ├── components/       # Componentes del juego
│   │   ├── memory-card.tsx
│   │   ├── game-board.tsx
│   │   └── ranking-table.tsx
│   ├── game/            # Página del juego
│   ├── page.tsx         # Página principal
│   └── globals.css      # Estilos globales
├── lib/
│   ├── game-utils.ts    # Lógica del juego
│   └── types.ts         # Tipos TypeScript
└── public/
    └── images/          # Imágenes del juego (logo + productos)
```

## 📝 Licencia

Creado para La Brodadora © 2025
