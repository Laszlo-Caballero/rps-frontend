import Close from "./../images/icon-close.svg?react";
import Rules from "./../images/image-rules.svg?react";
function ModalRules({ onClick }) {
  return (
    <div className="h-screen w-screen z-10 flexx absolute bg-opacity-50 bg-black flex items-center justify-center">
      <div className="h-[43%] w-[30%] bg-white rounded-lg px-10 py-8">
        <header className="flex items-center justify-between">
          <p className="text-black font-BarlowBlod text-4xl">RULES</p>
          <Close onClick={onClick} className="cursor-pointer" />
        </header>
        <section className="w-full h-full flex justify-center items-center">
          <Rules />
        </section>
      </div>
    </div>
  );
}

export default ModalRules;
