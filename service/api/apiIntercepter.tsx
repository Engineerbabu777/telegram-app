import axios from 'axios' // Importing axios for HTTP requests
import { BASE_URL } from '../config' // Base URL for API requests
import { tokenStorage } from '../storage' // Module for storing tokens locally
import { resetAndNavigate } from '@/utils/LibraryHelpers' // Utility function to reset and navigate

// Creating an instance of axios with a predefined base URL
export const appAxios = axios.create({
  baseURL: BASE_URL
})

// Function to refresh tokens when the access token has expired
export const refresh_tokens = async () => {
  try {
    // Retrieve the refresh token from local storage
    const refreshToken = tokenStorage.getString('refreshToken')

    // Make a POST request to refresh the access token
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refresh_token: refreshToken
    })

    // Extract the new access and refresh tokens from the response
    const new_access_token = response?.data?.access_token
    const new_refresh_token = response?.data?.refresh_token

    // Save the new tokens in local storage
    tokenStorage.set('accessToken', new_access_token)
    tokenStorage.set('refreshToken', new_refresh_token)

    // Return the new access token for further use
    return new_access_token
  } catch (error) {
    // Handle token refresh errors
    console.log('REFRESH TOKEN ERROR')
    tokenStorage.clearAll() // Clear all tokens from local storage
    resetAndNavigate() // Redirect the user to a login or reset page
  }
}

// Adding a request interceptor to attach the access token to every request
appAxios.interceptors.request.use(async config => {
  const accessToken = tokenStorage.getString('accessToken') // Retrieve the access token
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}` // Attach token to Authorization header
  }
  return config // Return the modified config
})

// Adding a response interceptor to handle token expiration or other errors
appAxios.interceptors.response.use(
  response => response, // Pass the response if successful
  async error => {
    // Check if the error status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      try {
        // Refresh the tokens
        const newAccessToken = await refresh_tokens()
        // Update the original request's Authorization header
        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        // Retry the original request with the new token
        return axios(error.config)
      } catch (error) {
        console.log('ERROR REFRESHING TOKEN') // Log any errors during token refresh
      }
    }

    // Handle other errors and provide a meaningful error message
    if (error.response && error.response?.status != 401) {
      const errorMessage = error.response.data.msg || "Token Expired" // Default message if no specific message is provided
      return Promise.reject(errorMessage) // Reject the promise with the error message
    }
  }
)



/*
!! EXPLANATION BELOW: 
Explanation
1) Creating an Axios Instance:

A new Axios instance appAxios is created with the base URL (BASE_URL) for all API requests.
2) Token Refresh Logic:

The refresh_tokens function is defined to handle token expiration.
It retrieves the refresh token, sends a request to refresh the access token, and updates both tokens in the local storage.
If refreshing fails, it clears the tokens and navigates the user to the login/reset page.
3) Request Interceptor:

Before every HTTP request, the interceptor attaches the access token (if available) to the Authorization header.
4) Response Interceptor:

If a response returns a 401 Unauthorized error, the interceptor tries to refresh the tokens and retries the failed request with the new access token.
If the error isn't related to token expiration, it extracts the error message from the response and rejects the promise with the message.
5) Error Handling:

The code gracefully handles token-related errors and provides informative messages for other types of errors. This ensures a better user experience by managing sessions seamlessly.

*/