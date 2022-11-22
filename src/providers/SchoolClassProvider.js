import { get, post } from "./api"

// matérias
export async function fetchSchoolClassSubjects(){
  return get('/school_class_subject/')
}
// aulas
export async function fetchClassSubjectsHistory(params){
  return get('/class_subject_history/?' + new URLSearchParams(params));
}
// aulas
export async function newClassSubjectHistory(data){
  return post('/class_subject_history/', data);
}
// eventos
export async function fetchEvents(){
  return get('/calendar_event/')
}
