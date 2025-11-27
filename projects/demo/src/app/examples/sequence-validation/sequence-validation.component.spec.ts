import { render, screen } from '@testing-library/angular';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { SequenceValidationComponent } from './sequence-validation.component';

describe('SequenceValidationComponent', () => {
  async function onlyLeaveOneInput(user: UserEvent) {
    while (true) {
      const tire2 = screen.queryByLabelText('Tire 2');
      if (tire2 === null) break;
      const removes = screen.getAllByText('Remove');
      await user.click(removes[0]);
    }
  }

  it('should be invalid if the current price is not higher than the previous price', async () => {
    const user = userEvent.setup();
    await render(SequenceValidationComponent);

    await onlyLeaveOneInput(user);
    const tire1 = screen.getByLabelText('Tire 1');
    await user.clear(tire1);
    await user.type(tire1, '0');
    const add = screen.getByText('Add');
    await user.click(add);

    const tire2 = screen.getByLabelText('Tire 2');
    await user.clear(tire2);
    await user.type(tire2, '0');

    expect(
      screen.getByText('Submit').closest('button')?.hasAttribute('disabled'),
    ).toBeTrue();
  });

  it('should be invalid if the previous price changes later', async () => {
    const user = userEvent.setup();
    await render(SequenceValidationComponent);

    await onlyLeaveOneInput(user);
    const tire1 = screen.getByLabelText('Tire 1');
    await user.clear(tire1);
    await user.type(tire1, '0');
    const add = screen.getByText('Add');
    await user.click(add);

    const tire2 = screen.getByLabelText('Tire 2');
    await user.clear(tire2);
    await user.type(tire2, '1');

    await user.type(tire1, '1');

    expect(
      screen.getByText('Submit').closest('button')?.hasAttribute('disabled'),
    ).toBeTrue();
  });

  it('should be valid if the current price is higher than the previous price', async () => {
    const user = userEvent.setup();
    await render(SequenceValidationComponent);

    await onlyLeaveOneInput(user);
    const tire1 = screen.getByLabelText('Tire 1');
    await user.clear(tire1);
    await user.type(tire1, '0');
    const add = screen.getByText('Add');
    await user.click(add);

    const tire2 = screen.getByLabelText('Tire 2');
    await user.clear(tire2);
    await user.type(tire2, '1');

    expect(
      screen.getByText('Submit').closest('button')?.hasAttribute('disabled'),
    ).toBeFalse();
  });
});
