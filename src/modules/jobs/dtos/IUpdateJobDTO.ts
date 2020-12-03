export interface IUpdateJobDTO {
  id: string;
  title: string;
  description: string;
  vacancies: number;
  latitude: number;
  longitude: number;
  uri: string;
  categories: string[];
}
