import { OrderByPipe } from './order-by.pipe';
import { ICourse } from '../interfaces/course.interface';

const mockCourses: ICourse[] = [
  {
    id: '1',
    title: 'mock title',
    creationDate: '2012-12-12',
    duration: 86,
    description: 'mock description',
    topRated: true,
  },
  {
    id: '3',
    title: 'mock title3',
    creationDate: '2014-12-12',
    duration: 86,
    description: 'mock description3',
    topRated: true,
  },
  {
    id: '2',
    title: 'mock title2',
    creationDate: '2013-12-12',
    duration: 86,
    description: 'mock description2',
    topRated: true,
  },
  {
    id: '4',
    title: 'mock title4',
    creationDate: '2013-12-12',
    duration: 86,
    description: 'mock description4',
    topRated: true,
  },
];

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should order items by creation date from earlier to later', () => {
    const courses = [...mockCourses];

    const expectation = pipe.transform(courses, 'asc');

    expect(expectation[0].id).toBe('1');
    expect(expectation[1].id).toBe('2');
    expect(expectation[2].id).toBe('4');
    expect(expectation[3].id).toBe('3');
  });

  it('should order items by creation date from later to earlier', () => {
    const courses = [...mockCourses];

    const expectation = pipe.transform(courses, 'desc');

    expect(expectation[0].id).toBe('3');
    expect(expectation[1].id).toBe('2');
    expect(expectation[2].id).toBe('4');
    expect(expectation[3].id).toBe('1');
  });
});
