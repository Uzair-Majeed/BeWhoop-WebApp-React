import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { HosterContext } from '../contexts/HosterContext'

export default function ProtectedRoute({ children }) {
  const { hosterData } = useContext(HosterContext)
  const token = localStorage.getItem('token')
  const location = useLocation()

  // Check that user has completed onboarding steps and has a valid token
  const isOnboarded =
    token &&
    hosterData.eventFrequency &&
    hosterData.avgSize &&
    Array.isArray(hosterData.eventTypes) &&
    hosterData.eventTypes.length > 0

  if (!isOnboarded) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}
