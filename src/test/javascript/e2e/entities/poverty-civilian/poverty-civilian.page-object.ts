import { element, by, ElementFinder } from 'protractor';

export class PovertyCivilianComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-poverty-civilian div table .btn-danger'));
  title = element.all(by.css('jhi-poverty-civilian div h2#page-heading span')).first();
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

export class PovertyCivilianUpdatePage {
  pageTitle = element(by.id('jhi-poverty-civilian-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  reasonInput = element(by.id('field_reason'));

  civilianSelect = element(by.id('field_civilian'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setReasonInput(reason: string): Promise<void> {
    await this.reasonInput.sendKeys(reason);
  }

  async getReasonInput(): Promise<string> {
    return await this.reasonInput.getAttribute('value');
  }

  async civilianSelectLastOption(): Promise<void> {
    await this.civilianSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async civilianSelectOption(option: string): Promise<void> {
    await this.civilianSelect.sendKeys(option);
  }

  getCivilianSelect(): ElementFinder {
    return this.civilianSelect;
  }

  async getCivilianSelectedOption(): Promise<string> {
    return await this.civilianSelect.element(by.css('option:checked')).getText();
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

export class PovertyCivilianDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-povertyCivilian-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-povertyCivilian'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
