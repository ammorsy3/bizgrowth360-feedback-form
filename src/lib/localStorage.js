const STORAGE_KEY = 'bizgrowth360_feedback_form'
const LAST_SAVED_KEY = 'bizgrowth360_last_saved'

export function saveFormData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    localStorage.setItem(LAST_SAVED_KEY, new Date().toISOString())
    return true
  } catch (error) {
    console.error('Error saving form data:', error)
    return false
  }
}

export function loadFormData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error loading form data:', error)
    return null
  }
}

export function clearFormData() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LAST_SAVED_KEY)
    return true
  } catch (error) {
    console.error('Error clearing form data:', error)
    return false
  }
}

export function getLastSavedTime() {
  try {
    const timestamp = localStorage.getItem(LAST_SAVED_KEY)
    return timestamp ? new Date(timestamp) : null
  } catch (error) {
    console.error('Error getting last saved time:', error)
    return null
  }
}
