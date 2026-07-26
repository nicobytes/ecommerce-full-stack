import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('should reverse a string', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform('store')).toBe('erots');
  });
});
