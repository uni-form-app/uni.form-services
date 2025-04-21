/**
 * Calcula a distância entre dois pontos geográficos usando a fórmula de Haversine.
 * 
 * @param originLatitude - Latitude do ponto de origem em graus decimais.
 * @param originLongitude - Longitude do ponto de origem em graus decimais.
 * @param destinationLatitude - Latitude do ponto de destino em graus decimais.
 * @param destinationLongitude - Longitude do ponto de destino em graus decimais.
 * @returns A distância em quilômetros entre os dois pontos.
 */
export const calculateDistanceInKm = (
  originLatitude: number,
  originLongitude: number,
  destinationLatitude: number,
  destinationLongitude: number
): number => {
  const earthRadiusKm = 6371;

  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

  const deltaLat = toRadians(destinationLatitude - originLatitude);
  const deltaLon = toRadians(destinationLongitude - originLongitude);

  const lat1Rad = toRadians(originLatitude);
  const lat2Rad = toRadians(destinationLatitude);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return parseFloat((earthRadiusKm * c).toFixed(2));
};
