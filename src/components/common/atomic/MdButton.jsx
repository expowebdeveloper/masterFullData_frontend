import SmallSpinner from "./SmallSpinner";

const MdButton = ({ text, isLoading }) => {
  return (
    <>
      <button className="common-btn" type="submit">
        {isLoading ? <SmallSpinner /> : text}{" "}
      </button>
    </>
  );
};

export default MdButton;
