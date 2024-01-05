function Option({ element, colorClass, onClick }) {
  return (
    <div
      className={`h-[170px] w-[170px] flex justify-center items-center bg-gradient-to-b rounded-full cursor-pointer ${colorClass}`}
      onClick={onClick}
    >
      <span className="bg-white w-32 h-32 rounded-full flex items-center justify-center">
        {element}
      </span>
    </div>
  );
}

export default Option;
