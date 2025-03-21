import { PeoplePage } from "./pages/PeoplePage";
import { CharacterPage } from "./pages/CharacterPage";
import { PlanetsPage } from "./pages/PlanetsPage"; 
import { StarshipsPage } from "./pages/StarshipsPage"; 

export const App = () => {
  return (
    <div>
      <PeoplePage />
      <CharacterPage />
      <PlanetsPage /> 
      <StarshipsPage />  
    </div>
  );
}

export default App;
