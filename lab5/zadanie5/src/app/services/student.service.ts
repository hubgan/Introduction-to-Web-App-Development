import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Student } from '../students/student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private dbPath = '/students';

  studentsRef: AngularFirestoreCollection<Student>;

  constructor(private db: AngularFirestore) {
    this.studentsRef = db.collection(this.dbPath);
  }

  createStudent(student: Student): any {
    return this.studentsRef.add({ ...student });
  }

  updateStudent(id: string, data: any): Promise<void> {
    return this.studentsRef.doc(id).update(data);
  }

  deleteStudent(id: string) {
    return this.studentsRef.doc(id).delete();
  }

  getStudentsList(): AngularFirestoreCollection<Student> {
    return this.studentsRef;
  }

  deleteAll() {
    return this.studentsRef;
  }
}
