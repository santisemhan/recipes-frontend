import { View, TextInput, StyleSheet } from "react-native"

const Input = ({value, setValue, placeholder, secureTextEntry, width = '100%', height = 'auto', keyboardType="default"}) => {  
    return (
        <View style={[styles.container, {width: width, height: height}]}>
            <TextInput 
             style={styles.input}
             value={value}
             onChangeText={setValue}
             placeholder={placeholder}
             secureTextEntry={secureTextEntry}
             keyboardType={keyboardType}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(196, 196, 196, .2)',

        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 8,

        paddingHorizontal: 10,
        marginVertical: 5
    },
    input : {
        padding: 5,
        fontSize: 15,
    }
});

export default Input;