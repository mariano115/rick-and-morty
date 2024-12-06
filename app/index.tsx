import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from "./myTabs";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}