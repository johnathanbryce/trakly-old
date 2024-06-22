export const deleteItemFromDatabase = async (apiRoute: string, userId: string, token: string): Promise<void> => {
  try {
    const response = await fetch(apiRoute, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-User-ID': userId,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete');
    }
  } catch (error: any) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
