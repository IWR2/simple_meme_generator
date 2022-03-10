import React from "react";
import Header from "./components/Header";
import Meme from "./components/Meme";
import Tutorial from "./components/Tutorial";
import Grid from "@mui/material/Grid";

/**
 * Renders each component.
 */
export default function App() {
  return (
    <div className="App">
      <Header />
      <Grid container spacing={3}>
        <Grid item xs="auto" md={4}>
          <Tutorial />
        </Grid>
        <Grid item xs="auto" md={4}>
          <Meme />
        </Grid>
      </Grid>
    </div>
  );
}
