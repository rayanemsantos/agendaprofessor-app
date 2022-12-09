import React, {useState} from 'react';
import { View, 
         StyleSheet, 
         ScrollView, 
         KeyboardAvoidingView,
         TouchableWithoutFeedback,
         Keyboard,         
         Platform
} from 'react-native';
import Container from '../../components/container';
import { Title } from '../../components/text';
import { AppInput, AppInputMultiline } from "../../components/customInput";
import { CustomButtonContained } from '../../components/customButton';
import { newClassSubjectHistory } from '../../providers/SchoolClassProvider';
import { alert } from '../../utils/alertUtils';

export default function ClassesFormPage(props) {
    const { route, navigation } = props;
    const { class_subject, date } = route.params;

    const [form, setForm] = useState({
        class_subject: class_subject.id,
        register_date: date.toISOString().split('T')[0],
        content: '',
        comment: ''
    });
    const [loading, setLoading] = useState(false);
    
    const handleChange = (name, value) => {
        setForm((prev) => { return  {...prev, [name]: value} })
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await newClassSubjectHistory(form);
            navigation.goBack()
            alert({ 
                title: "Aula registrada com sucesso", 
                subtitle: ""
            })            
        } catch (error) {
            alert({ 
                title: error['message'] ? error['message'] : "Ops! Houve um erro ao registrar aula.", 
                subtitle: ''
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={-550}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <>
                        <View style={styles.formContainer}>
                            <AppInput
                                label='Conteúdo'
                                name='content'
                                placeholder='Conteúdo da aula'
                                onChangeText={(value) => handleChange('content', value)}
                                value={form.content}
                            />  
                            <AppInputMultiline
                                label='Observação'
                                placeholder='Observação'
                                onChangeText={(value) => handleChange('comment', value)}
                                value={form.comment}
                            />
                            <CustomButtonContained
                                text='Salvar'
                                onPress={handleSave}
                                disabled={form.content === ''}
                                loading={loading}
                            />
                        </View>                
                        </>
                    </TouchableWithoutFeedback>        
                </KeyboardAvoidingView>                
            </ScrollView>
        </Container>
    );
}
const styles = StyleSheet.create({
    listContainer: {
        marginTop: 16
    },
    card: {
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 8,
        padding: 16
    },
    formContainer:{
        marginTop: 16
    }
});