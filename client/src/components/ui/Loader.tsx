import { Spinner } from "./spinner";

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner className="size-16 text-red-500" />
    </div>
  );
}

export default Loader;
