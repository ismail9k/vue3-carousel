import Carousel from '@/components/Carousel';
import { mount } from '@vue/test-utils';

describe('Carousel.ts', () => {
  let wrapper: any;

  beforeEach(async () => {
    wrapper = mount(Carousel);
  });

  it('Should success', () => {
    expect(true).toBeTruthy();
  });
});
