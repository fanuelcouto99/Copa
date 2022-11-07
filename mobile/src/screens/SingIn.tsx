import { Center, Text, Icon } from 'native-base';
import { Button } from '../components/Button';
import { Fontisto } from '@expo/vector-icons';
import Logo from '../assets/logo.svg';

export function SingIn() {
    return (
        <Center flex={1} bgColor="gray.900" p={7}>
            <Logo width={212} height={40} />

            <Button
                mt={12}
                title="ENTRAR COM GOOGLE"
                type="SECONDARY"
                leftIcon={<Icon as={Fontisto} name="google" color="#FFF" size="md" />}
            />

            <Text color="white" textAlign="center" mt={4}>
                Não utilizamos nenhuma informação além {'\n'}
                do seu e-mail para criação de sua conta.
            </Text>
        </Center>
    );
};