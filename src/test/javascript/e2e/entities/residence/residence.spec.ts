import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ResidenceComponentsPage, ResidenceDeleteDialog, ResidenceUpdatePage } from './residence.page-object';

const expect = chai.expect;

describe('Residence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let residenceComponentsPage: ResidenceComponentsPage;
  let residenceUpdatePage: ResidenceUpdatePage;
  let residenceDeleteDialog: ResidenceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Residences', async () => {
    await navBarPage.goToEntity('residence');
    residenceComponentsPage = new ResidenceComponentsPage();
    await browser.wait(ec.visibilityOf(residenceComponentsPage.title), 5000);
    expect(await residenceComponentsPage.getTitle()).to.eq('civilianManagementApp.residence.home.title');
    await browser.wait(ec.or(ec.visibilityOf(residenceComponentsPage.entities), ec.visibilityOf(residenceComponentsPage.noResult)), 1000);
  });

  it('should load create Residence page', async () => {
    await residenceComponentsPage.clickOnCreateButton();
    residenceUpdatePage = new ResidenceUpdatePage();
    expect(await residenceUpdatePage.getPageTitle()).to.eq('civilianManagementApp.residence.home.createOrEditLabel');
    await residenceUpdatePage.cancel();
  });

  it('should create and save Residences', async () => {
    const nbButtonsBeforeCreate = await residenceComponentsPage.countDeleteButtons();

    await residenceComponentsPage.clickOnCreateButton();

    await promise.all([
      residenceUpdatePage.setNoInput('no'),
      residenceUpdatePage.setBlocInput('bloc'),
      residenceUpdatePage.setDescriptionInput('description'),
      residenceUpdatePage.rTSelectLastOption()
    ]);

    expect(await residenceUpdatePage.getNoInput()).to.eq('no', 'Expected No value to be equals to no');
    expect(await residenceUpdatePage.getBlocInput()).to.eq('bloc', 'Expected Bloc value to be equals to bloc');
    expect(await residenceUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

    await residenceUpdatePage.save();
    expect(await residenceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await residenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Residence', async () => {
    const nbButtonsBeforeDelete = await residenceComponentsPage.countDeleteButtons();
    await residenceComponentsPage.clickOnLastDeleteButton();

    residenceDeleteDialog = new ResidenceDeleteDialog();
    expect(await residenceDeleteDialog.getDialogTitle()).to.eq('civilianManagementApp.residence.delete.question');
    await residenceDeleteDialog.clickOnConfirmButton();

    expect(await residenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
