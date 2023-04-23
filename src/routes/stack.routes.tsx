import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EditProfile } from '../screens/EditProfile';
import { Event } from '../screens/Event';
import { FriendsList } from '../screens/FriendsList';
import { Settings } from '../screens/Settings';
import { Ticket } from '../screens/Ticket';
import { AppRoutes } from './app.routes';

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="AppRoutes" component={AppRoutes} />
      <Screen name="Ticket" component={Ticket} />
      <Screen name="Event" component={Event} />
      <Screen name="FriendsList" component={FriendsList} />
      <Screen name="Settings" component={Settings} />
      <Screen name="EditProfile" component={EditProfile} />
    </Navigator>
  );
}
