import { View, Text, TouchableWithoutFeedback, Dimensions,Image } from 'react-native'
import React from 'react'
import Carousel  from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedbi';

var {width,height}=Dimensions.get('window');

export default function TrendingMoovies({data}) {
  const navigation = useNavigation();
  const handelClick=(item)=>{
    navigation.navigate("Movie",item);

  }
  return (
    <View className="mb-8">
      <Text className="text-white mx-4 text-xl mb-5" >Trending</Text>
      <Carousel data={data}

      renderItem={({item})=> <MovieCard item={item} handelClick={()=>handelClick(item)}/>}
      firstItem={1}
      inactiveSlideOpacity={0.60}
      sliderWidth={width} 
      itemWidth={width*0.62}
      slideStyle={{display:'flex',alignItems:'center'}}
      />
    </View>
  )
}


const MovieCard=({item,handelClick})=>{
  console.log("item poster",item.poster_path);
    return(
      
        <TouchableWithoutFeedback onPress={()=>handelClick(item)}>
           <Image 
          //  source={require('../assets/shutter.jpg')} 
           source={{uri:image500(item.poster_path)}} 
            style={{
                width:width*0.62,
                height:height*0.4
            }}
            className="rounded-3xl "
            />
       </TouchableWithoutFeedback>
    )

}