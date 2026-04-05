import React from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components/native';
import { useThemeContext } from '../context/ThemeContext';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const Text = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-top: 8px;
`;

const ResetButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 14px 18px;
  border-radius: 16px;
  align-items: center;
  margin-top: 10px;
`;

const ResetButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export default function SettingsScreen({ resetGame }) {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <Container>
      <Card>
        <Row>
          <Title>Темна тема</Title>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </Row>
        <Text>Перемикає світлу та темну тему застосунку.</Text>
      </Card>

      <Card>
        <Title>Скидання прогресу</Title>
        <Text>Обнулити рахунок і статус усіх завдань.</Text>
        <ResetButton onPress={resetGame}>
          <ResetButtonText>Скинути прогрес</ResetButtonText>
        </ResetButton>
      </Card>
    </Container>
  );
}