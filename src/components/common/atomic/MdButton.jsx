import SmallSpinner from "./SmallSpinner";

const MdButton = ({ text, isLoading }) => {
  return (
    <>
      <button className="common-btn">
        {isLoading ? <SmallSpinner /> : text}{" "}
      </button>
    </>
  );
};

export default MdButton;
