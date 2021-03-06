import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  courses$ : Observable<Course[]>;

  constructor(private courseService: CoursesService) {

  }

  ngOnInit() {
    
    const params = new HttpParams()
      .set("page", "1")
      .set("pageSize", "10");

    this.courses$ = this.courseService.loadCourses();

  }

  save(course: Course){
    
    const headers = new HttpHeaders();
    this.courseService.saveCourse(course).subscribe(
      () => console.log('Course saved!')
    );
  }



}
