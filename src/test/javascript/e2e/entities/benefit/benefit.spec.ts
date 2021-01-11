import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BenefitComponentsPage, BenefitDeleteDialog, BenefitUpdatePage } from './benefit.page-object';

const expect = chai.expect;

describe('Benefit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let benefitComponentsPage: BenefitComponentsPage;
  let benefitUpdatePage: BenefitUpdatePage;
  let benefitDeleteDialog: BenefitDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Benefits', async () => {
    await navBarPage.goToEntity('benefit');
    benefitComponentsPage = new BenefitComponentsPage();
    await browser.wait(ec.visibilityOf(benefitComponentsPage.title), 5000);
    expect(await benefitComponentsPage.getTitle()).to.eq('civilianManagementApp.benefit.home.title');
    await browser.wait(ec.or(ec.visibilityOf(benefitComponentsPage.entities), ec.visibilityOf(benefitComponentsPage.noResult)), 1000);
  });

  it('should load create Benefit page', async () => {
    await benefitComponentsPage.clickOnCreateButton();
    benefitUpdatePage = new BenefitUpdatePage();
    expect(await benefitUpdatePage.getPageTitle()).to.eq('civilianManagementApp.benefit.home.createOrEditLabel');
    await benefitUpdatePage.cancel();
  });

  it('should create and save Benefits', async () => {
    const nbButtonsBeforeCreate = await benefitComponentsPage.countDeleteButtons();

    await benefitComponentsPage.clickOnCreateButton();

    await promise.all([
      benefitUpdatePage.setDescriptionInput('description'),
      benefitUpdatePage.typeSelectLastOption(),
      benefitUpdatePage.setValueInput('5'),
      benefitUpdatePage.setFrequencyInput('5'),
      benefitUpdatePage.repetitionSelectLastOption()
    ]);

    expect(await benefitUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await benefitUpdatePage.getValueInput()).to.eq('5', 'Expected value value to be equals to 5');
    expect(await benefitUpdatePage.getFrequencyInput()).to.eq('5', 'Expected frequency value to be equals to 5');

    await benefitUpdatePage.save();
    expect(await benefitUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await benefitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Benefit', async () => {
    const nbButtonsBeforeDelete = await benefitComponentsPage.countDeleteButtons();
    await benefitComponentsPage.clickOnLastDeleteButton();

    benefitDeleteDialog = new BenefitDeleteDialog();
    expect(await benefitDeleteDialog.getDialogTitle()).to.eq('civilianManagementApp.benefit.delete.question');
    await benefitDeleteDialog.clickOnConfirmButton();

    expect(await benefitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
