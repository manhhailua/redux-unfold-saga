import { createAction } from '../src';

describe('createAction', () => {
  const DO_SOMETHING = 'DO_SOMETHING';
  let action;

  beforeAll(() => {
    action = createAction(DO_SOMETHING);
  });

  test('should create a correct redux action', () => {
    expect(action()).toEqual(expect.objectContaining({ type: DO_SOMETHING }));
  });
});
