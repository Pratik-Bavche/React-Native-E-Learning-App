import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constant/Option'
import * as Progress from 'react-native-progress';
export default function CourseProgress({courseList}) {
  return (
    <View style={{marginTop:10}}>
      <Text style={{fontFamily:'outfit-bold',fontSize:25}}>Progress</Text>
      <FlatList data={courseList}
        horizontal={true}
        renderItem={({item,index})=>(
            <View style={{
                padding:15,
                margin:5,
                backgroundColor:'#F5F5F5',
                borderRadius:15,
                width:250,
                }}>
                <View style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center'
                }}>
                    <Image source={imageAssets[item?.banner_image]} style={{width:100,height:100,borderRadius:8}}/>
                    <View style={{flexShrink:1}}>
                            <Text numberOfLines={2}
                             style={{
                                fontFamily:'outfit-bold',
                                fontSize:15,
                                flexWrap:'wrap',
                                width:120
                            }}>{item?.courseTitle}</Text>
                            <Text style={{
                                fontFamily:'outfit',
                                fontSize:14,
                                marginTop:5,    
                            }}>{item?.chapters?.length} Chapter</Text>
                    </View>
                </View>

                            <View style={{marginTop:10,alignItems:'center'}}>
                                <Progress.Bar progress={0.6} width={230} />
                                <Text style={{
                                    fontFamily:'outfit',
                                    fontSize:14,
                                    marginTop:5,    
                                }}>3 out of 5 chapters completed</Text>
                            </View>

            </View>
        )}
      />
    </View>
  )
}