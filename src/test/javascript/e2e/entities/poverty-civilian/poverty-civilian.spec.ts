import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PovertyCivilianComponentsPage, PovertyCivilianDeleteDialog, PovertyCivilianUpdatePage } from './poverty-civilian.page-object';

const expect = chai.expect;

describe('PovertyCivilian e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let povertyCivilianComponentsPage: PovertyCivilianComponentsPage;
  let povertyCivilianUpdatePage: PovertyCivilianUpdatePage;
  let povertyCivilianDeleteDialog: PovertyCivilianDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PovertyCivilians', async () => {
    await navBarPage.goToEntity('poverty-civilian');
    povertyCivilianComponentsPage = new PovertyCivilianComponentsPage();
    await browser.wait(ec.visibilityOf(povertyCivilianComponentsPage.title), 5000);
    expect(await povertyCivilianComponentsPage.getTitle()).to.eq('civilianManagementApp.povertyCivilian.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(povertyCivilianComponentsPage.entities), ec.visibilityOf(povertyCivilianComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PovertyCivilian page', async () => {
    await povertyCivilianComponentsPage.clickOnCreateButton();
    povertyCivilianUpdatePage = new PovertyCivilianUpdatePage();
    expect(await povertyCivilianUpdatePage.getPageTitle()).to.eq('civilianManagementApp.povertyCivilian.home.createOrEditLabel');
    await povertyCivilianUpdatePage.cancel();
  });

  it('should create and save PovertyCivilians', async () => {
    const nbButtonsBeforeCreate = await povertyCivilianComponentsPage.countDeleteButtons();

    await povertyCivilianComponentsPage.clickOnCreateButton();

    await promise.all([povertyCivilianUpdatePage.setReasonInput('reason'), povertyCivilianUpdatePage.civilianSelectLastOption()]);

    expect(await povertyCivilianUpdatePage.getReasonInput()).to.eq('reason', 'Expected Reason value to be equals to reason');

    await povertyCivilianUpdatePage.save();
    expect(await povertyCivilianUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await povertyCivilianComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PovertyCivilian', async () => {
    const nbButtonsBeforeDelete = await povertyCivilianComponentsPage.countDeleteButtons();
    await povertyCivilianComponentsPage.clickOnLastDeleteButton();

    povertyCivilianDeleteDialog = new PovertyCivilianDeleteDialog();
    expect(await povertyCivilianDeleteDialog.getDialogTitle()).to.eq('civilianManagementApp.povertyCivilian.delete.question');
    await povertyCivilianDeleteDialog.clickOnConfirmButton();

    expect(await povertyCivilianComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
