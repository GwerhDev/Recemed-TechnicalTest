export function getCookie(name) {
  try {
    const value = `; ${document.cookie}`;
    const userData = value.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1] || null;
    if (!userData) return null;
    const decodedUserData = decodeURIComponent(userData);
    const parsedUserData = decodedUserData ? JSON.parse(decodedUserData) : null;
    return parsedUserData;
  } catch (error) {
    console.error('Error parsing user-data cookie:', error);
  }
}