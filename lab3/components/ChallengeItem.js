import React from 'react';
import styled from 'styled-components/native';

const Card = styled.View`
  background-color: ${({ theme, completed }) =>
    completed ? theme.colors.successSoft : theme.colors.card};
  border: 1px solid
    ${({ theme, completed }) =>
      completed ? theme.colors.success : theme.colors.border};
  border-radius: 18px;
  padding: 16px;
  margin-bottom: 12px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-top: 6px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const Progress = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const StatusBadge = styled.View`
  background-color: ${({ theme, completed }) =>
    completed ? theme.colors.success : theme.colors.primary};
  padding-vertical: 6px;
  padding-horizontal: 10px;
  border-radius: 999px;
`;

const StatusText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

export default function ChallengeItem({ challenge }) {
  return (
    <Card completed={challenge.completed}>
      <Title>{challenge.title}</Title>
      <Description>{challenge.description}</Description>

      <Footer>
        <Progress>
          Прогрес: {Math.min(challenge.progress, challenge.target)} / {challenge.target}
        </Progress>

        <StatusBadge completed={challenge.completed}>
          <StatusText>
            {challenge.completed ? 'Виконано' : 'У процесі'}
          </StatusText>
        </StatusBadge>
      </Footer>
    </Card>
  );
}