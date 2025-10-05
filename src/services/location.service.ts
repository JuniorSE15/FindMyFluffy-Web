type ReverseGeocodeResponse = {
  display_name: string;
};

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<ReverseGeocodeResponse> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'FindMyFluffy/1.0', // Required by Nominatim
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ReverseGeocodeResponse = await response.json();

    return data;
  } catch (error) {
    console.error('Error in reverseGeocode:', error);
    // Return coordinates as fallback instead of throwing
    return {
      display_name: `${lat}, ${lng}`,
    };
  }
}
