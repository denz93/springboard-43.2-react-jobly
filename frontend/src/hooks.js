import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import JoblyApi from './api.js';
import { useCallback, useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useMemo } from 'react';
import {Subject} from 'rxjs';

export function useCompanies(byName = '') {
  const query = useQuery({
    queryKey: ['companies', byName],
    queryFn: () => JoblyApi.getCompanies(byName),
    
  })
  return {
    ...query,
    companies: query.data
  }
}

export function useCompany(handle) {
  const query = useQuery({
    queryKey: ['company', handle],
    queryFn: () => JoblyApi.getCompany(handle),
  })
  return {
    ...query,
    company: query.data
  }
}

export function useJobs(byTitle = '') {
  const query = useQuery({
    queryKey: ['jobs', byTitle],
    queryFn: () => JoblyApi.getJobs(byTitle),
  })
  return {
    ...query,
    jobs: query.data
  }
}

export function useSignupMutation() {
  // eslint-disable-next-line no-unused-vars
  const [_, setToken] = useLocalStorage('token', '')
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (data) => JoblyApi.signup(data),
    onSuccess: (data) => {
      setToken(data)
      JoblyApi.token = data
      setTimeout(() => navigate('/companies', {replace: true}), 100)
    }
  })
  return {
    ...mutation,
    token: mutation.data
  }
}

export function useSigninMutation() {
  // eslint-disable-next-line no-unused-vars
  const [_, setToken] = useLocalStorage('token', '')
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (data) => JoblyApi.signin(data),
    onSuccess: (data) => {
      setToken(data)
      JoblyApi.token = data
      setTimeout(() => navigate('/companies', {replace: true}), 100)
    },

  })
  return {
    ...mutation,
    token: mutation.data
  }
}

export function useAuth() {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage('token', '', {syncData: true});
  const isLoggedin = !!token;


  const logout = useCallback(() => {
    setToken(undefined)
    setTimeout(() => navigate('/', {replace: true}), 1)
  }, [])

  const login = useCallback(() => {

  }, [])

  /**
   * @typedef {Object} User
   * @property {string} username
   * @property {boolean} isAdmin
   * 
   * 
   * @type {User|null}
   */
  const userBlob = useMemo(() => isLoggedin ? JSON.parse(atob(token.split('.')[1]) ): null, [isLoggedin, token])

  return {
    isLoggedin,
    user: userBlob,
    logout,
    login
  }
}

export function useUser() {
  const {user} = useAuth()
  const query = useQuery({
    queryKey: ['user', user?.username],
    queryFn: () => JoblyApi.getUser(user?.username),
    enabled: !!user
  })
  return {
    ...query,
    user: query.data
  }
}

export function useUserMutation() {
  const {user} = useAuth()
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data) => JoblyApi.updateUser(user.username, data),
    enabled: !!user,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', user.username], data)
    }
  })
  return mutation
}

export function useApplyMutation() {
  const {user} = useAuth()
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (jobId) => JoblyApi.applyJob(user.username, jobId),
    enabled: !!user,
    onSuccess: () => {
      queryClient.invalidateQueries(['user', user.username])
    }
  })
  return mutation
}

/**
 * @template T
 * @param {T} fn 
 * @param {number} delay 
 * @returns {T}
 */
export function useDebounce(fn, delay = 300) {
  const timeoutRef = useRef(null)
  const wrapper = useCallback((...args) => {
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => fn(...args), delay)
  }, [fn, delay])

  return wrapper
}

/**
 * 
 */
export function useDebounceValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

const localStorageSubject = new Subject()
function useLocalStorage(key, defaultValue='') {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const storageValue = localStorage.getItem(key)
    if (storageValue !== null) {
      setValue(JSON.parse(storageValue))
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue))
    }
  }, [key])

  useEffect(() => {
    const sub = localStorageSubject.subscribe((value) => {
      setValue(value)
    })
    
    return () => sub.unsubscribe()
  }, [])


  const setLocalStorageValue = useCallback((newValue) => {
    localStorageSubject.next(newValue)
    if (newValue === undefined) {
      localStorage.removeItem(key)
      setValue(undefined)
      return
    }
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }, [])
  return [value, setLocalStorageValue]
 
}