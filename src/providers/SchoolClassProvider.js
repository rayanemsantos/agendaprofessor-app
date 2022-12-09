import { get, post } from "./api"

// matérias
export async function fetchSchoolClassSubjects(){
  return get('/school_class_subject/')
}

// aulas
export async function fetchClassSubjectsHistory(params){
  return get('/class_subject_history/?' + new URLSearchParams(params));
}

export async function newClassSubjectHistory(data){
  return post('/class_subject_history/', data);
}

export async function newClassSubjectHistoryPresence(data){
  return post('/class_subject_history_presence/', data);
}

export async function getClassSubjectHistoryPresence(params){
  return get('/class_subject_history_presence/?' + new URLSearchParams(params));
}

export async function setGrades(data){
  return post('/student_subject_average_grade/', data);
}
// eventos
export async function fetchEvents(){
  return get('/calendar_event/')
}

export async function changePassword(data){
  return post('/auth/change_password', data);
}