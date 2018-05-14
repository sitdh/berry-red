import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

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
        if (null === data) return;

        data.forEach(d => {
          this.i += 1;
          let weekd = this.weekDayName(
            this.dateConvert(d.birthday.raw)
          );
          this.attachObjectToWeekday(weekd, d);
        });
      });
  }

  weekDayName(day: int) {
    return this.weekDays[day];
  }

  dateConvert(rawInt: int) {
    return (new Date(rawInt)).getDay();
  }

  attachObjectToWeekday(weekd, people) {
    if (false === this.dataSource.hasOwnProperty(weekd)) { 
      this.dataSource[weekd] = new Array();
    }

    this.dataSource[weekd].push(people);
  }
}

