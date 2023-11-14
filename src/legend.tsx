import * as React from "react";

type LegendProps = {
  AJP: boolean;
  GI: boolean;
  IBJJF: boolean;
  setAJP: React.Dispatch<React.SetStateAction<boolean>>;
  setGI: React.Dispatch<React.SetStateAction<boolean>>;
  setIBJJF: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const Legend = ({
  AJP,
  GI,
  IBJJF,
  setAJP,
  setGI,
  setIBJJF,
  isOpen,
}: LegendProps) => {
  return (
    isOpen && (
      <div className="absolute right-[10px] top-[49px] z-10 rounded-md bg-neutral-200 p-1.5 text-neutral-700 md:p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-800 md:h-6 md:w-6">
              <div className="h-1.5 w-1.5 rounded-full bg-orange-200 md:h-2 md:w-2"></div>
            </div>
            <p className="text-[10px] font-semibold md:text-sm">IBJJF</p>
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
            <p className="text-[10px] font-semibold md:text-sm">
              Grappling Industries
            </p>
            <input type="checkbox" checked={GI} onChange={() => setGI(!GI)} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-950 md:h-6 md:w-6">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-900 md:h-2 md:w-2"></div>
            </div>
            <p className="text-[10px] font-semibold md:text-sm">AJP</p>
            <input
              type="checkbox"
              checked={AJP}
              onChange={() => setAJP(!AJP)}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(Legend);
