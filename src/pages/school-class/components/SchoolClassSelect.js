import React, { useState, useEffect } from 'react';
import SelectList from 'react-native-dropdown-select-list';
import { fetchSchoolClassSubjects } from '../../../providers/SchoolClassProvider';
import { useIsFocused } from "@react-navigation/native";

export default function SchoolClassSelect(props) {
    const isFocused = useIsFocused();
    const { callbackSelect } = props;
    const [selected, setSelected] = useState('');
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        const getSchoolClassSubjects = async () => {
            try {
                const response  = await fetchSchoolClassSubjects();
                setList(response);
                setData(response.map(item => ({ key: item.id, value: item.label })));                
            } catch (error) {
                console.log('err', error.response)
            }
        }

        getSchoolClassSubjects();
    }, [isFocused]);

    function handleCallback(){
        let item = list.find((_item) => _item.id === selected)
        callbackSelect(item)
    };

    return (
        <SelectList 
            setSelected={setSelected}
            data={data} 
            placeholder='Selecione uma turma'
            search={false}
            onSelect={handleCallback} 
        />
    );
}