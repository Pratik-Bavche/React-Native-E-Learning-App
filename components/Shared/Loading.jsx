import { ActivityIndicator, Modal, Text, View } from 'react-native'
import Colors from '../../constant/Colors'

export default function Loading({ loading }) {
    return (
        <Modal
            transparent={true}
            animationType='none'
            visible={loading}
        >
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
                <View style={{
                    backgroundColor: Colors.WHITE,
                    padding: 20,
                    borderRadius: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                }}>
                    <ActivityIndicator size={'large'} color={Colors.PRIMARY} />
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 18,
                    }}>Loading...</Text>
                </View>
            </View>
        </Modal>
    )
}
