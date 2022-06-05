import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native'
import {useState,useEffect} from 'react'
import RNPickerSelect from "react-native-picker-select";

const Categoria = ({element,index,onChange,onDelete,categorias}) => {
    const [categoria,setCategoria] = useState(element.categoria)
    const [number,setNumber] = useState(index)
    const [valido,setValido] = useState(element.valido)
    const [categoriasList,setCategoriasList] = useState([]);

    useEffect(()=>{
        let data = [...categoriasList]
        categorias.forEach((categoria)=>{
            let newCategoria = {
                label: categoria.item,
                value: categoria.id
            }
            data.push(newCategoria);
        })
        setCategoriasList(data)
    },[])

    const updateCat = (newCat) => {
        let newRCat
        categorias.forEach((categoria) => {
            if (newCat !== null && newCat.value === categoria.id) {newRCat = categoria;}
        })
        setCategoria(newRCat);
        verificarValidez();
        updateChanges();
    } 

    const updateChanges = () => {
        const updatedObject = {
            categoria: categoria,
            valido: valido
        }
        onChange(updatedObject,index)
    }

    const verificarValidez = () => {
        if (categoria!==null) setValido(true);
    }

      return (
        <View style={styles.containter}>
            <View style={{flexDirection:'column', alignItems:'center'}}>
                    <Text style={styles.categText}>Categoria</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <RNPickerSelect
                            value={categoria}
                            style={pickerSelectStyles}
                            items={categoriasList}
                            onValueChange={(cat) => updateCat(cat)}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {return <Image source={require('../../../assets/images/ui/dropDownArrow.png')}/>}}/>
                        <TouchableOpacity style={{alignItems:'flex-start', paddingLeft:40*widthFactor}}
                                            onPress={() => {onDelete(number)}}>
                            <Image source={require('../../../assets/images/ui/closeNoBack.png')}/>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}

const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

/*Agregar estilos*/
const styles = StyleSheet.create({
    containter:{
        paddingBottom:25*heightFactor,
    },
    categText:{
        alignSelf:'baseline',
        width: 73*widthFactor,
        height: 14*heightFactor,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12*heightFactor,
        opacity:0.4,
    },
    input:{}
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 18,
      paddingVertical: 8,
      paddingHorizontal: 0,
      borderWidth: 0,
      borderBottomWidth: 0.5,
      borderBottomColor: 'red',
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
        width: 285*widthFactor,
        height: 24*heightFactor,
        borderWidth: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        color: 'black',
        paddingBottom: 0,
        textAlignVertical: 'bottom',
    },
  });

export default Categoria