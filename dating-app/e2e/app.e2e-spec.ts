import { DatingAppPage } from './app.po';

describe('dating-app App', () => {
  let page: DatingAppPage;

  beforeEach(() => {
    page = new DatingAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
