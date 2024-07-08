import { CapitalizePipe } from './capitalize.pipe';

describe('Capitalize', () => {
  it('create an instance', () => {
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });
});
