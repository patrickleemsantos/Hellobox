import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import LoginContainer from "./Login/containers/LoginContainer";
import HomeContainer from "./Home/containers/HomeContainer";
import TrackDriverContainer from "./TrackDriver/containers/TrackDriverContainer";

const scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene key="login" component={LoginContainer} title="login" initial />
        <Scene key="home" component={HomeContainer} title="home" />
        <Scene key="trackDriver" component={TrackDriverContainer} title="trackDriver" />
    </Scene>
);

export default scenes;