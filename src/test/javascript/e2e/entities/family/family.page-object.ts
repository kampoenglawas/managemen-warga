import { element, by, ElementFinder } from 'protractor';

export class FamilyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-family div table .btn-danger'));
  title = element.all(by.css('jhi-family div h2#page-heading span')).first();
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

export class FamilyUpdatePage {
  pageTitle = element(by.id('jhi-family-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  familyCardNoInput = element(by.id('field_familyCardNo'));
  familyCardImageInput = element(by.id('file_familyCardImage'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFamilyCardNoInput(familyCardNo: string): Promise<void> {
    await this.familyCardNoInput.sendKeys(familyCardNo);
  }

  async getFamilyCardNoInput(): Promise<string> {
    return await this.familyCardNoInput.getAttribute('value');
  }

  async setFamilyCardImageInput(familyCardImage: string): Promise<void> {
    await this.familyCardImageInput.sendKeys(familyCardImage);
  }

  async getFamilyCardImageInput(): Promise<string> {
    return await this.familyCardImageInput.getAttribute('value');
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

export class FamilyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-family-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-family'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
