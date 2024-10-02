import './App.css';
import LandingPage from './ui/LandingPage';
import { Amplify } from 'aws-amplify';
import awsmobile from "./aws-exports";
import Uploader from './ui/resume/Uploader';

Amplify.configure(awsmobile);

function App() {
  return (
    <div className="App">
      <LandingPage />
      <Uploader />
    </div>
  );
}

export default App;
