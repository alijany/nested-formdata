import { objectToFormData } from '../src/index';

describe('objectToFormData', () => {
  it('should convert an object to FormData', () => {
    const object = {
      key1: 'value1',
      key2: 'value2',
    };

    const expectedFormData = new FormData();
    expectedFormData.append('key1', 'value1');
    expectedFormData.append('key2', 'value2');

    const result = objectToFormData(object);

    expect(result).toEqual(expectedFormData);
  });
});
