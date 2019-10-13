import { Component, OnInit } from '@angular/core';
import { Application } from '../shared/application.model';
import { ApplicationService } from '../shared/application.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: Application[];
  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {
    this.applications = this.applicationService.applications;
  }

  selectApplication(index) {
    let application = this.applicationService.applications[index];
    this.applicationService.applicationSelected.emit(application);
  }

  addApplication() {
    //stub application
    let emptyApplication = new Application("", "", null, null, "phone", "", null, "", "", false);
    this.applicationService.applicationSelected.emit(emptyApplication);
  }

}
