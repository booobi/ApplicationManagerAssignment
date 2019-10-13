import { Injectable, EventEmitter, Output } from '@angular/core';
import { Application } from './application.model';

const APP_STORAGE_NAME = "applicationManager_applications";

@Injectable({ providedIn: 'root' })
export class ApplicationService {
    
    public applications: Application[] = [];
    @Output() applicationSelected = new EventEmitter<Application>();

    constructor() {
        this.applications = JSON.parse(localStorage.getItem(APP_STORAGE_NAME));

        if (!this.applications) {
            console.log("No applications storage detected. Starting with mockup data ...");

            this.applications = [];
            this.applications.push(new Application(
                "Boris Markov", 
                "bvlmarkov@gmail.com", 
                23,
                "+359 111 111 110", 
                "phone",
                "C2",
                new Date(), 
                "I am skilled in many things. At least that's what I'd like to think.", 
                "I am a cool person. I've neved ridden a bike drunk, but it's on my to-do list.", 
                true));
            this.applications.push(new Application(
                "Ivan Ivanov", 
                "bvlmarkov@gmail.com", 
                23,
                "+359 222 222 221", 
                "email",
                "B2",
                new Date(), 
                "I am very good at many things.", 
                "I like playing computer games and staying at home. I'm not depressed at all.", 
                false));
                
            this.persistApplications();
        }
    }

    addApplication(application: Application) {
        this.applications.push(application);
        this.persistApplications();
    }

    updateApplication(index: number, newApplication: Application) {
        this.applications.splice(index, 1, newApplication);
        this.persistApplications();
    }

    removeApplication(index: number) {
        this.applications.splice(index, 1);
        this.persistApplications();
    }

    persistApplications() {
        localStorage.setItem(APP_STORAGE_NAME, JSON.stringify(this.applications));
    }
}