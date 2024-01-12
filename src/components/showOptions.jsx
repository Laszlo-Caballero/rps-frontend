import renderIcon from "../func/renderIcon";
import resultText from "../func/resultText";

export function ShowOption({ option, optionOpponet, result, playAgain }) {
  return (
    <div className="w-full h-full flex">
      <div className="w-1/3 h-full flex flex-col items-center justify-center gap-y-5">
        <p>YOU PICKED</p>
        {renderIcon(option)}
      </div>
      <div className="w-1/3 h-full flex flex-col items-center justify-center gap-y-5">
        {result != null && (
          <>
            <p className="text-4xl font-BarlowBlod">{resultText(result)}</p>
            <button
              className="text-red-500 bg-white px-10 py-2 rounded-lg font-BarlowBlod"
              onClick={playAgain}
            >
              PLAY AGAIN
            </button>
          </>
        )}
      </div>
      <div className="w-1/3 h-full flex flex-col items-center justify-center gap-y-5">
        <p>THE HOUSE PICKED</p>
        {optionOpponet == "" ? (
          <div className="bg-black bg-opacity-20 h-[170px] w-[170px] rounded-full">
            {" "}
          </div>
        ) : (
          renderIcon(optionOpponet)
        )}
      </div>
    </div>
  );
}

export function ShowOptionMobile({ option, optionOpponet, result, playAgain }) {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-y-12">
      <div className="w-full h-1/3 flex justify-center gap-x-4">
        <div className="flex justify-center flex-col items-center gap-y-6">
          {renderIcon(option)}
          <p>YOU PICKED</p>
        </div>
        <div className="flex justify-center flex-col items-center gap-y-6">
          {optionOpponet == "" ? (
            <div className="bg-black bg-opacity-20 h-[170px] w-[170px] rounded-full">
              {" "}
            </div>
          ) : (
            renderIcon(optionOpponet)
          )}
          <p>THE HOUSE PICKED</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-6 items-center">
        {result != null && (
          <>
            <p className="text-6xl font-BarlowBlod">{resultText(result)}</p>
            <button
              className="bg-white text-slate-600 px-16 py-4 rounded-lg font-BarlowBlod"
              onClick={playAgain}
            >
              PLAY AGAIN
            </button>
          </>
        )}
      </div>
    </div>
  );
}
