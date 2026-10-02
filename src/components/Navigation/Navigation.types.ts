import { Carousel, CarouselExposed } from '@/components/Carousel'

export type NavigationProps = {
  carousel?: InstanceType<typeof Carousel> & CarouselExposed,
  complyWithItemsToScroll: boolean
}