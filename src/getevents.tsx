interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  link: string;
  longitude: number;
  latitude: number;
}

async function getEvents(): Promise<Event[]> {
  return fetch("https://worker-turso-ts.reynoldsdolan.workers.dev/")
    .then((res) => res.json())
    .then((res) => {
      return res.rows.map((row: any) => {
        return {
          id: row[0],
          title: row[1],
          date: row[2],
          location: row[3],
          link: row[4],
          longitude: row[6],
          latitude: row[7],
        };
      }) as Event[];
    });
}

export default getEvents;
