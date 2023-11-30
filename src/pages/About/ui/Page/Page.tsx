import { FC } from "react";

const About: FC = () => {
  return (
    <>
      <section>
        <div className="flex min-h-[calc(100dvh-148px)] w-screen flex-col items-center justify-center bg-base-200 sm:min-h-[calc(100dvh-148px)] md:min-h-[calc(100dvh-168px)]">
          <div className="mb-20 flex max-w-[950px] flex-col gap-8 p-4 sm:p-12">
            <h1 className="text-3xl">
              &nbsp;&nbsp;&nbsp;This website was the goal I had in mind when I
              first began teaching myself to code around April, 2023
            </h1>
            <p>
              And as of November 10, 2023, it was fully functional and mobile
              responsive! I wanted a simple map that had markers and popups for
              all the Jiu-Jitsu competitions I was interested in doing.
              Currently, IBJJF and Grappling Industries competitions are listed
              on their own individual websites, as well as some other event
              organizations, and there was no easy way to filter them all using
              one website. This website aims to solve that problem, not only for
              myself, but for anyone else who is too lazy to go to each
              organization's websites to find events.
            </p>
            <p>
              In summary, I built a web scraper using the JavaScript Puppeteer
              library and TypeScript to scrape the IBJJF and Grappling
              Industries websites for their events, and I sorted and pushed the
              data into a Turso SQLite database. I used a Cloudflare Worker to
              make an API endpoint that returns the data from the database, and
              I used TypeScript, React, Tailwind CSS, and Mapbox GL JS to build
              this website.
            </p>
            <p>
              Things I'm likely going to add: more events, event filters for the
              map, login/user authentication with some sort of favorited events
              section, and a way to visually clarify events with similar
              latitude/longitudes.
            </p>
            <p>
              Update November 13th, 2023: AJP Events have been added to the
              database/map/list and added filters to the map legend.
            </p>
            <p>
              Update November 16th, 2023: NAGA and ADCC Events have been added
              to the database/map/list and added Only Gi and Only No-Gi filters
              to the map legend.
            </p>
            <p>
              Update November 30th, 2023: I've added user authentication with
              Clerk and its' webhooks to register user data into the
              aforementioned turso database so each user can save events to
              their respective My Events page. For now it's simply events that
              can be picked out from the map or list, but I'm working on adding
              a way to add custom events so people aren't limited to just the
              events that the web scraper works on. Also updated the API
              endpoint to accomodate all of the new requests.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
