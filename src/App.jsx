import "./App.css";

import IntroSequence from "./sections/IntroSequence/IntroSequence";
import Skills from "./sections/Skills/Skills";
import SubmarineJourney from "./sections/SubmarineJourney/SubmarineJourney";

function App() {
  return (
    <main className="page">
      <IntroSequence />
      <Skills />
      <SubmarineJourney />
    </main>
  );
}

export default App;

