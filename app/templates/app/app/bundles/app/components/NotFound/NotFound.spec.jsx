import { expect } from 'chai';

describe('NotFound', () => {

  const notFound = 404;

  it('should be 404', () => {
    expect(notFound).to.equal(404);
  });

});
