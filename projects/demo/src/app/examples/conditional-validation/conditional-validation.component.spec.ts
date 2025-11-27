import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ConditionalValidationComponent } from './conditional-validation.component';

describe('ConditionalValidationComponent', () => {
  it('should be invalid if the delivery address has not been entered yet', async () => {
    const user = userEvent.setup();
    await render(ConditionalValidationComponent);

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    const deliveryOption = screen
      .getAllByRole('option')
      .filter((option) => option.textContent === 'Delivery')[0];
    await user.click(deliveryOption);
    const textbox = screen.getByRole('textbox');
    await user.clear(textbox);

    expect(screen.getByRole('button').hasAttribute('disabled')).toBeTrue();
  });

  it('should be valid after changing shipping method back to pickup', async () => {
    const user = userEvent.setup();
    await render(ConditionalValidationComponent);

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    const deliveryOption = screen
      .getAllByRole('option')
      .filter((option) => option.textContent === 'Delivery')[0];
    await user.click(deliveryOption);
    const textbox = screen.getByRole('textbox');
    await user.clear(textbox);
    await user.click(combobox);
    const pickupOption = screen
      .getAllByRole('option')
      .filter((option) => option.textContent === 'Pickup')[0];
    await user.click(pickupOption);

    expect(screen.getByRole('button').hasAttribute('disabled')).toBeFalse();
  });

  it('should be valid after entering the delivery address', async () => {
    const user = userEvent.setup();
    await render(ConditionalValidationComponent);

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    const deliveryOption = screen
      .getAllByRole('option')
      .filter((option) => option.textContent === 'Delivery')[0];
    await user.click(deliveryOption);
    const textbox = screen.getByRole('textbox');
    await user.clear(textbox);
    await user.type(textbox, 'somewhere');

    expect(screen.getByRole('button').hasAttribute('disabled')).toBeFalse();
  });
});
