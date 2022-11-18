import { Subtask } from "./subtask.model";

export class Task {
    constructor(
        public id: number,
        public title: string, 
        public description: string, 
        public deadline: Date,
        public subtasksList: Subtask[]) {}
  }
  