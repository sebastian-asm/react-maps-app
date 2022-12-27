export const getUserLocation = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    const { geolocation } = navigator;
    geolocation.getCurrentPosition(
      ({ coords }) => resolve([coords.longitude, coords.latitude]),
      (error) => {
        alert('No se pudo obtener la Geolocalización');
        reject(error);
      }
    );
  });
};
