import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { VendorContext } from '../contexts/VendorContext.jsx'

// Protects vendor onboarding and dashboard routes
export default function ProtectedRoute({ children }) {
  const { vendorData } = useContext(VendorContext)
  const token = localStorage.getItem('token')
  const location = useLocation()

  const isOnboarded =
    token &&
    Array.isArray(vendorData.services) &&
    vendorData.services.length > 0 &&
    vendorData.location &&
    vendorData.minPrice !== undefined &&
    vendorData.maxPrice !== undefined

  if (!isOnboarded) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}
