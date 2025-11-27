import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { EqualityValidationComponent } from './equality-validation.component';

describe('EqualityValidationComponent', () => {
  it('should be invalid if the password and confirm password do not match', async () => {
    const user = userEvent.setup();
    await render(EqualityValidationComponent);

    const password = screen.getByLabelText('Password');
    await user.clear(password);
    await user.type(password, 'a');
    const confirmPassword = screen.getByLabelText('Confirm password');
    await user.clear(confirmPassword);
    await user.type(confirmPassword, 'b');

    expect(screen.getByRole('button').hasAttribute('disabled')).toBeTrue();
  });

  it('should be valid if the password and confirm password match', async () => {
    const user = userEvent.setup();
    await render(EqualityValidationComponent);

    const password = screen.getByLabelText('Password');
    await user.clear(password);
    await user.type(password, 'a');
    const confirmPassword = screen.getByLabelText('Confirm password');
    await user.clear(confirmPassword);
    await user.type(confirmPassword, 'a');

    expect(screen.getByRole('button').hasAttribute('disabled')).toBeFalse();
  });
});
