import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CrudService } from './service/crud.service';
import { Student } from './model/Student';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  allStudents: Student[] = [];
  editMode: boolean = false;
  currentId: number;

  title = 'restapi-demo';
  @ViewChild('studentForm')myStudentForm:NgForm;

  constructor(private serv: CrudService) { }

  onSubmit(students: Student) {


    if (!this.editMode) {
      console.log(students);

      this.serv.addStudent(students).subscribe({
        next: function (data) {
          console.log(data);
        },
        error: (err) => alert(err.message),
        complete: () => alert('completed'),
      });
    }
    else {
      students.studentId = this.currentId;
      console.log();
      this.serv.updateStudent(students).subscribe({
        next: (val) => console.log(val),
      });
    }

    // location.reload();

  }
  getStudentsData() {
    this.serv.getStudent().subscribe({
      next: (val) => { this.allStudents = val; }

    });

  }

  ngOnInit(): void {
    this.getStudentsData();
  }
  onDelete(id: number) {

    this.serv.deleteStudent(id).subscribe({
      next: (val) => {
        alert(val);
      }
    });
    location.reload();

  }

  onUpdate(stud: Student) {
    this.currentId = stud.studentId;

    this.myStudentForm.setValue({
      studentName: stud.studentName,
      studentAddress: stud.studentAddress,
      studentAge: stud.studentAge,
      studentEmail: stud.studentEmail
    });

    this.editMode = true;
  }

}