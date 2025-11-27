import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { InequalityValidationComponent } from './inequality-validation.component';

describe('InequalityValidationComponent', () => {
  it('should be invalid if the “from” and “to” accounts are the same', async () => {
    const user = userEvent.setup();
    await render(InequalityValidationComponent);

    const fromAccount = screen.getByLabelText('From account');
    await user.clear(fromAccount);
    await user.type(fromAccount, 'a');
    const toAccount = screen.getByLabelText('To account');
    await user.clear(toAccount);
    await user.type(toAccount, 'a');

    expect(screen.getByRole('button').hasAttribute('disabled')).toBeTrue();
  });

  it('should be valid if "from account" changes later', async () => {
    const user = userEvent.setup();
    await render(InequalityValidationComponent);

    const fromAccount = screen.getByLabelText('From account');
    await user.clear(fromAccount);
    await user.type(fromAccount, 'a');
    const toAccount = screen.getByLabelText('To account');
    await user.clear(toAccount);
    await user.type(toAccount, 'b');
    await user.clear(fromAccount);
    await user.type(fromAccount, 'b');

    expect(screen.getAllByText('Values must be the different').length).toEqual(
      2,
    );
    expect(screen.getByRole('button').hasAttribute('disabled')).toBeTrue();
  });

  it('should be valid if "to account" changes later', async () => {
    const user = userEvent.setup();
    await render(InequalityValidationComponent);

    const toAccount = screen.getByLabelText('To account');
    await user.clear(toAccount);
    await user.type(toAccount, 'b');
    const fromAccount = screen.getByLabelText('From account');
    await user.clear(fromAccount);
    await user.type(fromAccount, 'a');
    await user.clear(toAccount);
    await user.type(toAccount, 'a');

    expect(screen.getAllByText('Values must be the different').length).toEqual(
      2,
    );
    expect(screen.getByRole('button').hasAttribute('disabled')).toBeTrue();
  });

  it('should be valid if the “from” and “to” accounts are different', async () => {
    const user = userEvent.setup();
    await render(InequalityValidationComponent);

    const fromAccount = screen.getByLabelText('From account');
    await user.clear(fromAccount);
    await user.type(fromAccount, 'a');
    const toAccount = screen.getByLabelText('To account');
    await user.clear(toAccount);
    await user.type(toAccount, 'b');

    expect(screen.getByRole('button').hasAttribute('disabled')).toBeFalse();
  });
});
