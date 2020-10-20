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

## References
- [https://recoiljs.org/docs/guides/persistence](https://recoiljs.org/docs/guides/persistence)
- [recoil-persist](https://github.com/polemius/recoil-persist)
