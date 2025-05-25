import { Workout } from "./feature";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Workout />
    </>
  );
};

export default App;
