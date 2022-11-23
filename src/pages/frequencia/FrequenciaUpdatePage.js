import React, { useEffect } from 'react';
import { useState } from 'react';
import Container from "../../components/container";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CustomButtonContained } from '../../components/customButton';
import {newClassSubjectHistoryPresence} from '../../providers/SchoolClassProvider'
import { alert } from '../../utils/alertUtils';

export default function FrequenciaUpdatePage({ route: { params: { classSubjectId, listStudents, date } } }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const ListItem = ({ item, selected, onPress, onLongPress }) => (
    <>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.listItem}
        key={item.student.id}>
        <View style={{ padding: 8 }}>
          <Text style={{ color: '#989BA1' }}>{item.student.registration_id}</Text>
          <Text style={{ fontSize: 22 }}>{item.student.name}</Text>
        </View>
        {selected && <View style={styles.overlay} />}
      </TouchableOpacity>
    </>
  );

  useEffect(() => {
    const list = listStudents.map(({ class_subject: classSubjectId, student }) => ({ classSubjectId, student, presence: true }))
    console.log(list)
    setList(list)
  }, [])

  const handleOnPress = student => {
    student.presence = !student.presence
    return selectItems(student);
  };

  const getSelected = (student) => {
    return !student.presence
  }

  const selectItems = (student) => {
    const studentIdx = list.map(s => s.studentId).indexOf(student.studentId)
    list[studentIdx] = student
    setList([...list])
  };

  const enviarPresenca = async () => {
    const list_presence = list.map(i => ({ presence: i.presence, student: i.student.id }))
    const requestData  = {
      register_date: date.toISOString().split('T')[0],
      class_subject: classSubjectId,
      list_presence
    }
    setLoading(true);
    newClassSubjectHistoryPresence(requestData).then(() => {
      alert({ 
        title: "Frequência salva com sucesso.", 
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
              renderItem={({ item }) => (
                <ListItem
                  onPress={() => handleOnPress(item)}
                  selected={getSelected(item)}
                  item={item}
                />)}
              keyExtractor={item => item.id}
              style={{marginTop: 16, marginBottom: 16}}
            />
            <CustomButtonContained
              onPress={enviarPresenca}
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
