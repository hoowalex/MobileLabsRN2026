import React, { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProviderWrapper } from './context/ThemeContext';
import challengesData from './data/challengesData';

export default function App() {
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({
    taps: 0,
    doubleTaps: 0,
    longPresses: 0,
    dragged: false,
    flingRight: false,
    flingLeft: false,
    pinches: 0,
  });

  const addScore = (value) => {
    setScore((prev) => prev + value);
  };

  const updateStats = (key, value = 1) => {
    setStats((prev) => {
      if (typeof prev[key] === 'boolean') {
        return { ...prev, [key]: true };
      }

      return { ...prev, [key]: prev[key] + value };
    });
  };

  const resetGame = () => {
    setScore(0);
    setStats({
      taps: 0,
      doubleTaps: 0,
      longPresses: 0,
      dragged: false,
      flingRight: false,
      flingLeft: false,
      pinches: 0,
    });
  };

  const challenges = useMemo(() => {
    return challengesData.map((challenge) => {
      let progress = 0;

      switch (challenge.id) {
        case 'tap-10':
          progress = stats.taps;
          break;
        case 'double-tap-5':
          progress = stats.doubleTaps;
          break;
        case 'long-press-1':
          progress = stats.longPresses;
          break;
        case 'drag-1':
          progress = stats.dragged ? 1 : 0;
          break;
        case 'fling-right-1':
          progress = stats.flingRight ? 1 : 0;
          break;
        case 'fling-left-1':
          progress = stats.flingLeft ? 1 : 0;
          break;
        case 'pinch-1':
          progress = stats.pinches;
          break;
        case 'score-100':
          progress = score;
          break;
        case 'custom-long-press-3':
          progress = stats.longPresses;
          break;
        default:
          progress = 0;
      }

      return {
        ...challenge,
        progress,
        completed: progress >= challenge.target,
      };
    });
  }, [score, stats]);

  const completedCount = challenges.filter((item) => item.completed).length;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProviderWrapper>
        <StatusBar style="auto" />
        <AppNavigator
          score={score}
          stats={stats}
          addScore={addScore}
          updateStats={updateStats}
          resetGame={resetGame}
          challenges={challenges}
          completedCount={completedCount}
        />
      </ThemeProviderWrapper>
    </GestureHandlerRootView>
  );
}