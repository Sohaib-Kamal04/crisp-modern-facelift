// utils/geolocation.ts

export interface Address {
  street?: string;
  houseNumber?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  fullAddress: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export async function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let message = 'Failed to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location permission denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

export async function reverseGeocode(lat: number, lon: number): Promise<Address> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'CrispCleaningApp/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.address) {
      throw new Error('No address data found');
    }

    const addr = data.address;
    const street = addr.road || addr.street || '';
    const houseNumber = addr.house_number || '';
    const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || '';
    const state = addr.state || addr.region || '';
    const postcode = addr.postcode || '';
    const country = addr.country || '';

    const addressParts: string[] = [];
    if (houseNumber && street) addressParts.push(`${houseNumber} ${street}`);
    else if (street) addressParts.push(street);
    if (city) addressParts.push(city);
    if (state) addressParts.push(state);
    if (postcode) addressParts.push(postcode);
    if (country) addressParts.push(country);

    const fullAddress = addressParts.join(', ') || data.display_name;

    return {
      street: street || undefined,
      houseNumber: houseNumber || undefined,
      city: city || undefined,
      state: state || undefined,
      postcode: postcode || undefined,
      country: country || undefined,
      fullAddress,
      coordinates: {
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
      },
    };
  } catch (error) {
    throw new Error(
      `Failed to reverse geocode: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function getCurrentAddress(): Promise<Address> {
  try {
    const location = await getCurrentLocation();
    const address = await reverseGeocode(location.lat, location.lon);
    return address;
  } catch (error) {
    throw error;
  }
}
