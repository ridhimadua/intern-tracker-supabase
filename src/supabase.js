import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase credentials
const supabaseUrl = 'https://gizkommmmtjgmkyrkmbf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpemtvbW1tbXRqZ21reXJrbWJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MzQ0NDAsImV4cCI6MjA3MzUxMDQ0MH0.ZNoWDk6DxwSXjMO9RwwH_G8xXZu-SLRRxT-F_kNz1OU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to get all interns
export const getInterns = async () => {
  const { data, error } = await supabase
    .from('interns')
    .select('*')
  
  if (error) {
    console.error('Error fetching interns:', error)
    throw error
  }
  
  return data
}

// Function to add a new intern
export const addIntern = async (internData) => {
  const { data, error } = await supabase
    .from('interns')
    .insert([internData])
    .select()
  
  if (error) {
    console.error('Error adding intern:', error)
    throw error
  }
  
  return data
}

// Function to update intern status
export const updateInternStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('interns')
    .update({ status: status })
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating intern:', error)
    throw error
  }
  
  return data
}

// Function to update leave status
export const updateLeaveStatus = async (id, onLeave) => {
  const { data, error } = await supabase
    .from('interns')
    .update({ on_leave: onLeave })
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating leave status:', error)
    throw error
  }
  
  return data
}