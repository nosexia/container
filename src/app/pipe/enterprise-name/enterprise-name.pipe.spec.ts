import { EnterpriseNamePipe } from './enterprise-name.pipe';

describe('EnterpriseNamePipe', () => {
  it('create an instance', () => {
    const pipe = new EnterpriseNamePipe();
    expect(pipe).toBeTruthy();
  });
});
