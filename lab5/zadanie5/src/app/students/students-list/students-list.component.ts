import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: Array<Student>;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudentsList();
  }


  getStudentsList() {
    this.studentService.getStudentsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ ...c.payload.doc.data(), id: c.payload.doc.id })
        )
      )
    ).subscribe(data => {
      this.students = data;
    });
  }

  deleteStudents() {
    this.students.forEach((student) => {
      this.studentService.deleteStudent(student.id)
        .then(() => {
          console.log('Student delete successfully!');
        })
        .catch(err => console.log(err));
    })
  }


}
