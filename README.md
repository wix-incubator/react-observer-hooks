# react-observer-hooks

A small React typescript library for sending events between components. This is an observer pattern, where one component (or any piece of code) fires an event, while any other component can listen to it and handle the it if needed.

This is not a reactive way of doing things and in most cases it should not be needed since all of the component to component communication can be done using variuos React built-in features (state, props, context, etc).

A common scenario to use observer pattern in React app is when components under a different tree nodes needs to communicate with each other, or if we have a very big component tree and passing the same prop though all of the children makes no sense.

Typescript only. Hooks are typesafe and they will infer the argument types for events.

### Setup:

```ts
import {EventObserver, reateUseObserver, createUseStateForObserverEvent} from 'react-observer-hooks';

export enum ObserverEvent {
  REPLY_PRESS,
  POST_CREATED,
}

export interface ObserverEventArg {
  [ObserverEvent.ON_REPLY_PRESS]: {parentId: string};
  [ObserverEvent.POST_CREATED]: {postId: string};
}

export const observer = new EventObserver<ObserverEventArg>();
export const useObserver = createUseObserver(observer);
export const useStateForObserverEvent = createUseStateForObserverEvent<ObserverEventArg>();
```

### notify:

```ts
export const PostFooter = ({parentId}: {parentId: string}) => {
  const handleReplyPress = React.useCallback(
    () => observer.notify(ObserverEvent.POST_CREATED, {parentId}),
    [parentId]
  );

  return (
    <>
      ...
      <Button onPress={handleReplyPress}>
      ...
    </>
  );
};
```

### observe:

```ts
export const BottomInput = ({parentId}: {parentId: string}) => {
  const [selectedParent, setSelectedParent] = useStateForObserverEvent(ObserverEvent.ON_REPLY_PRESS);

  useObserver(ObserverEvent.ON_REPLY_PRESS, (eventArgs) => {
    setSelectedParent(eventArgs);
  });

  return (
    <>
      ... selectedParent ? <ActiveInput /> : <InactiveInput />
      ...
    </>
  );
};
```
