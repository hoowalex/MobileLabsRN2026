import React from 'react';
import styled from 'styled-components/native';
import ChallengeItem from '../components/ChallengeItem';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.View`
  padding: 20px;
`;

const SummaryCard = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 16px;
`;

const SummaryTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const SummaryText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-top: 6px;
`;

export default function ChallengesScreen({ challenges, completedCount, score }) {
  return (
    <Container>
      <Content>
        <SummaryCard>
          <SummaryTitle>Прогрес завдань</SummaryTitle>
          <SummaryText>
            Виконано: {completedCount} / {challenges.length}
          </SummaryText>
          <SummaryText>Поточний рахунок: {score}</SummaryText>
        </SummaryCard>

        {challenges.map((challenge) => (
          <ChallengeItem key={challenge.id} challenge={challenge} />
        ))}
      </Content>
    </Container>
  );
}