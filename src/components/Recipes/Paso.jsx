import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, StyleSheet, ScrollView, ImageBackground,Pressable} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react'
import uuid from 'react-native-uuid';


const Paso = ({element,index,onChange,onDelete, isViewMode=false}) => {
    const [number,setNumber] = useState(index+1);
    const [titulo,setTitulo] = useState(element.titulo);
    const [descripcion,setDescripcion] = useState(element.descripcion);
    const [media,setMedia] = useState(element.media ? element.media : []);
    const [valido,setValido] = useState(element.valido);

    const selectFile = async () => {       
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [6, 3],
            quality: 1,
          });  
        
       if (!result.cancelled) {
         setMedia([...media,result.uri]);
         updateChanges();
       }
     }

    const updateTitle = (newTitle) => {
        setTitulo(newTitle);
        verificarValidez();
        updateChanges();
    }

    const updateDescripcion = (newDescripcion) => {
        setDescripcion(newDescripcion);
        verificarValidez();
        updateChanges();
    }

    const removeImage = (index) => {
        let mediaCopy = [...media];
        mediaCopy.splice(index,1);
        setMedia(mediaCopy);
    }

    const updateChanges = () => {
        const updatedObject = {
            id: element.id,
            number: number,
            titulo: titulo,
            descripcion: descripcion,
            media: media,
            valido: valido
        }
        if(!isViewMode){
            onChange(updatedObject,index)
        }
    }

    const verificarValidez = () => {
        if (titulo!==null && descripcion!==null) setValido(true);
    }

    return (
        <Pressable onLongPress={()=>onDelete(number-1)} style={styles.containter}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>{number}</Text>
                </View>
                <View style={{paddingLeft:20*widthFactor}}>
                    <Text style={styles.titleText}>Nombre</Text>
                    <TextInput value={titulo} 
                                style={styles.titleInput}
                                onChangeText={(title) => updateTitle(title)}
                                editable={!isViewMode}/>
                </View>
            </View>
            <TextInput  style={styles.descInput}
                            placeholder='Descripcion'
                            value={descripcion}
                            multiline={true}
                            onChangeText={(descripcion) => updateDescripcion(descripcion)}
                            editable={!isViewMode}/>
            <ScrollView horizontal={true}>
                {media?.map((mediaItem,index) => (
                    <ImageBackground 
                    key={uuid.v4()}
                    source={{uri: mediaItem ? mediaItem : null}}  
                    style={styles.imgBox}>                      
                         <TouchableOpacity onPress={() => isViewMode ? {} : removeImage(index)}>
                            <Image source={mediaItem && !isViewMode ? require('../../../assets/images/ui/close.png') : null} style={styles.cross}/>
                        </TouchableOpacity>                  
                    </ImageBackground>
                ))}
                 {!isViewMode 
                 ? <TouchableOpacity style={styles.imgBox}
                                    onPress={selectFile}>
                        <ImageBackground source={require('../../../assets/images/ui/img.png')}
                                style={{width: 38 * widthFactor, height: 40 * heightFactor}}>
                        </ImageBackground>                    
                </TouchableOpacity> 
                : <></>}            
            </ScrollView>
        </Pressable>
        
    )
}

const widthFactor = Dimensions.get('window').width/390;
    const heightFactor = Dimensions.get('window').height/844;

const styles = StyleSheet.create({
        containter:{
            marginTop: 10*heightFactor,
            width: 345*widthFactor,
            height: 'auto',
            borderRadius: 8,
            backgroundColor: '#FFFFFF',
            paddingTop: 7*heightFactor,
            paddingLeft: 15* widthFactor,
            paddingBottom: 10 * widthFactor
        },
        paso:{
            width:'100%',
            height:'100%'
        },
        numberContainer:{
            width: 26*widthFactor,
            height: 26*heightFactor,
            backgroundColor: '#FF4B3A',
            borderRadius: 20,
            alignItems:'center',
            justifyContent:'center'
        },
        numberText:{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 16*heightFactor,
            color: '#FFFFFF'
        },
        titleText:{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 12*heightFactor,
            color:'#000000',
            opacity:0.4
        },
        titleInput:{
            borderBottomColor: '#000000',
            borderBottomWidth: 0.5,
            width: 257*widthFactor,
            height: 20*heightFactor,
            textAlignVertical: 'bottom',
            paddingBottom: 0,
            color: 'black'
        },
        descInput:{
            width: 303*widthFactor,
            height: 66*heightFactor,
            borderColor: '#3D3D3D',
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 16*heightFactor,
            paddingTop: 7*heightFactor,
            paddingLeft: 8*widthFactor,
            textAlign:'left',
            textAlignVertical: 'top',
            color: 'black'
        },
        img: {
            width: '100%',
            height: '100%',
            borderRadius: 8,
            marginTop: 16*heightFactor,
            marginRight: 8*widthFactor
        },
        cross: {
            width: 37*widthFactor,
            height: 38*heightFactor,
            alignSelf: 'flex-end'
        },
        imgBox:{
            width: 160.85*widthFactor,
            height: 70.63*heightFactor,
            borderRadius: 8,
            backgroundColor: '#C4C4C480',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16*heightFactor,
            marginRight: 8*widthFactor
        }
});

export default Paso