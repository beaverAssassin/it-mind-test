export const apiUrl = 'http://server:4000';

export const fetchUrl = async (url: string) => {
  try {
    const response = await fetch(url);
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
