export const userAPI_helper = {
    // Fetch user data from API
    fetchUser: async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch user data');
        }
        const data = await response.json();
        return data[0] || null; // Since getUser returns an array
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },
  
    // Create new user
    createUser: async (profileData: any) => {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create user');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    },
  
    // Update user
    updateUser: async (profileData: any) => {
      try {
        const response = await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update user');
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }
  };