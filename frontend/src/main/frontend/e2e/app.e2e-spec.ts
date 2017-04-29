import { MoGeoStory } from './app.po';

describe('MoGeoStory App', () => {
  let page: MoGeoStory;

  beforeEach(() => {
    page = new MoGeoStory();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
