import * as React from "react";

function Legend() {
  return (
    <div className="absolute right-2 top-2 z-10 rounded-md bg-neutral-200 p-1.5 text-neutral-700 md:p-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-3">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-800 md:h-6 md:w-6">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-200 md:h-2 md:w-2"></div>
          </div>
          <p className="text-[10px] font-semibold md:text-sm">IBJJF Events</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 md:h-6 md:w-6">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-100 md:h-2 md:w-2"></div>
          </div>
          <p className="text-[10px] font-semibold md:text-sm">
            Grappling Industries Events
          </p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Legend);
