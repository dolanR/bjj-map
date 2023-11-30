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
import { SignedIn, useUser } from "@clerk/clerk-react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const accessToken =
  "pk.eyJ1IjoiZHVkZXk3ZnR3IiwiYSI6ImNsb3Fmc3dlbTA2bzcyaW1rZnd0MGZuMnoifQ.Tv9vopthxwZ6Rm2-T0PTIQ";

export interface SavedEvent {
  title: string;
  date: string;
  exactDate: Date;
  location: string;
  link: string;
}

const Home: FC = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [popupInfo, setPopupInfo] = useState<Event | null>(null);
  const [noGi, setNoGi] = useState(false);
  const [onlyGi, setOnlyGi] = useState(false);
  const [AJP, setAJP] = useState(true);
  const [GI, setGI] = useState(true);
  const [IBJJF, setIBJJF] = useState(true);
  const [NAGA, setNAGA] = useState(true);
  const [ADCC, setADCC] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [userSavedEvents, setUserSavedEvents] = useState<SavedEvent[]>([]);
  const { user } = useUser();

  //console log user saved events
  useEffect(() => {
    console.log("user's saved events", userSavedEvents);
  }, [userSavedEvents]);

  //function to make post request on click of star button
  function clickHandler(event: Event) {
    console.log("clicked");
    if (!user?.id) return;
    if (isLikeLoading) return;
    setIsLikeLoading(true);
    if (
      userSavedEvents &&
      userSavedEvents.some((object: SavedEvent) => object.title === event.title)
    ) {
      fetch("https://worker-turso-ts.reynoldsdolan.workers.dev/remove_event", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          title: event.title,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("delete", json);
          setUserSavedEvents(
            userSavedEvents.filter(
              (object: SavedEvent) => object.title !== event.title,
            ),
          );
        });
    } else {
      fetch("https://worker-turso-ts.reynoldsdolan.workers.dev/add_event", {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          title: event.title,
          link: event.link,
          location: event.location,
          exactDate: event.exactDate,
          date: event.date,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("fetch", json);
          setUserSavedEvents([
            ...userSavedEvents,
            {
              title: event.title,
              link: event.link,
              location: event.location,
              exactDate: event.exactDate,
              date: event.date,
            },
          ]);
        });
    }
    setIsLikeLoading(false);
  }

  useEffect(() => {
    if (!user?.id) return;
    async function fetchData(): Promise<SavedEvent[]> {
      return await fetch(
        `https://worker-turso-ts.reynoldsdolan.workers.dev/saved_events`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: user?.id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      )
        .then((res) => res.json())
        .catch((err) => console.log(err))
        .then((res) => {
          console.log(res);
          return res as SavedEvent[];
        });
    }
    fetchData().then((res) => {
      setUserSavedEvents(res);
    });
  }, [user]);

  useEffect(() => {
    async function fetchData(): Promise<Event[]> {
      return await getEvents();
    }
    fetchData().then((res) => {
      setEventData(res);
    });
  }, []);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([...eventData]);

  useEffect(() => {
    setFilteredEvents(
      eventData.filter((event) => {
        if (noGi === true) {
          if (event.link.includes("ibjjf") && event.title.includes("No-Gi")) {
            return IBJJF;
          } else if (
            event.link.includes("ajp") &&
            event.title.includes("NO-GI")
          ) {
            return AJP;
          } else if (event.title.includes("GRAPPLING INDUSTRIES")) {
            return GI;
          } else if (event.link.includes("naga")) {
            return NAGA;
          } else if (event.title.includes("ADCC")) {
            return ADCC;
          } else {
            return false;
          }
        } else if (onlyGi === true) {
          if (event.link.includes("ibjjf") && !event.title.includes("No-Gi")) {
            return IBJJF;
          } else if (
            event.link.includes("ajp") &&
            !event.title.includes("NO-GI")
          ) {
            return AJP;
          } else if (event.title.includes("GRAPPLING INDUSTRIES")) {
            return GI;
          } else if (event.link.includes("naga")) {
            return NAGA;
          } else if (event.title.includes("ADCC")) {
            return false;
          } else {
            return false;
          }
        } else {
          if (event.link.includes("ibjjf")) {
            return IBJJF;
          } else if (event.link.includes("ajp")) {
            return AJP;
          } else if (event.link.includes("naga")) {
            return NAGA;
          } else if (event.title.includes("ADCC")) {
            return ADCC;
          } else {
            return GI;
          }
        }
      }),
    );
  }, [AJP, GI, IBJJF, NAGA, ADCC, noGi, onlyGi, eventData]);

  const pins = useMemo(
    () =>
      filteredEvents.map((event, index) => {
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
                  : event.link.includes("naga")
                  ? { color1: "#330505", color2: "#121111" }
                  : event.title.includes("ADCC")
                  ? { color1: "#bf2828", color2: "#b87b7b" }
                  : { color1: "#f59b42", color2: "#dabe34" }
              }
            />
          </Marker>
        );
      }),
    [filteredEvents, popupInfo],
  );
  return (
    <>
      <div className="h-[calc(100svh-148px)] w-screen overscroll-none lg:h-[calc(100svh-168px)]">
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
                <div className="flex items-center justify-center gap-4">
                  <a
                    target="_new"
                    href={popupInfo.link}
                    className="text-blue-500 underline"
                  >
                    Visit Event Page
                  </a>
                  <SignedIn>
                    <button
                      className="flex items-center justify-center text-xl"
                      title={
                        userSavedEvents &&
                        userSavedEvents.some(
                          (object: SavedEvent) =>
                            object.title === popupInfo.title,
                        )
                          ? "Remove from my events"
                          : "Add to my events"
                      }
                      onClick={() => clickHandler(popupInfo)}
                    >
                      {userSavedEvents &&
                      userSavedEvents.some(
                        (object: SavedEvent) =>
                          object.title === popupInfo.title,
                      ) ? (
                        <AiFillStar className="fill-yellow-500" />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </button>
                  </SignedIn>
                </div>
              </div>
            </Popup>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mapboxgl-ctrl-group absolute right-[10px] top-[10px] z-10 h-[29px] px-2 text-black"
          >
            {isOpen ? "Close" : "Open Legend/Filtering"}
          </button>
          <Legend
            noGi={noGi}
            onlyGi={onlyGi}
            AJP={AJP}
            GI={GI}
            IBJJF={IBJJF}
            NAGA={NAGA}
            ADCC={ADCC}
            setNoGi={setNoGi}
            setOnlyGi={setOnlyGi}
            setAJP={setAJP}
            setGI={setGI}
            setIBJJF={setIBJJF}
            setNAGA={setNAGA}
            setADCC={setADCC}
            isOpen={isOpen}
          />
        </Map>
      </div>
    </>
  );
};

export default Home;
