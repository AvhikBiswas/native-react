import { Dimensions, Text, View } from 'react-native'
import React, { Component } from 'react'
import * as Progress from 'react-native-progress'
const  {width,height}=Dimensions.get("window");
export default class Loading extends Component {
  render() {
    return (
      <View style={{height,width,zIndex: 1}} className="absolute flex-row justify-center items-center ">
        <Progress.CircleSnail thickness={10} size={150} color={"#a0522d"}/>
      </View>
    )
  }
}