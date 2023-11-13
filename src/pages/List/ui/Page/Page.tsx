import { FC, useEffect, useState } from "react";
import { Event } from "@/getevents";
import getEvents from "@/getevents";

const List: FC = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [matchChar, setMatchChar] = useState<string>("");

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
          <div className="mx-4 mb-28 grid grid-cols-1 gap-4 md:grid-cols-2">
            {eventData.map((event, index) => {
              const date = new Date();
              if (new Date(event.exactDate) < date) return null;
              if (
                event.title.toLowerCase().includes(matchChar.toLowerCase()) ||
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
                      <a
                        href={event.link}
                        className={`btn btn-sm m-auto min-w-[175px] max-w-[50%] font-bold ${
                          event.title.includes("IBJJF")
                            ? "bg-blue-800 text-yellow-300 hover:bg-blue-700"
                            : event.title.includes("AJP")
                            ? "bg-indigo-950 text-purple-600 hover:bg-indigo-900"
                            : "bg-orange-400 text-black hover:bg-orange-300"
                        }`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Event Page
                      </a>
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
