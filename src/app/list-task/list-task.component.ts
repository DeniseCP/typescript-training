import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnDestroy, AfterViewInit {
  // @ts-ignore
  @ViewChild(MatTable) table: MatTable<Task>;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public taskList: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  private taskListMap: {[id: number]: Task} = {};
  private taskTitleListMap: {[title:string]: Task} = { };


  public displayedColumns: string[] = ['title', 'completed', 'id'];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private service: TaskService) {
    // mat-table doesn't support async pipe
    this.service.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks: Task[]) => {
        this.taskList.data = tasks;

        // loops through the tasks and adds them to the taskListMap and taskTitleListMap for easy access
        this.taskList.data.forEach((task: Task) => {
          this.taskListMap[task.id] = task;
          this.taskTitleListMap[task.title] = task;
        });
      });
  }

  ngAfterViewInit(): void {
    this.taskList.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // searchs on the list of tasks on keyup
  public onKeyUp(event: string): void {
    this.taskList.data = this.filterTasks((event));
    this.table.renderRows();
  }

  // filters the tasks on the list of tasks by title
  private filterTasks(filter: string): Task[] {
    if (filter === null || filter.trim().length === 0) {
      return Object.values(this.taskTitleListMap);
    }

    const lowerCaseName = filter.toLowerCase();

    // search tasksListMap for matchTask and returns an array of tasks by title
    const matchingTasks = Object.values(this.taskTitleListMap)
      .filter(filteredValue => filteredValue.title.toLowerCase().includes(lowerCaseName));

    return matchingTasks;
  }

  public clearSearch(): void { }

  public deleteTask(id: number): void { }

  public completeTask(id: number): void { }

  public editTask(id: number): void { }

  public addTask(): void { }


}
