
export const apiUrl = 'http://server:4000';

export const fetchUrl = async (url: string, params?: RequestInit) => {
  try {
    const response = await fetch(url, params);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error(
      'There was a problem with the fetch operation:',
      (error as Error).message,
    );
    throw error;
  }
};
