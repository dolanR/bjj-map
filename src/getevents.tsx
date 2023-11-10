export interface Event {
  id: number;
  title: string;
  date: string;
  exactDate: Date;
  location: string;
  link: string;
  longitude: number;
  latitude: number;
}

async function getEvents(): Promise<Event[]> {
  return fetch("https://worker-turso-ts.reynoldsdolan.workers.dev/")
    .then((res) => res.json())
    .then((res) => {
      return res as Event[];
    });
}

export default getEvents;
