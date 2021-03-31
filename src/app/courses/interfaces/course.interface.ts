import { IAuthor } from '../../shared/interfaces/author.interface';

export interface ICourse {
  id: string;
  title: string;
  creationDate: string;
  duration: number;
  description: string;
  topRated: boolean;
  authors: IAuthor[];
}
