import React from 'react'

import { WorksProvider } from './works'

export const AppProvider: React.FC = ({ children }) => (
  <WorksProvider>{children}</WorksProvider>
)
