export class Application {
    constructor(
        public name:string, 
        public email:string,
        public age: number,
        public phoneNumber:string,
        public preferredWayOfCommunication: string,
        public englishLevel: string,
        public availableToStartDate: Date,
        public technicalSkills: string,
        public shortPresentation: string,
        public studyFromHome: boolean
        ) {}
}