import React from 'react';
import styled from 'styled-components/native';
import ClickableObject from '../components/ClickableObject';
import { useThemeContext } from '../context/ThemeContext';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const ScoreCard = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ScoreLabel = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
`;

const ScoreValue = styled.Text`
  font-size: 38px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: 8px;
`;

const HintCard = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primarySoft};
  border-radius: 18px;
  padding: 16px;
  margin-top: 20px;
`;

const HintTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const HintText = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

const MiniStats = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

const StatBox = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 14px;
  border-radius: 16px;
  margin-horizontal: 4px;
  align-items: center;
`;

const StatValue = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const StatLabel = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-top: 4px;
`;

export default function HomeScreen({
  score,
  stats,
  addScore,
  updateStats,
  completedCount,
}) {
  useThemeContext();

  return (
    <Container contentContainerStyle={{ flexGrow: 1 }}>
      <Content>
        <ScoreCard>
          <ScoreLabel>Поточний рахунок</ScoreLabel>
          <ScoreValue>{score}</ScoreValue>
        </ScoreCard>

        <ClickableObject
          addScore={addScore}
          updateStats={updateStats}
        />

        <MiniStats>
          <StatBox>
            <StatValue>{stats.taps}</StatValue>
            <StatLabel>Кліки</StatLabel>
          </StatBox>

          <StatBox>
            <StatValue>{stats.doubleTaps}</StatValue>
            <StatLabel>Подвійні</StatLabel>
          </StatBox>

          <StatBox>
            <StatValue>{completedCount}</StatValue>
            <StatLabel>Завдання</StatLabel>
          </StatBox>
        </MiniStats>

        <HintCard>
          <HintTitle>Як грати</HintTitle>
          <HintText>
            • Один тап = +1 очко{'\n'}
            • Подвійний тап = +2 очки{'\n'}
            • Утримання 3 секунди = +5 очок{'\n'}
            • Свайп = випадкові очки{'\n'}
            • Масштабування = бонусні очки{'\n'}
            • Об’єкт можна перетягувати по екрану
          </HintText>
        </HintCard>
      </Content>
    </Container>
  );
}