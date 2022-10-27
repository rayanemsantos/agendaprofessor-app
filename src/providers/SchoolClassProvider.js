import { get } from "./api"

export async function fetchSchoolClassSubjects(){
  return get('/school_class_subject')
}

