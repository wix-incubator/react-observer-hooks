import {useEffect, useState, useCallback} from 'react';
import {EventObserver} from './event-observer';

export const createUseObserver =
  <ObserverEventArg>(observer: EventObserver<ObserverEventArg>) =>
  <K extends keyof ObserverEventArg>(event: K, action: (arg?: ObserverEventArg[K]) => void) => {
    const onObserverEvent = useCallback(
      (observerEvent: K, observerArg?: ObserverEventArg[K]) => {
        if (observerEvent === event) {
          action(observerArg);
        }
      },
      [event, action]
    );

    useEffect(() => {
      observer.attach(onObserverEvent);
      return () => observer.detach(onObserverEvent);
    }, [onObserverEvent]);
  };

export const createUseStateForObserverEvent =
  <ObserverEventArg>() =>
  <K extends keyof ObserverEventArg>(event: K) => {
    return useState<ObserverEventArg[typeof event] | undefined>(undefined);
  };
