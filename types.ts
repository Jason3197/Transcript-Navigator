export interface Chapter {
  id: string;
  title: string;
  content: string;
}

export interface CourseData {
  title: string;
  description: string;
  chapters: Chapter[];
}