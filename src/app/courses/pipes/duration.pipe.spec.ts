import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return only minutes if value less 60', () => {
    const expectation = pipe.transform(52);

    expect(expectation).toBe('52min');
  });

  it('should return hours and minutes if value more or equal 60', () => {
    const expectation = pipe.transform(107);

    expect(expectation).toBe('1h 47min');
  });
});
