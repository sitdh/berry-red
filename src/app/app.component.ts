import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  dataPresent: any; 

  dataSource = [];

  sunday = new Array();

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchMessageFromServer();
  }

  fetchMessageFromServer() {
    this.http.get('http://uinames.com/api/?ext&amount=25')
      .subscribe(data => {
        if (!Array.isArray(data)) return;
        const result = Array.from(data);
        result.forEach(r => {
          let weekd = this.weekDayName(
            this.dateConvert(r.birthday.raw)
          );
          this.attachObjectToWeekday(weekd, r);
        });
      });
  }

  weekDayName(day: number) {
    return this.weekDays[day];
  }

  dateConvert(rawInt: number) {
    return (new Date(rawInt)).getDay();
  }

  attachObjectToWeekday(weekd, people) {
    if (false === this.dataSource.hasOwnProperty(weekd)) { 
      this.dataSource[weekd] = new Array();
    }

    this.dataSource[weekd].push(people);
  }
}

