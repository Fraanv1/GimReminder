"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para almacenar nuestro valor
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Obtener del localStorage al montar el componente
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])

  // Función para establecer valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que el valor sea una función para tener la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // Guardar estado
      setStoredValue(valueToStore)

      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}
