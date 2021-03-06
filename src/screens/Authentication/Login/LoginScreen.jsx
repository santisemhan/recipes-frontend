import axios from "axios";
import { useState } from "react";
import { View, Image, StyleSheet, Text, Alert, Pressable } from "react-native"
import { connect } from "react-redux";
import Input from "../../../components/Application/Components/Input";
import MainButton from "../../../components/Application/Components/MainButton";
import SecondaryButton from "../../../components/Application/Components/SecondaryButton";
import environment from "../../../constants/environment";
import { signIn } from "../../../stores/Authentication/Actions/AuthenticationActions";

const LoginScreen = ({navigation, login}) => {


    /* Pasar a formulario */
    const [alias, setAlias] = useState('');
    const [password, setPassword] = useState('');

    const onLoginPressed = () => {
        axios.post(`${environment.API_URL}/usuarios/iniciar-sesion`, {
            alias: alias,
            contraseña: password
        }).then(res => login(alias, "emptyJWTToken"))
        .catch(error => Alert.alert("Atención!","Alias o contraseña incorrecta"))
    }

    const onRegisterPressed = () => {
        navigation.navigate('Register')
    }
    
    const onRecoverPasswordPressed = () => {
        navigation.navigate('RecoverPassword')
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
               <Pressable onPress={onRecoverPasswordPressed}>
                    <Text style={styles.forgot}>
                        Olvidaste tu contraseña?
                    </Text>
               </Pressable>
           </View>
           
           <View style={styles.buttons}>
               <MainButton
                   value="INICIAR SESION"
                   onPress={onLoginPressed}
                   active={true}
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
    }
});

const mapStateToProps = state => ({
    token: state.authentication.userToken
  });

const mapDispatchToProps = dispatch => {
    return {
      login: (userName, userToken) => dispatch(signIn(userName, userToken)),
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);