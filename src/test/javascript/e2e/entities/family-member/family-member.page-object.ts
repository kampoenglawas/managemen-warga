import { element, by, ElementFinder } from 'protractor';

export class FamilyMemberComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-family-member div table .btn-danger'));
  title = element.all(by.css('jhi-family-member div h2#page-heading span')).first();
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

export class FamilyMemberUpdatePage {
  pageTitle = element(by.id('jhi-family-member-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  roleSelect = element(by.id('field_role'));

  civilianSelect = element(by.id('field_civilian'));
  familySelect = element(by.id('field_family'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRoleSelect(role: string): Promise<void> {
    await this.roleSelect.sendKeys(role);
  }

  async getRoleSelect(): Promise<string> {
    return await this.roleSelect.element(by.css('option:checked')).getText();
  }

  async roleSelectLastOption(): Promise<void> {
    await this.roleSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

  async familySelectLastOption(): Promise<void> {
    await this.familySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async familySelectOption(option: string): Promise<void> {
    await this.familySelect.sendKeys(option);
  }

  getFamilySelect(): ElementFinder {
    return this.familySelect;
  }

  async getFamilySelectedOption(): Promise<string> {
    return await this.familySelect.element(by.css('option:checked')).getText();
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

export class FamilyMemberDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-familyMember-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-familyMember'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
