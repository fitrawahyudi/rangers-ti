import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Team from "./components/Team";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Rangers TI - Pengabdian kepada masyarakat</title>
      </Helmet>
      <Navbar />
      <Hero />
      <About />
      <Team />
      <Events />
      <Gallery />
      <Contacts />
      <Footer />
    </div>
  );
}

export default App;
