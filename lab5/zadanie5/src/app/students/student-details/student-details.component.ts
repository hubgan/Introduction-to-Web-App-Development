import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @Input() student: Student;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.student.id)
      .then(() => {
        console.log('Student delete successfully!');
      })
      .catch(err => console.log(err));
  }
}
