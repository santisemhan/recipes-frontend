import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import {useState} from 'react'
import MainButton from "../../../components/Application/Components/MainButton";
import Paso from "../../../components/Recipes/Paso";

const AddPasosScreen = () => {
    const [pasos,setPasos] = useState([]);

    const agregarPaso = () => {
        const numero = pasos.length + 1 
        const newPaso = {
            number: {numero},
            title: "",
            descripcion: "",
            images: []
        }
        setPasos([...pasos,newPaso]);
    }

    return (
        <View style={{flexDirection:'column', alignItems:'center'}}>
            <View style={{flexDirection:'row' , paddingTop: 49*heightFactor, width: '100%'}}>
                <Image style={styles.arrowBtn} source={require('../../../../assets/images/ui/backArrow.png')}/>
                <Text style={styles.headerText}>Pasos</Text>
            </View>
            {pasos.map((element) => (
                <Paso element/>
            ))}
            <TouchableOpacity style={styles.botonAgregar} onPress={() => agregarPaso()}>
                <Text style={styles.agregarText}>+</Text>
            </TouchableOpacity>
            <View style = {styles.mainButton}>
                <MainButton
                    value="PUBLICAR"
                    onPress={null}
                    active = {false}/>
            </View>  
        </View>
    )
    }

    const widthFactor = Dimensions.get('window').width/390;
    const heightFactor = Dimensions.get('window').height/844;

    const styles = StyleSheet.create({
        arrowBtn:{
            width: 31*widthFactor,
            height: 31*heightFactor,
            alignSelf: 'flex-end',
            marginLeft: 21*widthFactor,
        },
        headerText:{
            width: 113*widthFactor,
            height: 42*heightFactor,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 36*heightFactor,
            color: "#FF4B3A",
            paddingLeft: 13*widthFactor,
        },
        botonAgregar:{
            marginTop:15*heightFactor,
            borderRadius:100,
            width: 58*widthFactor,
            height: 58*heightFactor,
            backgroundColor: '#FF4B3A',
            alignItems:'center'
        },
        agregarText:{
            fontSize: 42*heightFactor,
            color: '#FFFFFF',
            margin:0
        },
        mainButton:{
            position:'absolute',
            width: '100%',
            top: 651*heightFactor,
            alignItems:'center'
        }
});

export default AddPasosScreen;