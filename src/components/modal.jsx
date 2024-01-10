import Close from "./../images/icon-close.svg?react";
import Rules from "./../images/image-rules.svg?react";
import { useState, useEffect } from "react";
function ModalRules({ onClick }) {
  const [mobileClose, setMobileClose] = useState(true);
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setMobileClose(false);
    }
  }, []);
  return (
    <div className="h-screen w-screen z-10 flexx absolute bg-opacity-50 bg-black flex items-center justify-center">
      <div className="lg:h-[43%] lg:w-[30%] mobile:w-full mobile:h-screen bg-white rounded-lg px-10 py-8">
        <header className="flex items-center lg:justify-between mobile:justify-center">
          <p className="text-black font-BarlowBlod text-4xl">RULES</p>
          {mobileClose && (
            <Close onClick={onClick} className="cursor-pointer" />
          )}
        </header>
        <section className="w-full lg:h-full  mobile:h-[90%] flex mobile:flex-col justify-center items-center">
          <Rules />
        </section>

        {!mobileClose && (
          <div className="flex w-full justify-center">
            <Close onClick={onClick} className="cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalRules;
