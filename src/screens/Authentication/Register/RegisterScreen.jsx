import { useState } from "react";
import { View, Image, StyleSheet, Text, Alert } from "react-native"
import Input from "../../../components/Application/Components/Input";
import MainButton from "../../../components/Application/Components/MainButton";
import SecondaryButton from "../../../components/Application/Components/SecondaryButton";
import axios from "axios";
import environment from "../../../constants/environment";

const RegisterScreen = ({navigation}) => {

    /* Pasar a formulario */
    const [email, setEmail] = useState();
    const [alias, setAlias] = useState();
    const [error, setError] = useState('');

    const onContinuePressed = () => {
        axios.post(`${environment.API_URL}/usuarios/chequear-primer-paso-registro`, {
            email: email,
            alias: alias
        })
        .then(res => navigation.navigate("FinalRegister", {email: email, alias: alias}))
        .catch(error => {
            setError(error.response.data.errorMessage)
        })
    }

    const onBackPressed = () => {
        navigation.navigate('Login')
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
           placeholder="Email" 
           value={email} 
           setValue={setEmail}
           />   
       <Input 
           style={styles.input}
           placeholder="Alias" 
           value={alias} 
           setValue={setAlias}        
           />   
        <Text style={{color:'red'}}>{error}</Text>   
       </View>
       
       <View style={styles.buttons}>
           <MainButton
               value="CONTINUAR"
               onPress={onContinuePressed}
               active={email && alias}
           />   
           <SecondaryButton
               value="VOLVER"
               onPress={onBackPressed}
           />
       </View>         
    </View>
    )
}

const styles = StyleSheet.create({
    pizza : {
        position: 'absolute',
        left: '37%',
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
        top: 150,
        alignItems: 'center',
    }
});

export default RegisterScreen;