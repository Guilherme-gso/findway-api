export interface ICreateJobDTO {
  title: string;
  description: string;
  categories: string[];
  vacancies: number;
  latitude: number;
  longitude: number;
  driver_id: string;
  uri?: string;
}
