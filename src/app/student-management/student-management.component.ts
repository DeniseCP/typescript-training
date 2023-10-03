import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Student } from '../models/student';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css'],
  animations: [
    trigger(
      'visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('.30s ease-out', style({ height: 0 })))
    ]),
    trigger(
      'searchVisibility', [
      state('open', style({ opacity: 1 })),
      state('closed', style({ opacity: 0 })),
      transition('open => close', animate('.5s ease-in-out'))
    ]
    )
  ]
})
export class StudentManagementComponent {
  // @ts-ignore
  @ViewChild(MatTable) table: MatTable<Student>;

  public visibilityChanged: string = 'hidden';
  public searchVisibility: string = 'close';


  public newStudentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.maxLength(255), Validators.required]),
    age: new FormControl(null, [Validators.min(12), Validators.required]),
    course: new FormControl('', Validators.required),
    id: new FormControl()
  });

  public students: Student[] = [
    { id: 1, name: 'Peter Parker', age: 16, course: 'Science' },
    { id: 2, name: 'Miles Morales', age: 16, course: 'Arts' },
    { id: 3, name: 'Gwen Stacy', age: 16, course: 'Music' },
  ];

  private studentsAux: Student[] = [
    { id: 1, name: 'Peter Parker', age: 16, course: 'Science' },
    { id: 2, name: 'Miles Morales', age: 16, course: 'Arts' },
    { id: 3, name: 'Gwen Stacy', age: 16, course: 'Music' },
  ];

  public displayedColumns: string[] = ['name', 'age', 'course', 'action'];

  private studentMap: { [id: number]: Student; } = {};
  private studentNameMap: { [name: string]: Student; } = {};

  constructor() {
    // StudentMap is used to add and remove students
    this.students.forEach(student => this.studentMap[student.id] = student);

    // StudentNameMap is used to lookup students by name
    this.students.forEach(student => this.studentNameMap[student.name.toLowerCase()] = student);
  }

  public addNewStudent(): void {
    if (this.newStudentForm.valid) {

      const newStudentId = this.getNewUserId();
      this.newStudentForm.get('id')?.setValue(newStudentId);

      const newStudent = this.newStudentForm.value;

      // adds to studentMap by Id
      this.studentMap[newStudentId] = newStudent;

      // must update studentNameMap too!!
      this.studentNameMap[newStudent.name] = newStudent;

      this.students = Object.values(this.studentMap);
      this.studentsAux = [...this.students];
      this.table.renderRows();
      this.newStudentForm.reset();
    }
  }

  public onKeyUp(value: string): void {
    this.students = this.findStudentByName(value);
    this.table.renderRows();
  }

  private findStudentByName(studentName: string): Student[] {
    if (studentName === null || studentName.trim().length === 0) {
      return this.studentsAux;
    }

    const lowerCaseName = studentName.toLowerCase();

    const matchingStudents = Object.values(this.studentNameMap)
      .filter(student => student.name.toLowerCase().includes(lowerCaseName));

    return matchingStudents;
  }

  private getNewUserId(): number {
    if (this.students.length <= 0) {
      return 0;
    }

    return this.students[this.students.length - 1].id + 1;
  }

  public removeStudent(studentId: number): void {
    if (studentId !== null && this.studentMap.hasOwnProperty(studentId)) {
      const studentToRemove = this.studentMap[studentId];

      // delete from both hashmaps
      delete this.studentMap[studentToRemove.id];
      delete this.studentNameMap[studentToRemove.name.toLowerCase()];

      // updates both lists, the display one and the aux one used on the search/lookup
      this.students = Object.values(this.studentMap);

      this.studentsAux = [...this.students];

      this.table.renderRows();
    }

  }
}
