import { element, by, ElementFinder } from 'protractor';

export class CivilianComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-civilian div table .btn-danger'));
  title = element.all(by.css('jhi-civilian div h2#page-heading span')).first();
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

export class CivilianUpdatePage {
  pageTitle = element(by.id('jhi-civilian-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  identityNoInput = element(by.id('field_identityNo'));
  identityCardImageInput = element(by.id('file_identityCardImage'));
  dateOfBirthInput = element(by.id('field_dateOfBirth'));
  placeOfBirthInput = element(by.id('field_placeOfBirth'));
  genderSelect = element(by.id('field_gender'));
  additionalInfoInput = element(by.id('field_additionalInfo'));
  yearlyIncomeInput = element(by.id('field_yearlyIncome'));
  contactInput = element(by.id('field_contact'));
  statusSelect = element(by.id('field_status'));

  benefitSelect = element(by.id('field_benefit'));
  residenceSelect = element(by.id('field_residence'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setIdentityNoInput(identityNo: string): Promise<void> {
    await this.identityNoInput.sendKeys(identityNo);
  }

  async getIdentityNoInput(): Promise<string> {
    return await this.identityNoInput.getAttribute('value');
  }

  async setIdentityCardImageInput(identityCardImage: string): Promise<void> {
    await this.identityCardImageInput.sendKeys(identityCardImage);
  }

  async getIdentityCardImageInput(): Promise<string> {
    return await this.identityCardImageInput.getAttribute('value');
  }

  async setDateOfBirthInput(dateOfBirth: string): Promise<void> {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput(): Promise<string> {
    return await this.dateOfBirthInput.getAttribute('value');
  }

  async setPlaceOfBirthInput(placeOfBirth: string): Promise<void> {
    await this.placeOfBirthInput.sendKeys(placeOfBirth);
  }

  async getPlaceOfBirthInput(): Promise<string> {
    return await this.placeOfBirthInput.getAttribute('value');
  }

  async setGenderSelect(gender: string): Promise<void> {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect(): Promise<string> {
    return await this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption(): Promise<void> {
    await this.genderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setAdditionalInfoInput(additionalInfo: string): Promise<void> {
    await this.additionalInfoInput.sendKeys(additionalInfo);
  }

  async getAdditionalInfoInput(): Promise<string> {
    return await this.additionalInfoInput.getAttribute('value');
  }

  async setYearlyIncomeInput(yearlyIncome: string): Promise<void> {
    await this.yearlyIncomeInput.sendKeys(yearlyIncome);
  }

  async getYearlyIncomeInput(): Promise<string> {
    return await this.yearlyIncomeInput.getAttribute('value');
  }

  async setContactInput(contact: string): Promise<void> {
    await this.contactInput.sendKeys(contact);
  }

  async getContactInput(): Promise<string> {
    return await this.contactInput.getAttribute('value');
  }

  async setStatusSelect(status: string): Promise<void> {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async benefitSelectLastOption(): Promise<void> {
    await this.benefitSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async benefitSelectOption(option: string): Promise<void> {
    await this.benefitSelect.sendKeys(option);
  }

  getBenefitSelect(): ElementFinder {
    return this.benefitSelect;
  }

  async getBenefitSelectedOption(): Promise<string> {
    return await this.benefitSelect.element(by.css('option:checked')).getText();
  }

  async residenceSelectLastOption(): Promise<void> {
    await this.residenceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async residenceSelectOption(option: string): Promise<void> {
    await this.residenceSelect.sendKeys(option);
  }

  getResidenceSelect(): ElementFinder {
    return this.residenceSelect;
  }

  async getResidenceSelectedOption(): Promise<string> {
    return await this.residenceSelect.element(by.css('option:checked')).getText();
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

export class CivilianDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-civilian-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-civilian'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
