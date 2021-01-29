import { render, screen } from '@testing-library/react';
import { validateForm } from '../AddQuestion';

test('should validate to false', () => {
  const input = {
    categoryId: '',
    question: '',
    answer: '',
  };
  expect(validateForm(input)).toBeFalsy();
});
