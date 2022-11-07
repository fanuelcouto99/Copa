import { NativeBaseProvider, StatusBar } from "native-base";
import { AuthContextProvider } from "./src/contexts/AuthContexts";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { THEME } from './src/styles/theme';
import { SingIn } from './src/screens/SingIn';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        {
          fontsLoaded ? <SingIn /> : <Loading />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
};
