import React from "react";
import { Switch, Route } from "react-router-dom";
import PhotoGallery from "./components/GalleryView/GalleryView";
import ItemView from "./components/ItemView/ItemView";
import NotFound from "./components/NotFound/NotFound";

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <PhotoGallery />
    </Route>
    <Route exact path="/photos/:id">
      <ItemView />
    </Route>
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
