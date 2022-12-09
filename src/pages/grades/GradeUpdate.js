import React, { useEffect } from 'react';
import { useState } from 'react';
import Container from "../../components/container";
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CustomButtonContained } from '../../components/customButton';
import {setGrades} from '../../providers/SchoolClassProvider'
import { alert } from '../../utils/alertUtils';
import { Span } from '../../components/text';
import { AppInput } from '../../components/customInput';

export default function GradeUpdatePage(props) {
  const { route } = props;
  const { params } = route;
  const { classSubject, listStudents, period } = params;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const list = listStudents.map(({ class_subject: classSubjectId, student }) => ({ classSubjectId, student, grade: 0.0 }))
    setList(list);
  }, [])

  const onChangeGrade = (index, value) => {
    let newList = [...list]
    newList[index].grade = value
    setList(newList);
  };

  const handleSave = async () => {
    const list_grade = list.map(i => ({ grade: i.grade, student: i.student.id }))
    const requestData  = {
      class_subject: classSubject.id,
      period: period, 
      list_grade,
    };
    setLoading(true);
    setGrades(requestData).then(() => {
      alert({ 
        title: "Notas salvas com sucesso.", 
        subtitle: "",
        textCancel: "Ok"
      })
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <Container>
      <ScrollView>
        <View>
            <FlatList
              data={list}
              ListHeaderComponent={
                <Span text={period}/>
              }
              renderItem={({ item, index }) => (
                <View
                  style={styles.listItem}
                  key={item.student.id}>
                  <View style={{ padding: 8, width: '70%' }}>
                    <Text style={{ color: '#989BA1' }}>{item.student.registration_id}</Text>
                    <Text style={{ fontSize: 22 }}>{item.student.full_name}</Text>
                  </View>
                  <View style={{ width: '30%' }}>
                      <AppInput
                          name="grade"
                          value={item.grade}
                          onChangeText={(value) => onChangeGrade(index, value)}
                          mask
                      /> 
                  </View>
                </View>                
              )}
              keyExtractor={item => item.id}
              style={{marginTop: 16, marginBottom: 16}}
            />
            <CustomButtonContained
              onPress={handleSave}
              text='Salvar alterações'
              loading={loading}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    display:'flex',
    flexDirection: 'row'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,0,0,0.5)',
  },
});
