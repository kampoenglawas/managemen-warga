import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FamilyComponentsPage, FamilyDeleteDialog, FamilyUpdatePage } from './family.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Family e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let familyComponentsPage: FamilyComponentsPage;
  let familyUpdatePage: FamilyUpdatePage;
  let familyDeleteDialog: FamilyDeleteDialog;
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

  it('should load Families', async () => {
    await navBarPage.goToEntity('family');
    familyComponentsPage = new FamilyComponentsPage();
    await browser.wait(ec.visibilityOf(familyComponentsPage.title), 5000);
    expect(await familyComponentsPage.getTitle()).to.eq('civilianManagementApp.family.home.title');
    await browser.wait(ec.or(ec.visibilityOf(familyComponentsPage.entities), ec.visibilityOf(familyComponentsPage.noResult)), 1000);
  });

  it('should load create Family page', async () => {
    await familyComponentsPage.clickOnCreateButton();
    familyUpdatePage = new FamilyUpdatePage();
    expect(await familyUpdatePage.getPageTitle()).to.eq('civilianManagementApp.family.home.createOrEditLabel');
    await familyUpdatePage.cancel();
  });

  it('should create and save Families', async () => {
    const nbButtonsBeforeCreate = await familyComponentsPage.countDeleteButtons();

    await familyComponentsPage.clickOnCreateButton();

    await promise.all([familyUpdatePage.setFamilyCardNoInput('familyCardNo'), familyUpdatePage.setFamilyCardImageInput(absolutePath)]);

    expect(await familyUpdatePage.getFamilyCardNoInput()).to.eq('familyCardNo', 'Expected FamilyCardNo value to be equals to familyCardNo');
    expect(await familyUpdatePage.getFamilyCardImageInput()).to.endsWith(
      fileNameToUpload,
      'Expected FamilyCardImage value to be end with ' + fileNameToUpload
    );

    await familyUpdatePage.save();
    expect(await familyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await familyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Family', async () => {
    const nbButtonsBeforeDelete = await familyComponentsPage.countDeleteButtons();
    await familyComponentsPage.clickOnLastDeleteButton();

    familyDeleteDialog = new FamilyDeleteDialog();
    expect(await familyDeleteDialog.getDialogTitle()).to.eq('civilianManagementApp.family.delete.question');
    await familyDeleteDialog.clickOnConfirmButton();

    expect(await familyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
