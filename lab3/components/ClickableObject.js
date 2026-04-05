import React, { useRef } from 'react';
import { Animated } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  Directions,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: 100%;
  height: 320px;
  align-items: center;
  justify-content: center;
`;

const ObjectFace = styled(Animated.View)`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;
  elevation: 6;
`;

const ObjectText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export default function ClickableObject({ addScore, updateStats }) {
  const singleTapRef = useRef(null);
  const doubleTapRef = useRef(null);

  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const lastOffset = useRef({ x: 0, y: 0 });

  const pinchScale = useRef(new Animated.Value(1)).current;
  const baseScale = useRef(1);

  const onSingleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      addScore(1);
      updateStats('taps');
    }
  };

  const onDoubleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      addScore(2);
      updateStats('doubleTaps');
    }
  };

  const onLongPress = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      addScore(5);
      updateStats('longPresses');
    }
  };

  const onPanStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      lastOffset.current = {
        x: lastOffset.current.x + nativeEvent.translationX,
        y: lastOffset.current.y + nativeEvent.translationY,
      };

      translate.setOffset(lastOffset.current);
      translate.setValue({ x: 0, y: 0 });
      updateStats('dragged');
    }
  };

  const onFlingRight = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      const randomPoints = Math.floor(Math.random() * 10) + 1;
      addScore(randomPoints);
      updateStats('flingRight');
    }
  };

  const onFlingLeft = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      const randomPoints = Math.floor(Math.random() * 10) + 1;
      addScore(randomPoints);
      updateStats('flingLeft');
    }
  };

  const onPinchStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      const nextScale = Math.max(0.7, Math.min(baseScale.current * nativeEvent.scale, 1.8));
      baseScale.current = nextScale;
      pinchScale.setValue(nextScale);

      if (Math.abs(nativeEvent.scale - 1) > 0.08) {
        addScore(3);
        updateStats('pinches');
      }
    }
  };

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: false }
  );

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translate.x, translationY: translate.y } }],
    { useNativeDriver: false }
  );

  return (
    <Wrapper>
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanStateChange}
      >
        <Animated.View>
          <FlingGestureHandler
            direction={Directions.RIGHT}
            onHandlerStateChange={onFlingRight}
          >
            <Animated.View>
              <FlingGestureHandler
                direction={Directions.LEFT}
                onHandlerStateChange={onFlingLeft}
              >
                <Animated.View>
                  <PinchGestureHandler
                    onGestureEvent={onPinchGestureEvent}
                    onHandlerStateChange={onPinchStateChange}
                  >
                    <Animated.View>
                      <LongPressGestureHandler
                        minDurationMs={3000}
                        onHandlerStateChange={onLongPress}
                      >
                        <Animated.View>
                          <TapGestureHandler
                            ref={doubleTapRef}
                            numberOfTaps={2}
                            onHandlerStateChange={onDoubleTap}
                          >
                            <Animated.View>
                              <TapGestureHandler
                                ref={singleTapRef}
                                waitFor={doubleTapRef}
                                numberOfTaps={1}
                                onHandlerStateChange={onSingleTap}
                              >
                                <Animated.View
                                  style={{
                                    transform: [
                                      { translateX: translate.x },
                                      { translateY: translate.y },
                                      { scale: pinchScale },
                                    ],
                                  }}
                                >
                                  <ObjectFace>
                                    <ObjectText>Tap me</ObjectText>
                                  </ObjectFace>
                                </Animated.View>
                              </TapGestureHandler>
                            </Animated.View>
                          </TapGestureHandler>
                        </Animated.View>
                      </LongPressGestureHandler>
                    </Animated.View>
                  </PinchGestureHandler>
                </Animated.View>
              </FlingGestureHandler>
            </Animated.View>
          </FlingGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </Wrapper>
  );
}