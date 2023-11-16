import * as React from "react";

type LegendProps = {
  noGi: boolean;
  onlyGi: boolean;
  AJP: boolean;
  GI: boolean;
  IBJJF: boolean;
  NAGA: boolean;
  ADCC: boolean;
  setNoGi: React.Dispatch<React.SetStateAction<boolean>>;
  setOnlyGi: React.Dispatch<React.SetStateAction<boolean>>;
  setAJP: React.Dispatch<React.SetStateAction<boolean>>;
  setGI: React.Dispatch<React.SetStateAction<boolean>>;
  setIBJJF: React.Dispatch<React.SetStateAction<boolean>>;
  setNAGA: React.Dispatch<React.SetStateAction<boolean>>;
  setADCC: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const Legend = ({
  noGi,
  onlyGi,
  AJP,
  GI,
  IBJJF,
  NAGA,
  ADCC,
  setNoGi,
  setOnlyGi,
  setAJP,
  setGI,
  setIBJJF,
  setNAGA,
  setADCC,
  isOpen,
}: LegendProps) => {
  return (
    isOpen && (
      <div className="absolute right-[10px] top-[49px] z-10 rounded-md bg-neutral-200 p-1.5 text-neutral-700 md:p-3">
        <div className="flex flex-col gap-[2px] md:gap-2">
          <div className="flex items-center justify-center gap-2">
            <p className="text-[11px] font-semibold md:text-sm">Only Gi</p>
            <input
              type="checkbox"
              checked={onlyGi}
              onChange={() => {
                if (noGi && !onlyGi) setNoGi(!noGi);
                setOnlyGi(!onlyGi);
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-[11px] font-semibold md:text-sm">Only No-Gi</p>
            <input
              type="checkbox"
              checked={noGi}
              onChange={() => {
                if (onlyGi && !noGi) setOnlyGi(!onlyGi);
                setNoGi(!noGi);
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-800 md:h-6 md:w-6">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-200 md:h-2 md:w-2"></div>
            </div>
            <p className="text-[11px] font-semibold md:text-sm">IBJJF</p>
            <input
              type="checkbox"
              checked={IBJJF}
              onChange={() => setIBJJF(!IBJJF)}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 md:h-6 md:w-6">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-100 md:h-2 md:w-2"></div>
            </div>
            <p className="text-[11px] font-semibold md:text-sm">
              Grappling Industries
            </p>
            <input type="checkbox" checked={GI} onChange={() => setGI(!GI)} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-700 md:h-6 md:w-6">
              <div className="h-1.5 w-1.5 rounded-full bg-red-300 md:h-2 md:w-2"></div>
            </div>
            <p className="text-[11px] font-semibold md:text-sm">ADCC</p>
            <input
              type="checkbox"
              checked={ADCC}
              onChange={() => setADCC(!ADCC)}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-950 md:h-6 md:w-6">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-900 md:h-2 md:w-2"></div>
            </div>
            <p className="text-[11px] font-semibold md:text-sm">AJP</p>
            <input
              type="checkbox"
              checked={AJP}
              onChange={() => setAJP(!AJP)}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-950 md:h-6 md:w-6">
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-800 md:h-2 md:w-2"></div>
            </div>
            <p className="text-[11px] font-semibold md:text-sm">NAGA</p>
            <input
              type="checkbox"
              checked={NAGA}
              onChange={() => setNAGA(!NAGA)}
            />
          </div>
          <p className="spacing mx-auto max-w-[200px] text-[11px] leading-tight md:text-sm">
            The map becomes quite laggy after having so many events on. To
            reduce the lag, try turning off some of the event filters or
            filtering by gi/no-gi.
          </p>
          <p className="mx-auto max-w-[200px] text-[11px] leading-tight text-neutral-400 md:text-sm">
            *Not all events are on the map because some had no coordinates on
            their webpage, so I banished them to Antarctica. However, the list
            page of this website contains all events*
          </p>
        </div>
      </div>
    )
  );
};

export default React.memo(Legend);
