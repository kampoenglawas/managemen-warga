import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CivilianComponentsPage, CivilianDeleteDialog, CivilianUpdatePage } from './civilian.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Civilian e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let civilianComponentsPage: CivilianComponentsPage;
  let civilianUpdatePage: CivilianUpdatePage;
  let civilianDeleteDialog: CivilianDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Civilians', async () => {
    await navBarPage.goToEntity('civilian');
    civilianComponentsPage = new CivilianComponentsPage();
    await browser.wait(ec.visibilityOf(civilianComponentsPage.title), 5000);
    expect(await civilianComponentsPage.getTitle()).to.eq('civilianManagementApp.civilian.home.title');
    await browser.wait(ec.or(ec.visibilityOf(civilianComponentsPage.entities), ec.visibilityOf(civilianComponentsPage.noResult)), 1000);
  });

  it('should load create Civilian page', async () => {
    await civilianComponentsPage.clickOnCreateButton();
    civilianUpdatePage = new CivilianUpdatePage();
    expect(await civilianUpdatePage.getPageTitle()).to.eq('civilianManagementApp.civilian.home.createOrEditLabel');
    await civilianUpdatePage.cancel();
  });

  it('should create and save Civilians', async () => {
    const nbButtonsBeforeCreate = await civilianComponentsPage.countDeleteButtons();

    await civilianComponentsPage.clickOnCreateButton();

    await promise.all([
      civilianUpdatePage.setNameInput('name'),
      civilianUpdatePage.setIdentityNoInput('identityNo'),
      civilianUpdatePage.setIdentityCardImageInput(absolutePath),
      civilianUpdatePage.setDateOfBirthInput('2000-12-31'),
      civilianUpdatePage.setPlaceOfBirthInput('placeOfBirth'),
      civilianUpdatePage.genderSelectLastOption(),
      civilianUpdatePage.setAdditionalInfoInput('additionalInfo'),
      civilianUpdatePage.setYearlyIncomeInput('5'),
      civilianUpdatePage.setContactInput('contact'),
      civilianUpdatePage.statusSelectLastOption(),
      // civilianUpdatePage.benefitSelectLastOption(),
      civilianUpdatePage.residenceSelectLastOption()
    ]);

    expect(await civilianUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await civilianUpdatePage.getIdentityNoInput()).to.eq('identityNo', 'Expected IdentityNo value to be equals to identityNo');
    expect(await civilianUpdatePage.getIdentityCardImageInput()).to.endsWith(
      fileNameToUpload,
      'Expected IdentityCardImage value to be end with ' + fileNameToUpload
    );
    expect(await civilianUpdatePage.getDateOfBirthInput()).to.eq('2000-12-31', 'Expected dateOfBirth value to be equals to 2000-12-31');
    expect(await civilianUpdatePage.getPlaceOfBirthInput()).to.eq(
      'placeOfBirth',
      'Expected PlaceOfBirth value to be equals to placeOfBirth'
    );
    expect(await civilianUpdatePage.getAdditionalInfoInput()).to.eq(
      'additionalInfo',
      'Expected AdditionalInfo value to be equals to additionalInfo'
    );
    expect(await civilianUpdatePage.getYearlyIncomeInput()).to.eq('5', 'Expected yearlyIncome value to be equals to 5');
    expect(await civilianUpdatePage.getContactInput()).to.eq('contact', 'Expected Contact value to be equals to contact');

    await civilianUpdatePage.save();
    expect(await civilianUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await civilianComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Civilian', async () => {
    const nbButtonsBeforeDelete = await civilianComponentsPage.countDeleteButtons();
    await civilianComponentsPage.clickOnLastDeleteButton();

    civilianDeleteDialog = new CivilianDeleteDialog();
    expect(await civilianDeleteDialog.getDialogTitle()).to.eq('civilianManagementApp.civilian.delete.question');
    await civilianDeleteDialog.clickOnConfirmButton();

    expect(await civilianComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
