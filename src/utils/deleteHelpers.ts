export const deleteItemFromDatabase = async (apiRoute: string): Promise<void> => {
    try {
      const response = await fetch(apiRoute, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
      
    } catch (error: any) {
      console.error('Error deleting item:', error);
      throw error;
    }
  };
  