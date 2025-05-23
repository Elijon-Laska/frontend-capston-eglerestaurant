import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div id="root">
      <div className="main-content">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;
