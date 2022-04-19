import { Loader } from "@googlemaps/js-api-loader";
import type { NextPage } from "next";
import { FormEvent, useRef, useState } from "react";
import styles from "../assets/Home.module.scss";

const parseInputLatLng = (input: FormDataEntryValue) => {
  const [lat, lng] = String(input)
    .split(",")
    .map((string) => Number(string.replace("@", "")));
  return [lat, lng];
};

const createError = (error: any) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return "Something Went Wrong";
  }
};

const Home: NextPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [googleAPI, setGoogleAPI] = useState<typeof google | null>(null);
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  // take user api key as input and initialize a google api and map instance
  const initGoogleAPI = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mapRef.current instanceof HTMLDivElement) {
        const form = e.target as HTMLFormElement;
        const formData = Object.fromEntries(new FormData(form));
        const apiKey = String(formData.apiKey);
        const loader = new Loader({
          apiKey,
          version: "weekly",
          libraries: ["places"],
        });
        loader
          .load()
          .then((google) => {
            const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
              center: { lat: 0, lng: 0 },
              zoom: 8,
            });
            setGoogleAPI(google);
            setGoogleMap(map);
          })
          .catch((error) => {
            setError(createError(error));
          });
      } else {
        throw new Error("Map Reference is Undefined");
      }
    } catch (error) {
      setError(createError(error));
    }
  };

  const createMarker = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!googleAPI || !googleMap) throw new Error("Google API is Undefined");
      const form = e.target as HTMLFormElement;
      const formData = Object.fromEntries(new FormData(form));
      const parsedPosition = parseInputLatLng(formData.position);
      const position = new googleAPI.maps.LatLng(
        parsedPosition[0],
        parsedPosition[1]
      );
      new googleAPI.maps.Marker({ position, map: googleMap });
    } catch (error) {
      setError(createError(error));
    }
  };

  // takes user input for origin and destination as latitude "@43.6425701" and longitude "-79.3892455"
  const getDirections = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!googleAPI || !googleMap) throw new Error("Google API is Undefined");
      const form = e.target as HTMLFormElement;
      const formData = Object.fromEntries(new FormData(form));
      const parsedOrigin = parseInputLatLng(formData.origin);
      const parsedDestination = parseInputLatLng(formData.destination);
      const origin = new googleAPI.maps.LatLng(
        parsedOrigin[0],
        parsedOrigin[1]
      );
      const destination = new googleAPI.maps.LatLng(
        parsedDestination[0],
        parsedDestination[1]
      );

      // initialize directions services and renderer
      const directionsService = new googleAPI.maps.DirectionsService();
      const directionsRenderer = new googleAPI.maps.DirectionsRenderer();
      directionsRenderer.setMap(googleMap);

      // directions service can take a bunch of more options inside the route method
      // "https://developers.google.com/maps/documentation/javascript/directions#DirectionsRequests"
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          } else {
            throw new Error("Error Setting Destination");
          }
        }
      );
    } catch (error) {
      setError(createError(error));
    }
  };

  return (
    <div className={styles.root}>
      {error && error}
      <form onSubmit={initGoogleAPI}>
        <input
          type="text"
          id="apiKey"
          name="apiKey"
          placeholder="google-api-key"
        />
        <button>Initialize Google Map API</button>
      </form>
      {googleAPI && (
        <>
          <form onSubmit={getDirections}>
            <label htmlFor="origin">Origin</label>
            <input
              type="text"
              id="origin"
              name="origin"
              placeholder="@-23.3557206,43.6526509"
              defaultValue="@-23.3557206,43.6526509"
            />

            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              placeholder="@-18.8704245,47.5243989"
              defaultValue="@-18.8704245,47.5243989"
            />
            <button>Get Directions</button>
          </form>
          <form onSubmit={createMarker}>
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              placeholder="@-23.3557206,43.6526509"
              defaultValue="@-23.3557206,43.6526509"
            />
            <button>Create Marker</button>
          </form>
        </>
      )}
      <div ref={mapRef} className={styles.map} />
    </div>
  );
};

export default Home;
