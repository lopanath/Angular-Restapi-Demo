import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/Student';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient) { }
    addStudent(val: Student)
    {
      const myHeader= new HttpHeaders({'authorization':'Bearer'})
      return this.http.post("http://localhost:8090/student/addStudent" , val, {headers: myHeader});
    }
    getStudent()
    {
     return this.http.get<Student[]>("http://localhost:8090/student/getStudents");
    }
    deleteStudent(id:number)
    {
      return this.http.delete(`http://localhost:8090/student/delete/${id}`);
    }
    updateStudent(stud:Student)
    {
      return this.http.put(`http://localhost:8090/student/updateStudent`,stud);
    }
}

