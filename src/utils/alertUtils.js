import {
    Alert,
    Platform,
    PixelRatio,
    Dimensions,
    Linking
} from 'react-native';

const width = Dimensions.get('screen').width
const scale = width / 3

export const alertConfirm = (title, subtitle, callbackConfirm) => {
    Alert.alert(
        title,
        subtitle,
        [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: "Exluir", onPress: () => callbackConfirm() },
        ],
        { cancelable: true }
    );
};