import { SavedEvent } from "@/pages/Home/ui/Page/Page";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { FC, useEffect, useRef, useState } from "react";
import { Event } from "@/getevents";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const MyEvents: FC = () => {
  const [userSavedEvents, setUserSavedEvents] = useState<SavedEvent[]>([]);
  const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
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
    }
    setIsLikeLoading(false);
  }

  return (
    <div className="mx-4 mb-28">
      <h1 className="mt-4 text-center text-2xl md:text-3xl xl:text-4xl">
        My Saved Events
      </h1>
      <p className="mb-8 text-center text-base text-neutral-600 md:text-lg xl:text-xl">
        Sorted by ascending date
      </p>
      <dialog ref={modalRef} className="modal text-center">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Warning!</h3>
          <p className="py-4">
            Are you sure you want to remove this event? You'll have to go to the
            map or list to favorite it again.
          </p>
          <div className="modal-action flex w-full items-center justify-center">
            <form method="dialog" className="flex gap-4">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn bg-red-800  text-neutral-300 hover:bg-red-500"
                onClick={() => {
                  modalRef.current?.close();
                  clickHandler(selectedEvent as Event);
                }}
              >
                Yes I'm sure
              </button>
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="mx-4 mb-28 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userSavedEvents
          .sort((a, b) => {
            return (
              new Date(a.exactDate).getTime() - new Date(b.exactDate).getTime()
            );
          })
          .map((event, index) => {
            const date = new Date();
            if (new Date(event.exactDate) < date) return null;
            {
              return (
                <div
                  key={`marker-${index}`}
                  className="card bordered shadow-lg"
                >
                  <div className="card-body text-sm md:text-base xl:text-lg">
                    <h2 className="card-title text-base md:text-lg">
                      {event.title}
                    </h2>
                    <p>{event.location}</p>
                    <p>
                      {new Date(event.exactDate).toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
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
                          onClick={() => {
                            setSelectedEvent(event as Event);
                            modalRef.current?.showModal();
                          }}
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
          })}
      </div>
    </div>
  );
};

export default MyEvents;
