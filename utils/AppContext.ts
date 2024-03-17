import { createContext } from 'react'
import { AppContextProps } from '../types/types'

const AppContext = createContext<Partial<AppContextProps>>({ songNumber: 1 })
export default AppContext
