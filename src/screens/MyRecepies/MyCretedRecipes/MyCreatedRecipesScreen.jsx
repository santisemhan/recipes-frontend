import { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl  } from "react-native"
import { connect } from "react-redux";
import Input from "../../../components/Application/Components/Input";
import FilterIcon from "../../../components/Application/Icons/FilterIcon";
import LogoutIcon from "../../../components/Application/Icons/LogoutIcon";
import Card from "../../../components/Recipes/Card";
import { signOut } from "../../../stores/Authentication/Actions/AuthenticationActions";
import axios from "axios";
import environment from "../../../constants/environment";
import { useIsFocused } from "@react-navigation/native";
import Filter from "../../../components/Recipes/Filter";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {CREAR} from "../../../stores/CreateRecipe/Constants/index";
import {cambiarCrear,empty} from "../../../stores/CreateRecipe/Actions/RecipeActions";

const MyCreatedRecipesScreen = ({navigation, logout, nickName,vaciar,changeCrear}) => {
    const isFocused = useIsFocused();
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filter, setFilter] = useState({
        filter : {
            nombre : '',
            tipoPlatos : [],
            ingredientes : [],
            ingredientesExcluidos: [],
            nickName: '',
            usuarioLogueado : nickName,
            soloFavoritos : false,
            soloPropias : true
        },
        pageNumber : 1,
        pageSize : 20,
        sortField : 'RecipeId',
        sortOrder : 'DESC'
    })
    const [refreshing, setRefreshing] = useState(false);
    const [personalizatedRecipes, setPersonalizatedRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([])

    useEffect(async () => {
        loadRecipes();
        await loadPersonalizatedRecipes();
        await loadSavedRecipes();
        changeCrear(CREAR)
        vaciar()
    }, [isFocused, filter])

    const loadRecipes = () => {
        setRefreshing(true);
        axios.post(`${environment.API_URL}/recetas/buscar`, filter)
            .then(response => {
                setRecipes(response.data.items)
                setFilteredRecipes(response.data.items)
            })
            .catch(error => console.log(error)) 
            .finally(f => setRefreshing(false))     
    }

    const loadPersonalizatedRecipes = async () => {
        try {
            let savedRecipes = JSON.parse(await AsyncStorage.getItem('personalizated-recipes')) || [];
            setPersonalizatedRecipes(savedRecipes);
        } catch (e) {
            //error
        }
    }

    const loadSavedRecipes = async () => {
        try {
            let savedRecipes = JSON.parse(await AsyncStorage.getItem('later-recipe')) || [];
            setSavedRecipes(savedRecipes);
        } catch (e) {
            //error
        }
    }

    const filterRecipes = (value) => {
        let copyRecipe = [...recipes]
        setFilteredRecipes(copyRecipe.filter(r => r.nombre.startsWith(value)))
    }

    const onLogout = async () => {
        const keys = await AsyncStorage.getAllKeys();
        for(const key of keys){
            await AsyncStorage.setItem(key, JSON.stringify([]))
        }
        logout()
    }

    return (
        <>
            <View style={styles.inputContainer}>
                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
                    <Text style={styles.text}>Mis Recetas</Text>
                    <TouchableOpacity  ableHighlight onPress={() => onLogout()} style={styles.logout}>
                        <LogoutIcon />
                    </TouchableOpacity>
                </View>    
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        <Input
                            placeholder="Buscar"
                            width="100%" 
                            setValue={(value) => filterRecipes(value)}
                        />                     
                    </View>

                    <View>
                        <SafeAreaView style={{marginTop:'5%'}}>
                            <ScrollView 
                            refreshControl={
                                <RefreshControl
                                  refreshing={refreshing}
                                  onRefresh={loadRecipes}
                                />
                            }
                            showsVerticalScrollIndicator={false} 
                            contentContainerStyle={{paddingBottom: 30}}>
                                {recipes.length === 0 
                                ? <Text>No se han encontrado recetas</Text>
                                : filteredRecipes.map((recipe) => (
                                    <Card 
                                    own
                                    navigation={navigation}
                                    key={recipe.recipeId}
                                    id={recipe.recipeId}
                                    author={recipe.nickName} 
                                    recipeName={recipe.nombre}
                                    score={recipe.valoracionPromedio}
                                    isFavorite={recipe.esFavorito} 
                                    imageUri={recipe.fotoFinal}/>
                                ))} 
                                {
                                    personalizatedRecipes.map((recipe) => {
                                        return <Card 
                                                own
                                                navigation={navigation}
                                                id={recipe.recipeId}
                                                key={uuid.v4()}
                                                author={"PERSONALIZADA"} 
                                                esPersonalizada={true}
                                                recipeName={recipe.nombre}
                                                score={recipe.calificacion}
                                                isFavorite={recipe.esFavorito} 
                                                imageUri={recipe.imagen} 
                                                data={recipe}/>
                                    })
                                }
                                {
                                    savedRecipes.map((recipe) => {
                                        return <Card 
                                                own
                                                navigation={navigation}
                                                id={recipe.recipeId}
                                                key={uuid.v4()}
                                                author={"PARA SUBIR"} 
                                                recipeName={recipe.nombre}
                                                score={recipe.calificacion}
                                                isFavorite={recipe.esFavorito} 
                                                imageUri={recipe.imagen} 
                                                data={recipe}
                                                esParaSubir={true}
                                                estado={recipe.estado}/>
                                    })
                                }
                            </ScrollView>
                        </SafeAreaView>     
                    </View>  
            </View>           
    </>      
    )
}

const styles = StyleSheet.create({
    logout : {
        alignSelf: 'center'
    },
    filter: {
        alignSelf: 'flex-end',
        marginLeft: '3%'
    },
    touchable: {
        justifyContent: 'center'
    },
    text: {
        fontSize: 36,
        marginBottom: 15,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        color: '#FF4B3A'
    },
    inputContainer : {
        width: '100%',
        height: '80%',
        padding: 20,
        marginTop: 20,
        paddingTop: StatusBar.currentHeight
    },
});

const mapStateToProps = state => ({
    nickName: state.authentication.userName
  });

const mapDispatchToProps = dispatch => {
    return {
      logout : () => dispatch(signOut()),
      changeCrear: (estado) => dispatch(cambiarCrear(estado)),
      vaciar: () => dispatch(empty())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(MyCreatedRecipesScreen);