import { element, by, ElementFinder } from 'protractor';

export class ResidenceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-residence div table .btn-danger'));
  title = element.all(by.css('jhi-residence div h2#page-heading span')).first();
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

export class ResidenceUpdatePage {
  pageTitle = element(by.id('jhi-residence-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  noInput = element(by.id('field_no'));
  blocInput = element(by.id('field_bloc'));
  descriptionInput = element(by.id('field_description'));

  rTSelect = element(by.id('field_rT'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNoInput(no: string): Promise<void> {
    await this.noInput.sendKeys(no);
  }

  async getNoInput(): Promise<string> {
    return await this.noInput.getAttribute('value');
  }

  async setBlocInput(bloc: string): Promise<void> {
    await this.blocInput.sendKeys(bloc);
  }

  async getBlocInput(): Promise<string> {
    return await this.blocInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async rTSelectLastOption(): Promise<void> {
    await this.rTSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async rTSelectOption(option: string): Promise<void> {
    await this.rTSelect.sendKeys(option);
  }

  getRTSelect(): ElementFinder {
    return this.rTSelect;
  }

  async getRTSelectedOption(): Promise<string> {
    return await this.rTSelect.element(by.css('option:checked')).getText();
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

export class ResidenceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-residence-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-residence'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
