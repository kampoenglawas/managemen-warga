import { element, by, ElementFinder } from 'protractor';

export class BenefitComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-benefit div table .btn-danger'));
  title = element.all(by.css('jhi-benefit div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class BenefitUpdatePage {
  pageTitle = element(by.id('jhi-benefit-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descriptionInput = element(by.id('field_description'));
  typeSelect = element(by.id('field_type'));
  valueInput = element(by.id('field_value'));
  frequencyInput = element(by.id('field_frequency'));
  repetitionSelect = element(by.id('field_repetition'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setTypeSelect(type: string): Promise<void> {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect(): Promise<string> {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption(): Promise<void> {
    await this.typeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setValueInput(value: string): Promise<void> {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput(): Promise<string> {
    return await this.valueInput.getAttribute('value');
  }

  async setFrequencyInput(frequency: string): Promise<void> {
    await this.frequencyInput.sendKeys(frequency);
  }

  async getFrequencyInput(): Promise<string> {
    return await this.frequencyInput.getAttribute('value');
  }

  async setRepetitionSelect(repetition: string): Promise<void> {
    await this.repetitionSelect.sendKeys(repetition);
  }

  async getRepetitionSelect(): Promise<string> {
    return await this.repetitionSelect.element(by.css('option:checked')).getText();
  }

  async repetitionSelectLastOption(): Promise<void> {
    await this.repetitionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class BenefitDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-benefit-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-benefit'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
