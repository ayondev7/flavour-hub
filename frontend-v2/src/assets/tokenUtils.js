import {jwtDecode} from "jwt-decode";

export function getUserIdFromToken() {
   
    const token = sessionStorage.getItem('token');
    
    if (!token) {
     
      console.error('JWT token not found in session storage');
      return null;
    }
  
    
     const decodedToken = jwtDecode(token);
     const userId = decodedToken.id;
     return userId;
  }
  
