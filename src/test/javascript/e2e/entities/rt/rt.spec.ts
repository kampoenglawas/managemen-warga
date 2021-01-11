import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RTComponentsPage, RTDeleteDialog, RTUpdatePage } from './rt.page-object';

const expect = chai.expect;

describe('RT e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rTComponentsPage: RTComponentsPage;
  let rTUpdatePage: RTUpdatePage;
  let rTDeleteDialog: RTDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RTS', async () => {
    await navBarPage.goToEntity('rt');
    rTComponentsPage = new RTComponentsPage();
    await browser.wait(ec.visibilityOf(rTComponentsPage.title), 5000);
    expect(await rTComponentsPage.getTitle()).to.eq('civilianManagementApp.rT.home.title');
    await browser.wait(ec.or(ec.visibilityOf(rTComponentsPage.entities), ec.visibilityOf(rTComponentsPage.noResult)), 1000);
  });

  it('should load create RT page', async () => {
    await rTComponentsPage.clickOnCreateButton();
    rTUpdatePage = new RTUpdatePage();
    expect(await rTUpdatePage.getPageTitle()).to.eq('civilianManagementApp.rT.home.createOrEditLabel');
    await rTUpdatePage.cancel();
  });

  it('should create and save RTS', async () => {
    const nbButtonsBeforeCreate = await rTComponentsPage.countDeleteButtons();

    await rTComponentsPage.clickOnCreateButton();

    await promise.all([rTUpdatePage.setNameInput('name')]);

    expect(await rTUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await rTUpdatePage.save();
    expect(await rTUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rTComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RT', async () => {
    const nbButtonsBeforeDelete = await rTComponentsPage.countDeleteButtons();
    await rTComponentsPage.clickOnLastDeleteButton();

    rTDeleteDialog = new RTDeleteDialog();
    expect(await rTDeleteDialog.getDialogTitle()).to.eq('civilianManagementApp.rT.delete.question');
    await rTDeleteDialog.clickOnConfirmButton();

    expect(await rTComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
