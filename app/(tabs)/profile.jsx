import { View, Text, Image, TouchableOpacity, FlatList, Alert, ScrollView, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../../context/UserDetailContext'
import Colors from '../../constant/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { auth, db } from '../../config/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { signOut } from 'firebase/auth'

export default function Profile() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const [courseList, setCourseList] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (userDetail) {
      GetAllUserCourses()
    }
  }, [userDetail])

  const GetAllUserCourses = async () => {
    setLoading(true)
    const q = query(
      collection(db, "courses"),
      where("createdBy", "==", userDetail?.email)
    )
    const querySnapshot = await getDocs(q);
    let list = []
    querySnapshot.forEach((doc) => {
      list.push(doc.data())
    })
    setCourseList(list)
    setLoading(false)
  }

  // Calculation Logic
  const totalCourses = courseList?.length || 0;
  const completedCourses = courseList.filter(item => 
    (item?.completedChapter?.length == item?.chapters?.length) && item?.chapters?.length > 0
  ).length;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/auth/signIn'); 
    } catch (error) {
      console.log(error)
    }
  }

  const menuOptions = [
    {
      id: 1,
      name: 'Add New Course',
      icon: 'add-circle',
      color: Colors.PRIMARY,
      path: '/addCourse' 
    },
    {
      id: 2,
      name: 'My Progress',
      icon: 'time',
      color: '#4CAF50', 
      path: '/(tabs)/progress' 
    },
    {
      id: 3,
      name: 'Logout',
      icon: 'log-out',
      color: '#FF5252', 
      action: handleLogout
    }
  ]

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      
      {/* 1. Header Section */}
      <View style={{ height: 300, backgroundColor: Colors.PRIMARY }}>
         <Image 
            source={require('./../../assets/images/wave.png')} 
            style={{ width: '100%', height: 300, position: 'absolute', top:0, opacity:0.5 }}
            resizeMode="cover"
         />
         
         <View style={{ padding: 20, paddingTop: 60, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 24, color: Colors.WHITE, marginTop: 10 }}>
                {userDetail?.email}
            </Text>
            
            {/* --- UPDATED: PROFILE IMAGE TO APP LOGO --- */}
            <View style={styles.profileContainer}>
                <Image 
                    // Make sure 'logo.png' exists in assets/images, or change to 'icon.png'
                    source={require('./../../assets/images/logo.png')} 
                    style={styles.profileImage} 
                />
            </View>

            {/* --- UPDATED: SHOW EMAIL AS MAIN TITLE --- */}
            

            {/* Show Name smaller below */}
            <Text style={{ fontFamily: 'outfit', fontSize: 16, color: '#E0E0E0' }}>
                {userDetail?.name}
            </Text>
         </View>
      </View>

      {/* 2. Stats Section */}
      <View style={styles.statsContainer}>
          <View style={styles.statItem}>
             <Text style={styles.statNumber}>{totalCourses}</Text>
             <Text style={styles.statLabel}>Enrolled</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.statItem}>
             <Text style={styles.statNumber}>{completedCourses}</Text>
             <Text style={styles.statLabel}>Completed</Text>
          </View>
      </View>

      {/* 3. Menu Options */}
      <View style={{ padding: 20, marginTop: 20 }}>
         <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, marginBottom: 15 }}>General</Text>
         
         <FlatList 
            data={menuOptions}
            scrollEnabled={false}
            renderItem={({item}) => (
                <TouchableOpacity 
                    onPress={() => item.action ? item.action() : router.push(item.path)}
                    style={styles.menuItem}
                >
                    <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                        <Ionicons name={item.icon} size={24} color={item.color} />
                    </View>
                    <Text style={styles.menuText}>{item.name}</Text>
                    <Ionicons name="chevron-forward" size={24} color={Colors.GRAY} />
                </TouchableOpacity>
            )}
         />
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    profileContainer: {
        marginTop: 20,
        padding: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 99
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 99,
        borderWidth: 2,
        borderColor: Colors.WHITE,
        resizeMode: 'contain' // Changed to contain so logo fits well
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        marginHorizontal: 30,
        marginTop: -30, 
        borderRadius: 15,
        padding: 20,
        elevation: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    statItem: {
        alignItems: 'center',
        width: '40%'
    },
    verticalLine: {
        width: 1,
        height: 40,
        backgroundColor: Colors.LIGHT_GRAY || '#E0E0E0'
    },
    statNumber: {
        fontFamily: 'outfit-bold',
        fontSize: 25,
        color: Colors.PRIMARY
    },
    statLabel: {
        fontFamily: 'outfit',
        fontSize: 14,
        color: Colors.GRAY
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.WHITE, 
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 1
    },
    iconBox: {
        padding: 10,
        borderRadius: 10,
        marginRight: 15
    },
    menuText: {
        fontFamily: 'outfit-bold',
        fontSize: 16,
        flex: 1 
    }
})