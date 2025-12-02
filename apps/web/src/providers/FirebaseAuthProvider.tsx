import type { User } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { LoadingCover } from '~/components/Base/Loading'
import { useToast } from '~/hooks/useToast'
import {
  createUserOperation,
  isExistsUserOperation,
} from '~/infrastructure/firestore/UserOperations'
import { auth, serverTimestamp } from '~/lib/firebase'
import { errorMessage } from '~/utils/errorMessage'

const authRequiredPaths = ['/boards', '/settings', '/delete']

const FirebaseAuthContext = createContext<{
  currentUser: User | null | undefined
  uid: string | null | undefined
  login: () => void
  logout: () => Promise<void>
  isAuthPath: boolean
}>({
  currentUser: undefined,
  uid: undefined,
  login: async () => {},
  logout: async () => {},
  isAuthPath: false,
})

const FirebaseAuthProvider = ({
  children,
}: {
  children: ReactNode
}): ReactNode => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined,
  )
  const [uid, setUid] = useState<string | null | undefined>(undefined)
  const { pathname, push } = useRouter()
  const { showErrorToast } = useToast()

  const isAuthPath = useMemo(
    () => authRequiredPaths.some((p) => pathname === p),
    [pathname],
  )

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // ログイン不要なページではなにもしない
      if (!isAuthPath) {
        if (user) {
          setCurrentUser(user)
          setUid(user.uid)
        } else {
          setCurrentUser(null)
          setUid(null)
        }
        return
      }

      if (isAuthPath && !user) {
        push('/')
        return
      }

      if (user) {
        setCurrentUser(user)
        setUid(user.uid)
      } else {
        setCurrentUser(null)
        setUid(null)
      }
    })
    return () => unsubscribe()
  }, [isAuthPath, push])

  const login = useCallback(async () => {
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider)
      .then(async (val) => {
        const userData = val.user
        const uid = userData.uid
        const isRegistered = await isExistsUserOperation(uid)

        // 未登録ならまずはユーザー作成
        if (!isRegistered) {
          // biome-ignore lint/style/noNonNullAssertion: <explanation> googleログインでは必ずemailが存在する
          const email = userData.email!
          await createUserOperation(uid, {
            createdAt: serverTimestamp,
            displayName: '未設定',
            email,
            profileImageUrl: '',
            username: uid,
            updatedAt: serverTimestamp,
          })
        }

        // 登録済みならボード一覧へ
        push('/boards')
      })
      .catch((error) => {
        console.error('error with google login', error)
        showErrorToast('ログインに失敗しました', errorMessage(error))
      })
  }, [push, showErrorToast])

  const logout = useCallback(async () => {
    await signOut(auth)
  }, [])

  return (
    <FirebaseAuthContext.Provider
      value={{ currentUser, uid, login, logout, isAuthPath }}
    >
      {currentUser === undefined ? <LoadingCover /> : null}
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export { FirebaseAuthContext, FirebaseAuthProvider }

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext)
