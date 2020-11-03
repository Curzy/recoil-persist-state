import { useRecoilTransactionObserver_UNSTABLE, Snapshot, MutableSnapshot, RecoilState } from 'recoil'
import { forEach, isEmpty, keys, includes } from 'lodash'

export interface RecoilPersistStateProps {
  recoilValues?: RecoilState<any>[]
  config?: {
    key: string
    storage: Storage
  }
}
export function RecoilPersistState(props?: RecoilPersistStateProps) {
  const { recoilValues = [], config: { key, storage } = { key: 'recoil-persist-state', storage: localStorage } } = props || {}
  function persistState(opts: { snapshot: Snapshot; previousSnapshot: Snapshot }): void {
    const { snapshot } = opts
    const newData: {
      [key: string]: any
    } = {}
    forEach(recoilValues, (recoilValue) => {
      const atomLoadable = snapshot.getLoadable(recoilValue)
      if (atomLoadable.state === 'hasValue') {
        newData[recoilValue.key] = atomLoadable.contents
      }
    })

    try {
      if (!isEmpty(newData)) {
        storage.setItem(key, JSON.stringify(newData))
      }
    } catch (e) {
      console.error(e)
    }
  }
  function registerRecoilPersistState(): void {
    useRecoilTransactionObserver_UNSTABLE(persistState)
    return null
  }

  function initializeState(mutableSnapshot: MutableSnapshot) {
    const { set } = mutableSnapshot
    const values = storage.getItem(key)
    try {
      const storedStates = JSON.parse(values)
      if (storedStates === null) return

      forEach(recoilValues, (recoilValue) => {
        if (includes(keys(storedStates), recoilValue.key)) {
          const storedValue = storedStates[recoilValue.key]
          try {
            set(recoilValue, storedValue)
          } catch (e) {
            console.error(e)
          }
        }
      })
    } catch (e) {
      console.error(e)
      return
    }
  }

  return {
    registerRecoilPersistState,
    initializeState,
    persistState,
  }
}

export default RecoilPersistState
