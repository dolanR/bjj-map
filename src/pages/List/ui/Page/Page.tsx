import { FC, useEffect, useState } from "react";
import { Event } from "@/getevents";
import getEvents from "@/getevents";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { SavedEvent } from "@/pages/Home/ui/Page/Page";

const List: FC = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [matchChar, setMatchChar] = useState<string>("");
  const [userSavedEvents, setUserSavedEvents] = useState<SavedEvent[]>([]);
  const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);
  const { user } = useUser();

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
  function clickHandler(event: Event) {
    console.log("clicked");
    if (!user?.id) return;
    if (isLikeLoading) return;
    setIsLikeLoading(true);
    if (
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
    async function fetchData(): Promise<Event[]> {
      return await getEvents();
    }
    fetchData().then((res) => {
      setEventData(res);
    });
  }, []);
  return (
    <>
      <section>
        <div className="hero flex min-h-[calc(100dvh-64px)] flex-col bg-base-200">
          <input
            className="input input-bordered mt-4 w-80"
            type="text"
            placeholder="Search...   e.g. IBJJF, March 2024, etc."
            onChange={(e) => {
              setMatchChar(e.target.value);
            }}
          />
          <div className="mx-4 mb-28 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {eventData.map((event, index) => {
              const date = new Date();
              if (new Date(event.exactDate) < date) return null;
              if (
                event.title.toLowerCase().includes(matchChar.toLowerCase()) ||
                event.location
                  .toLowerCase()
                  .includes(matchChar.toLowerCase()) ||
                event.location
                  .toLowerCase()
                  .includes(matchChar.toLowerCase()) ||
                new Date(event.exactDate)
                  .toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  .toLowerCase()
                  .includes(matchChar.toLowerCase()) ||
                new Date(event.exactDate)
                  .toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                  })
                  .toLowerCase()
                  .includes(matchChar.toLowerCase())
              ) {
                return (
                  <div
                    key={`marker-${index}`}
                    className="card bordered shadow-lg"
                  >
                    <div className="card-body text-sm md:text-base xl:text-lg">
                      <h2 className="card-title text-base md:text-xl xl:text-2xl">
                        {event.title}
                      </h2>
                      <p>{event.location}</p>
                      <p>
                        {new Date(event.exactDate).toLocaleDateString(
                          undefined,
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                      <div className="mt-3 flex items-center justify-center">
                        <a
                          href={event.link}
                          className={`btn btn-sm mx-auto min-w-[175px] max-w-[50%] font-bold ${
                            event.title.includes("IBJJF")
                              ? "bg-blue-800 text-white hover:bg-blue-700"
                              : event.title.includes("AJP")
                              ? "bg-indigo-950 text-white hover:bg-indigo-900"
                              : event.title.includes("ADCC")
                              ? "bg-red-700 text-white hover:bg-red-400"
                              : event.link.includes("naga")
                              ? "bg-rose-950 text-white hover:bg-rose-900"
                              : "bg-orange-500 text-white hover:bg-orange-300"
                          }`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Event Page
                        </a>
                        <SignedIn>
                          <button
                            className="flex items-center justify-center text-xl"
                            title={
                              userSavedEvents.some(
                                (object: SavedEvent) =>
                                  object.title === event.title,
                              )
                                ? "Remove from my events"
                                : "Add to my events"
                            }
                            onClick={() => clickHandler(event)}
                          >
                            {userSavedEvents.some(
                              (object: SavedEvent) =>
                                object.title === event.title,
                            ) ? (
                              <AiFillStar className="fill-yellow-500" />
                            ) : (
                              <AiOutlineStar />
                            )}
                          </button>
                        </SignedIn>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default List;
