Recoil Persist State
---
make recoil state persist with localStorage  + Typescript support

## Install
```shell script
yarn add recoil-persist-state
```
or
```
npm install --save recoil-persist-state
```

## How To Use

index.tsx
```typescript jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { App } from './App'
import { initializeState } from './state'

ReactDOM.render(
  <RecoilRoot initializeState={initializeState}>
    <App/>
  </RecoilRoot>,
  document.getElementById('root')
)
```

state.ts
```typescript
import { tokenState } from './atoms'
import RecoilPersistState from 'recoil-persist-state'

const { registerRecoilPersistState, initializeState, persistState } = RecoilPersist({
  recoilValues: [tokenState]
})

export {
  registerRecoilPersistState,
  initializeState,
  persistState,
}
```

App.tsx
```typescript jsx
import React from 'react'
import { registerRecoilPersistState, persistState } from './state'
import { useRecoilTransactionObserver_UNSTABLE } from 'recoil'


export const App = () => {
  registerRecoilPersistState() // or useRecoilTransactionObserver_UNSTABLE(persistState)
  return <h1>Hi</h1>
}
```

## Related
- [https://recoiljs.org/docs/guides/persistence](https://recoiljs.org/docs/guides/persistence)
- [recoil-persist](https://github.com/polemius/recoil-persist) (written with [useTransactionObservation_DEPRECATED](https://github.com/facebookexperimental/Recoil/commit/ddae6de90211e5b01737b4b19323aaead35fbbeb#diff-40f9c0c7ffba5f8f99a9c4fdc8424b7b27d2618d647b94ae9860401c0152d7ceL433-R433))
