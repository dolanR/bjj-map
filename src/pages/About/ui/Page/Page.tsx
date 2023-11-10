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
              I wanted a simple map that had markers and popups for all the
              Jiu-Jitsu competitions I was interested in doing. Currently, IBJJF
              and Grappling Industries competitions are listed on their own
              individual websites, and there was no easy way to filter them both
              using one website. This website aims to solve that problem, not
              only for myself, but for anyone else who is too lazy to go to both
              websites to find events.
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
              Things I'm likely going to add: more events (AJP specifically),
              event filters for the map, and login/user authentication with some
              sort of favorited events section.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
