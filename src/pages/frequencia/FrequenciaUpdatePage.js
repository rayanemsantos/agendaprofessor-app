import React, { useEffect } from 'react';
import { useState } from 'react';
import Container from "../../components/container";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CustomButtonContained } from '../../components/customButton';
import {getClassSubjectHistoryPresence, newClassSubjectHistoryPresence} from '../../providers/SchoolClassProvider'
import { alert } from '../../utils/alertUtils';
import { Span } from '../../components/text';

export default function FrequenciaUpdatePage(props) {
  const { route } = props;
  const { params } = route;
  const { classSubjectId, listStudents, date } = params;

  const [list, setList] = useState(null);
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
          <Text style={{ fontSize: 22 }}>{item.student.full_name}</Text>
        </View>
        {selected && <View style={styles.overlay} />}
      </TouchableOpacity>
    </>
  );

  useEffect(() => {
    checkDay();
  }, [])

  const handleOnPress = index => {
    let newList = [...list]
    newList[index].presence = !newList[index].presence
    setList(newList);
  };

  const checkDay = () => {
    getClassSubjectHistoryPresence({
      class_subject:classSubjectId,
      register_date:date.toISOString().split('T')[0],
    }).then((res) => {
      if(res.length){
        const newList = res.map(({ student, presence }) => ({ classSubjectId: classSubjectId, student: listStudents.find((_s) => _s.student.id === student).student, presence }))
        setList(newList);
      } else {
        const list = listStudents.map(({ class_subject: classSubjectId, student }) => ({ classSubjectId, student, presence: true }))
        setList(list);
      }
    })
  };

  const handleSave = async () => {
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
              data={list || []}
              ListHeaderComponent={
                <Span text='* Selecione apenas quem faltou'/>
              }
              renderItem={({ item, index }) => (
                <ListItem
                    onPress={() => handleOnPress(index)}
                    selected={!item.presence}
                    item={item}
                />
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
