/**
 * Service for interacting with the RTA Location API
 * This API returns location data based on zip code
 */

interface LocationApiResponse {
  code: string;
  msg: string;
  result: {
    siteid: string;
    phone: string;
    location: string;
  } | null;
}

const API_URL = import.meta.env.PUBLIC_LOCATION_API_URL || 'https://cblsrvr1.rtatel.com/planbuilder/api';
const API_KEY = 'svsvs54sef5se4fsv';

/**
 * Fetches location data from the external API using a zip code
 * @param zipcode - The zip code to search for
 * @returns The siteid (LocationKey) or null if not found
 */
export async function getLocationKeyByZipCode(zipcode: string): Promise<string | null> {
  try {
    const bodyMsg = JSON.stringify({
      apikey: API_KEY,
      customerID: "null",
      action: "searchAccountID",
      zipcode: zipcode
    });

    console.log('Fetching location data for zipcode:', zipcode);
    console.log('API URL:', API_URL);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: bodyMsg,
    });

    console.log('Response status:', response.status);
    console.log('Response content-type:', response.headers.get('content-type'));

    if (!response.ok) {
      console.error('Location API error:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response body:', text.substring(0, 200));
      return null;
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON. Content-Type:', contentType);
      const text = await response.text();
      console.error('Response body:', text.substring(0, 200));
      return null;
    }

    const data: LocationApiResponse = await response.json();
    console.log('API Response:', data);

    // Check if we have a valid result with siteid
    if (data.result && data.result.siteid) {
      return data.result.siteid;
    }

    return null;
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
}

/**
 * Fetches complete location data from the external API
 * @param zipcode - The zip code to search for
 * @returns The complete location data or null if not found
 */
export async function getLocationDataByZipCode(
  zipcode: string
): Promise<LocationApiResponse['result'] | null> {
  try {
    const bodyMsg = JSON.stringify({
      apikey: API_KEY,
      customerID: "null",
      action: "searchAccountID",
      zipcode: zipcode
    });

    console.log('Fetching complete location data for zipcode:', zipcode);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: bodyMsg,
    });

    if (!response.ok) {
      console.error('Location API error:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response body:', text.substring(0, 200));
      return null;
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON. Content-Type:', contentType);
      const text = await response.text();
      console.error('Response body:', text.substring(0, 200));
      return null;
    }

    const data: LocationApiResponse = await response.json();

    return data.result || null;
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
}
