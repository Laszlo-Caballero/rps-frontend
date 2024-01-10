import Logo from "./../images/logo.svg?react";
function Header({ score }) {
  return (
    <header className="border-white border-2 mobile:w-[90%] rounded-xl p-5 flex justify-between mt-6 lg:w-3/5">
      <Logo />
      <div className="h-[98px] bg-white flex flex-col items-center mobile:w-[35%] lg:w-2/12 justify-center rounded-lg">
        {" "}
        <p className="text-TextScore">SCORE</p>
        <p className="text-DarkText text-6xl pb-1 font-BarlowBlod">{score}</p>
      </div>
    </header>
  );
}

export default Header;
