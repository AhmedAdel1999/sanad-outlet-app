import { useState, useEffect, useRef } from "react";
import { MapPin, Loader, AlertCircle } from "lucide-react";

export default function LocationDetector() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef<any>(null);

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  const loadGoogleMapsScript = () => {
    if (window.google) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  };

  const initMap = () => {
    if (!mapRef.current) return;

    const defaultCenter = { lat: 30.0444, lng: 31.2357 }; // Cairo, Egypt

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
    });

    mapInstance.current.addListener("click", (e) => {
      handleMapClick(e.latLng);
    });
  };

  const handleMapClick = (latLng) => {
    const newLocation = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };

    setLocation(newLocation);
    updateMarker(newLocation);
    getAddressFromCoords(newLocation);
  };

  const updateMarker = (position: any) => {
    if (markerInstance.current) {
      markerInstance.current.setMap(null);
    }

    markerInstance.current = new window.google.maps.Marker({
      position,
      map: mapInstance.current,
      animation: window.google.maps.Animation.DROP,
    });

    mapInstance.current.panTo(position);
  };

  const getAddressFromCoords = async (coords) => {
    setLoading(true);
    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: coords }, (results, status) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
          setError("");
        } else {
          setError("Unable to get address");
        }
        setLoading(false);
      });
    } catch (err) {
      setError("Error fetching address");
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(newLocation);
        updateMarker(newLocation);
        getAddressFromCoords(newLocation);
        setLoading(false);
      },
      (error) => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Location Detector
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Click on the map or use your current location
          </p>
        </div>

        <div className="p-4">
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Detecting...
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5" />
                Use My Current Location
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div
            ref={mapRef}
            className="w-full h-96 rounded-lg mt-4 border-2 border-gray-200"
          />

          {location && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-700">Coordinates:</p>
                  <p className="text-gray-600 text-sm">
                    Lat: {location.lat.toFixed(6)}, Lng:{" "}
                    {location.lng.toFixed(6)}
                  </p>
                </div>
              </div>

              {address && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="font-semibold text-gray-700">Address:</p>
                  <p className="text-gray-600 text-sm">{address}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Replace 'YOUR_API_KEY' in the code with your
          actual Google Maps API key. Get one from the{" "}
          <a
            href="https://console.cloud.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google Cloud Console
          </a>
          .
        </p>
      </div>
    </div>
  );
}
