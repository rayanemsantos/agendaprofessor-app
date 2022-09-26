import {
    Alert,
    Platform,
    PixelRatio,
    Dimensions,
    Linking
} from 'react-native';

const width = Dimensions.get('screen').width
const scale = width / 3

export const alert = (props) => {
    const { title, subtitle, 
            textCancel = 'Cancelar', 
            textConfirm = 'Confirmar', 
            callbackConfirm } = props;

    let arrayActions =  [
        {
            text: textCancel,
            style: 'cancel',
        },
    ]

    callbackConfirm && arrayActions.push({ 
        text: textConfirm, 
        onPress: () => callbackConfirm()
    });

    Alert.alert(
        title,
        subtitle,
        arrayActions,
        { cancelable: true }
    );
};