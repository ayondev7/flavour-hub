import {jwtDecode} from "jwt-decode"; // Fixed import

export function getUserIdFromToken() {
    // Retrieve the token from session storage
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      // Handle the case where the token is not found
      console.error('JWT token not found in session storage');
      return null;
    }
  
     // Decode the token to extract user ID
     const decodedToken = jwtDecode(token);
     const userId = decodedToken.id;
     return userId;
  }
  
