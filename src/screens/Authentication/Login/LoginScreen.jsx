import { useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native"
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions"
import Input from "../../../components/Application/Components/Input";
import MainButton from "../../../components/Application/Components/MainButton";
import SecondaryButton from "../../../components/Application/Components/SecondaryButton";

const LoginScreen = ({navigation}) => {

    /* Screen en progreso */

    /* Pasar a formulario */
    const [alias, setAlias] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const onLoginPressed = () => {
        
    }

    const onRegisterPressed = () => {
        navigation.navigate('Register')
    }
    
    return (
        <View>
            <Image
                style={styles.pizza}
                resizeMode="contain"
                source={require('../../../../assets/images/ui/pizza.png')}
            />

           <Text style={styles.logo}>
             Recetas AppName
           </Text>

           <View style={styles.input}>
               <Input 
               style={styles.input}
               placeholder="Alias" 
               value={alias} 
               setValue={setAlias}
               />   
           <Input 
               style={styles.input}
               placeholder="Contraseña" 
               value={password} 
               setValue={setPassword}
               secureTextEntry
               />   
               <Text style={styles.forgot}>
                   Olvidaste tu contraseña?
               </Text>
           </View>
           
           <View style={styles.buttons}>
               <MainButton
                   value="INICIAR SESION"
                   onPress={onLoginPressed}
               />   
               <SecondaryButton
                   value="REGISTRARSE"
                   onPress={onRegisterPressed}
               />
           </View>         
        </View>
    )
}

const styles = StyleSheet.create({
    pizza : {
        position: 'absolute',
        left: '37%',
        top: '3%'
    },
    logo : {
        color: '#FF4B3A',
        fontFamily: "AsapCondensed-Bold",
        fontSize: 65,
        marginTop: '30%',
        marginBottom: '5%',
        marginLeft: '7%'    
    },
    input : {
        width: '100%',
        padding: 20,
        top: '10%',
        alignItems: 'center'
    },
    decoration : {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200
    },
    forgot: {
        color: '#FF4B3A',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: '30%'
    },
    buttons : {
        alignItems: 'center',
        top: '15%'
    }
});

export default LoginScreen;