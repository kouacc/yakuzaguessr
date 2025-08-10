export function calculateScore(selectedPoint: { lat: number; lng: number }, answer: { lat: number; lng: number }): number {
  if (!selectedPoint) return 0;

  const distance = Math.sqrt(
    Math.pow(selectedPoint.lat - answer.lat, 2) + Math.pow(selectedPoint.lng - answer.lng, 2)
  );

  return Math.max(0, 100 - distance);
}

export function calculateDistance(selectedPoint: { lat: number; lng: number }, answer: { lat: number; lng: number }): number {
    if (!selectedPoint) return 0;

    return Math.sqrt(
        Math.pow(selectedPoint.lat - answer.lat, 2) + Math.pow(selectedPoint.lng - answer.lng, 2)
    );
}