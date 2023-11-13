import { FC, useEffect, useMemo, useState } from "react";
import getEvents from "@/getevents";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  FullscreenControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { Event } from "@/getevents";
import Pin from "@/pin";
import Legend from "@/legend";

const accessToken =
  "pk.eyJ1IjoiZHVkZXk3ZnR3IiwiYSI6ImNsb3Fmc3dlbTA2bzcyaW1rZnd0MGZuMnoifQ.Tv9vopthxwZ6Rm2-T0PTIQ";

const Home: FC = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [popupInfo, setPopupInfo] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<Event[]> {
      return await getEvents();
    }
    fetchData().then((res) => {
      setEventData(res);
    });
  }, []);

  const pins = useMemo(
    () =>
      eventData.map((event, index) => {
        const date = new Date();
        if (new Date(event.exactDate) < date) return null;
        return (
          <Marker
            key={`marker-${index}`}
            longitude={event.longitude}
            latitude={event.latitude}
            anchor="top"
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              if (popupInfo && popupInfo.id === event.id) {
                setPopupInfo(null);
              } else {
                setPopupInfo(event);
              }
            }}
          >
            <Pin
              color={
                event.link.includes("ibjjf")
                  ? { color1: "#404ce7", color2: "#dabe34" }
                  : event.link.includes("ajp")
                  ? { color1: "#141a29", color2: "#641d85" }
                  : { color1: "#f59b42", color2: "#dabe34" }
              }
            />
          </Marker>
        );
      }),
    [eventData, popupInfo],
  );
  return (
    <>
      <div className="h-[calc(100svh-148px)] w-screen overscroll-none md:h-[calc(100svh-168px)]">
        <Map
          reuseMaps
          mapboxAccessToken={accessToken}
          initialViewState={{
            longitude: -79.0377,
            latitude: 43.0962,
            zoom: 6,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/dudey7ftw/clorn7lll00hx01ntcfsn0b1g"
          projection={{ name: "globe" }}
        >
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />
          {pins}
          {popupInfo && (
            <Popup
              anchor="bottom"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
              style={{ maxWidth: "300px" }}
            >
              <div className="flex flex-col items-center justify-center gap-2 p-2 text-center text-neutral-600">
                <p className=" text-sm font-semibold">{popupInfo.title}</p>
                <p>{popupInfo.location}</p>
                <p>
                  {new Date(popupInfo.exactDate).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <a
                  target="_new"
                  href={popupInfo.link}
                  className="text-blue-500 underline"
                >
                  Visit Event Page
                </a>
              </div>
            </Popup>
          )}
          <Legend />
        </Map>
      </div>
    </>
  );
};

export default Home;
