import { Component, OnInit, OnDestroy } from '@angular/core';
import { Application } from '../shared/application.model';
import { ApplicationService } from '../shared/application.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-application-action',
  templateUrl: './application-action.component.html',
  styleUrls: ['./application-action.component.css']
})
export class ApplicationActionComponent implements OnInit, OnDestroy {
  application: Application;

  action: string;

  sub: Subscription;
  constructor(private applicationService: ApplicationService) { }

  ngOnInit() {
    this.action = "none";
    this.sub = this.applicationService.applicationSelected.subscribe(application => {
      this.application = application;
      
        if (application.age) {
          this.action = "view";
        } else {
          this.action = "create";
        }
    });
  }

  switchAction() {
    this.action = this.action == "view" ? "edit" : "view";
  }

  cancel() {
    if(this.action == "create") {
      this.action = "none"
    } else {
      this.action = "view";
    }
  }

  delete() {
    let index = this.applicationService.applications.indexOf(this.application);
    this.applicationService.removeApplication(index);
    this.action = "none";
  }

  onSubmit(formValue) {
    let newApplication = new Application(
      formValue.name,
      formValue.email,
      formValue.age,
      formValue.phone,
      formValue.preferred,
      formValue.englishLevel,
      formValue.date,
      formValue.technicalSkills,
      formValue.shortPresentation,
      formValue.studyFromHome
    )

    if(this.action == "edit") {
      let index = this.applicationService.applications.indexOf(this.application);
      this.applicationService.updateApplication(index, newApplication);
    } else {
      this.applicationService.addApplication(newApplication);
    }
    this.applicationService.applicationSelected.emit(newApplication);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
