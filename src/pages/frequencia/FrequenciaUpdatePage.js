import React, { useEffect } from 'react';
import { useState } from 'react';
import Container from "../../components/container";
import { Title } from "../../components/text";
import { StyleSheet, View, Dimensions, ScrollView, Text, TouchableOpacity, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CustomButtonContained } from '../../components/customButton';
import {newClassSubjectHistoryPresence} from '../../providers/SchoolClassProvider'
import axios from 'axios';

const ListItem = ({ item, selected, onPress, onLongPress }) => (
  <>
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.listItem}
      key={item.studentId}>
      <View style={{ padding: 8 }}>
        <Text style={{ fontSize: 22, color: '#fff' }}>{item.name}</Text>
        <Text style={{ color: '#989BA1' }}>{item.contact}</Text>
      </View>
      {selected && <View style={styles.overlay} />}
    </TouchableOpacity>
  </>
);

export default function FrequenciaUpdatePage({ route: { params: { classSubjectId, listStudents, date } } }) {
  const [list, setList] = useState([])
  // const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const list = listStudents.map(({ class_subject: classSubjectId, student: { responsible_name: name, registration_id: contact, id: studentId } }) => ({ classSubjectId, studentId, name, contact, presence: true }))
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
    const list_presence = list.map(i => ({ presence: i.presence, student: i.studentId }))
    const requestData  = {
      register_date: date.toISOString().split('T')[0],
      class_subject: classSubjectId,
      list_presence
    }
    const resp = await newClassSubjectHistoryPresence(requestData)
    console.log(resp)
  }

  return (
    <Container>
      <ScrollView>
        <View>
          {/* <Pressable onPress={deSelectItems} style={{ flex: 1, padding: 15, paddingLeft: 10, paddingRight: 10 }}> */}
            <FlatList
              data={list}
              renderItem={({ item }) => (
                <ListItem
                  onPress={() => handleOnPress(item)}
                  // onLongPress={() => selectItems(item)}
                  selected={getSelected(item)}
                  item={item}
                />)}
              keyExtractor={item => item.id}
            />
            <CustomButtonContained
          onPress={enviarPresenca}
            text='Avançar'
          />
          {/* </Pressable> */}
        </View>
      </ScrollView>
    </Container>

  );

};

const styles = StyleSheet.create({
  container: {},
  listItem: {
    backgroundColor: '#30009C',
    marginBottom: 10,
    borderRadius: 10,
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
