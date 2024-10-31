import Spinner from "./Spinner";

export default function () {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Spinner classes="mb-2" />
      <span className="ps-2">Loading....</span>
    </div>
  );
}
