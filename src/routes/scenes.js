import React from "react";
import { Actions, Scene, ActionConst } from "react-native-router-flux";
import LoginContainer from "./Login/containers/LoginContainer";
import HomeContainer from "./Home/containers/HomeContainer";
import TrackDriverContainer from "./TrackDriver/containers/TrackDriverContainer";
import BookingsContainer from "./Bookings/containers/BookingsContainer";
import BookingDetailContainer from "./BookingDetail/containers/BookingDetailContainer";

const scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene key="login" panHandlers={null} component={LoginContainer} title="login" initial />
        <Scene duration={0} key="home" panHandlers={null} component={HomeContainer} title="home" type={ActionConst.RESET} />
        <Scene key="trackDriver" panHandlers={null} component={TrackDriverContainer} title="trackDriver" />
        <Scene key="bookings" panHandlers={null} component={BookingsContainer} title="bookings" />
        <Scene key="bookingDetail" panHandlers={null} component={BookingDetailContainer} title="bookingDetail" />
    </Scene>
);

export default scenes;