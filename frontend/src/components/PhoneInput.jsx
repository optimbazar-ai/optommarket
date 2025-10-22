import { useState } from 'react'
import { Phone } from 'lucide-react'
import { maskUzbekPhone, validateUzbekPhone } from '../utils/phoneValidation'

const PhoneInput = ({ value, onChange, error, required = false, className = '' }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [validationError, setValidationError] = useState('')

  const handleChange = (e) => {
    const inputValue = e.target.value
    const masked = maskUzbekPhone(inputValue)
    onChange(masked)
    
    // Clear error on input
    if (validationError) {
      setValidationError('')
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    
    if (value && value.replace(/\D/g, '').length > 0) {
      const validation = validateUzbekPhone(value)
      if (!validation.isValid) {
        setValidationError(validation.message)
      } else {
        setValidationError('')
      }
    }
  }

  const errorMessage = error || validationError

  return (
    <div className={className}>
      <div className="relative">
        <Phone className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
          isFocused 
            ? 'text-primary-600' 
            : errorMessage 
              ? 'text-red-500' 
              : 'text-gray-400'
        }`} />
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder="+998 90 123-45-67"
          required={required}
          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
            errorMessage
              ? 'border-red-500 dark:border-red-500'
              : 'border-gray-200 dark:border-dark-border'
          } bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text`}
        />
      </div>
      
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}
      
      {!errorMessage && value && (
        <p className="mt-2 text-xs text-gray-500 dark:text-dark-muted">
          {validateUzbekPhone(value).operator && `📱 ${validateUzbekPhone(value).operator}`}
        </p>
      )}
    </div>
  )
}

export default PhoneInput
